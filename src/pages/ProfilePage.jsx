import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc, serverTimestamp, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase.js';
import { toast } from 'react-toastify';
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {v4 as uuidv4} from "uuid";
import Spinner from '../components/Spinner.jsx';
import defaultAvatarImg from '../assets/images/avatar-img.png';
import SocialLinksProfileForm from '../components/SocialLinksProfileForm.jsx';
import ClassListing from '../components/ClassListing';

const ProfilePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const socialLinks = {
    facebook: { name: 'facebook', label: 'Facebook', link: '' },
    instagram: { name: 'instagram', label: 'Instagram', link: '' },
    linkedin: { name: 'linkedin', label: 'LinkedIn', link: '' },
    x_com: { name: 'x_com', label: 'Twitter / X.com', link: '' }
  };

  const [formData, setFormData] = useState({
    avatarImage: null,
    fullName: auth.currentUser.displayName || "",
    instructorTitle: "",
    instructorDescription: "",
    contactEmail: auth.currentUser.email,
    contactPhone: auth.currentUser.phoneNumber || "",
    socials: socialLinks
  });
  const [workouts, setWorkouts] = useState([]);
  const [editInfo, setEditInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const {avatarImage, fullName, instructorTitle, instructorDescription, contactEmail, contactPhone, socials } = formData;

  // User Data Fetching
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userRef);
   
        if (userDoc.exists()) {
          setFormData(prevState => ({
            ...prevState,
            ...userDoc.data(), // Merge new data with the existing state
          }));
      }
        else {
          console.log("No such document.");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [auth.currentUser.uid]); // This runs every time the component mounts

  // Workouts Data Fetching
  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        const workoutsRef = collection(db, "workouts"); 
        const q = query(
          workoutsRef,
          where("instructor.id", "==", auth.currentUser.uid),
          orderBy("timeStamp", "desc")
        );
        
        const querySnap = await getDocs(q);

        let fetchedWorkouts = [];
        querySnap.forEach((doc) => {
          fetchedWorkouts.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setWorkouts(fetchedWorkouts);
        
      } catch (error) {
        console.error("Error fetching workouts: ", error);
      }
    };

    fetchUserWorkouts();
  }, [auth.currentUser.uid]);
  
  function onSignOut() {
    // signing out
    auth.signOut();
    // redirect to Home page
    navigate("/");
  }

  const onChange = (e) => {
    // File Input
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        avatarImage: e.target.files[0]
      }));
      setIsAvatarChanged(true);
    } else {
      // Check if the id belongs to a social link and update state
      if (['facebook', 'instagram', 'linkedin', 'x_com'].includes(e.target.id)) {
        setFormData((prevState) => ({
          ...prevState,
          socials: {
            ...prevState.socials,
            [e.target.id]: {
              ...prevState.socials[e.target.id],
              link: e.target.value
            }
          }
        }));
      } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }));
    }
  }};

  // Store Image in firebase storage
  const storeImage = (image) => {
    // console.log('image for split ', image);
    // const splitFileName = image.name.split('.');
    // splitFileName.pop();
    // const imageFileName = splitFileName[0].replace(/\s+/g, "-").toLowerCase();

    return new Promise((resolve, reject) => {
      console.log('image ', image);
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${image}-${uuidv4()}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  // add change to DB
 const onSubmit = async () => {
    setLoading(true);

    try {
      const updates = {}; // Initialize an empty object for updates
      
      // Check for NAME Changes
      if (auth.currentUser.displayName !== fullName) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {displayName: fullName});
        updates.fullName = fullName;
      }

      // Check for EMAIL Changes
      if (auth.currentUser.email !== contactEmail) {
        // update display email in firebase auth
        await updateProfile(auth.currentUser, {email: contactEmail});
        updates.contactEmail = contactEmail;
      }

      // Check for PHONE Changes
      if (auth.currentUser.phoneNumber !== contactPhone) {
        // update display phone in firebase auth
        await updateProfile(auth.currentUser, {phoneNumber: contactPhone});
        updates.contactPhone = contactPhone;
      }

      // Store and get avatar image URL if a new image is provided
      // let avatarImageUrl = null;
      if (isAvatarChanged && avatarImage) {
        const avatarImageUrl = await storeImage(avatarImage).catch((error) => {
            setLoading(false);
            toast.error("Image not uploaded");
            return;
        });
        if (avatarImageUrl) {
          updates.avatarImage = avatarImageUrl;
        }
      };

      // Prepare the data to update in Firestore
      const formDataCopyForDB = {
        ...formData,
        ...updates, // Merge the updates into the formDataCopyForDB object
        lastUpdated: serverTimestamp(),
      };
      // Update data in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, formDataCopyForDB);

      setLoading(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.log('Error updating profile: ', error);
      setLoading(false);
      toast.error("Failed to update profile.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
      <section className="bg-indigo-50">
        <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        {/* <h1 className="text-3xl text-center font-semibold mb-6">My Profile</h1> */}
          <aside className="col-span-4 sm:col-span-3">
            {/* Profile Image */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <img 
                      src={avatarImage  || defaultAvatarImg}
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="Profile Avatar">
                    </img>
                    {auth.currentUser.displayName &&
                      <h1 className="text-xl font-bold">{auth.currentUser.displayName}</h1> 
                    }
                    {instructorTitle &&
                      <p className="text-gray-700">{instructorTitle}</p>
                    }
                </div>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <button
                    type="submit"
                    className="white hover:text-purple text-navy font-bold py-2 px-4 rounded-full w-full border-2 focus:outline-none focus:shadow-outline"
                    onClick={()=> {
                      editInfo && onSubmit();
                      setEditInfo(prevState => !prevState) 
                    }}
                >
                    { editInfo ? "Save" : "Edit" }
                </button>
                </div>
              </div>
              <hr className="my-6 border-t border-gray-300" />

              <SocialLinksProfileForm socialLinks={formData.socials} onSocialLinkChange={onChange} editInfo={editInfo}/>

              {/* <!-- Skills --> */}
              {/* <div className="flex flex-col">
                    <h2 className="text-gray-700 font-bold mb-2">Skills</h2>
                    <ul>
                        <li className="mb-2">Personal Training</li>
                        <li className="mb-2">Yoga</li>
                        <li className="mb-2">HIIT</li>
                    </ul>
                </div> */}
            </div>
            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              {/* <h2 className="text-xl font-bold mb-6">Manage Profile</h2> */}
            {/* Edit and Sign Out */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <button
                  type="submit"
                  className="white hover:text-purple text-navy font-bold py-2 px-4 rounded-full w-full border-2 focus:outline-none focus:shadow-outline"
                  onClick={onSignOut}
              >
                  Sign Out
              </button>
            </div>
            {/* Create Class Listing Button*/}
            <Link to='/add-class'
              className='flex bg-navy hover:bg-navy-light justify-center text-white py-2 px-4 rounded-full w-full items-center focus:outline-none focus:shadow-outline'
            >
              <IoCreateOutline className='mr-2 text-xl'/> Create Class
            </Link>
            </div>
          </aside>

          <main className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 col-span-4 sm:col-span-9">
            {/* Image upload */}
            <div className='mb-4'>
              <label htmlFor="avatarImage" className="block text-gray-700 font-bold mb-2">
                { isAvatarChanged ? `Profile` : `Edit`} Image
              </label>
                <p className='mb-2'>Accepted format .jpg, .png, jpeg</p>
                <input 
                  type="file" 
                  id='avatarImage'
                  name='avatarImage'
                  disabled={!editInfo}
                  accept='.jpg, .png, jpeg'
                  onChange={onChange} 
                /> 
            </div>

            <form>
              {/* INSTRUCTOR INFORMATION */}
              {/* <fieldset> */}
                  {/* <legend className="font-semibold uppercase mb-2 mt-8">Instructor Info</legend> */}
                    <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            disabled={!editInfo}
                            className="border rounded w-full py-2 px-3" 
                            value={fullName}
                            onChange={onChange} 
                        />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="instructorTitle" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input
                            type="text"
                            id="instructorTitle"
                            name="instructorTitle"
                            disabled={!editInfo}
                            className="border rounded w-full py-2 px-3" 
                            placeholder="Ex. Group Fitness Instructor"
                            value={instructorTitle}
                            onChange={onChange} 
                        />
                    </div>

                  {/* About */}
                  <div className="mb-4">
                  <label
                      htmlFor="instructorDescription"
                      className="block text-gray-700 font-bold mb-2">About You</label>
                      <textarea
                          id="instructorDescription"
                          name="instructorDescription"
                          disabled={!editInfo}
                          className="border rounded w-full py-2 px-3"
                          rows="4"
                          placeholder="Tell a bit about yourself - experience, what moves you?"
                          value={instructorDescription}
                          onChange={onChange} 
                      ></textarea>
                  </div>
                  {/* Contact Email */}
                  <div className="mb-4">
                      <label
                          htmlFor="contactEmail"
                          className="block text-gray-700 font-bold mb-2">Contact Email</label>
                      <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          disabled={!editInfo}
                          className="border rounded w-full py-2 px-3"
                          placeholder="You email address"
                          required
                          value={contactEmail}
                          onChange={onChange} 
                      />
                  </div>
                  {/* Contact Phone */}
                  <div className="mb-4">
                      <label
                      htmlFor="contactPhone"
                      className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                      <input
                          type="tel"
                          id="contactPhone"
                          name="contactPhone"
                          disabled={!editInfo}
                          className="border rounded w-full py-2 px-3"
                          placeholder="Add phone number. Optional"
                          value={contactPhone}
                          onChange={onChange} 
                      />
                  </div>
            </form>

            {/* My classes section */}  
            <section className="bg-blue-50 px-4 py-10">
              <div className="container-xl lg:container m-auto">
                {!loading && workouts.length > 0 && (
                  <>
                    <h2 className="text-3xl font-bold text-navy mb-6 text-center">My Classes</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {workouts.map((workout) => (
                        <ClassListing key={workout.id} workout={workout}/>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>

          </main>
        </div>
        </div>
      </section>
  )
}

export default ProfilePage;
