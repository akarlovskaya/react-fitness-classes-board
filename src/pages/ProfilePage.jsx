import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../firebase.js';
import { toast } from 'react-toastify';
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {v4 as uuidv4} from "uuid";
import Spinner from '../components/Spinner.jsx';
import avatarImg from '../assets/images/avatar-img.png';

const ProfilePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    avatarImage: null,
    instructorName: auth.currentUser.displayName || "",
    instructorTitle: "",
    instructorDescription: "",
    contactEmail: auth.currentUser.email,
    contactPhone: auth.currentUser.phoneNumber || "",
    // instructorPhoto: auth.currentUser.photoURL || ""
  });
  const [editInfo, setEditInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const {avatarImage, instructorName, instructorTitle, instructorDescription, contactEmail, contactPhone, instructorPhoto } = formData;

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
        avatarImage: e.target.files
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }));
    }
  };

  // add change to DB
 const onSubmit = async () => {
    setLoading(true);

    try {
      // Check for NAME Changes
      if (auth.currentUser.displayName !== instructorName) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: instructorName
        });
      }

      // Check for EMAIL Changes
      if (auth.currentUser.email !== contactEmail) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          email: contactEmail
        });
      }

      // Check for PHONE Changes
      if (auth.currentUser.phoneNumber !== contactPhone) {
        // update display name in firebase auth
        await updateProfile(auth.currentUser, {
          phoneNumber: contactPhone
        });
      }

      // store Image in firebase storage
      async function storeImage(image) {
        const splitFileName = image[0].name.split('.');
        splitFileName.pop();
        const imageFileName = splitFileName[0].replace(/\s+/g, "-").toLowerCase();

        return new Promise((resolve, reject) => {
          const storage = getStorage();
          const filename = `${auth.currentUser.uid}-${imageFileName}-${uuidv4()}`;
          const storageRef = ref(storage, filename);
          const uploadTask = uploadBytesResumable(storageRef, image[0]);
          // Register three observers:
          // 1. 'state_changed' observer, called any time the state changes
          // 2. Error observer, called on failure
          // 3. Completion observer, called on successful completion
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              console.log('snapshot.bytesTransferred ', snapshot.bytesTransferred);
              console.log('snapshot.totalBytes ', snapshot.totalBytes);
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
                console.log('downloadURL ', downloadURL);
              });
            }
          );
        });
      }

      // Get image URL if avatarImage exists
      let avatarImageUrl = null;
      if (avatarImage) {
        avatarImageUrl = await storeImage(avatarImage).catch((error) => {
            setLoading(false);
            toast.error("Image not uploaded");
            return;
        });
      };

      // Prepare the data to update in Firestore
      const formDataCopyForDB = {
        ...formData,
        avatarImage: avatarImageUrl,
        instructorDescription,
        contactPhone,
        timestamp: serverTimestamp()
      };
      // Update data in Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, formDataCopyForDB);

      setLoading(false);
      toast.success("Profile details updated.");
    } catch (error) {
      console.log('error ', error);
      setLoading(false);
      toast.error("Could not update details.");
    }

  }

  if (loading) {
    return <Spinner />;
  }

  return (
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl text-center font-semibold mb-6">My Profile</h1>

            
            {/* Profile Image */}
            <div className="flex flex-col items-center">
                <img 
                  src={avatarImg}
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                </img>
                {auth.currentUser.displayName ? 
                  <h2 className="text-xl font-bold">{auth.currentUser.displayName}</h2> 
                  : null
                }
                {instructorTitle ? 
                  <p className="text-gray-700">{instructorTitle}</p>
                  : null
                }
            </div>
          
            {/* Image upload */}
            <div className='mb-4'>
              
              <label htmlFor="avatarImage" className="block text-gray-700 font-bold mb-2">Profile Image</label>
                <p className='mb-2'>Accepted format .jpg, .png, jpeg</p>
                <input 
                  type="file" 
                  id='avatarImage'
                  name='avatarImage'
                  accept='.jpg, .png, jpeg'
                  onChange={onChange} 
                /> 
            </div>


            <form>
              {/* INSTRUCTOR INFORMATION */}
              {/* <fieldset> */}
                  {/* <legend className="font-semibold uppercase mb-2 mt-8">Instructor Info</legend> */}
                    <div className="mb-4">
                    <label htmlFor="instructorName" className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="instructorName"
                            name="instructorName"
                            disabled={!editInfo}
                            className="border rounded w-full py-2 px-3" 
                            value={instructorName}
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
                  {/* SOCIAL ACCOUNTS*/}
                  {/* <fieldset>
                  <legend className="font-semibold uppercase mb-2 mt-8">Social Accounts</legend>
                      <div className="mb-4">
                      { SOCIAL_LINKS.map(social_link => {
                          return (
                              <div key={social_link.name} className="relative flex gap-x-3 mb-4">
                              <label
                                  htmlFor={social_link.name}
                                  className="flex text-lg h-10 items-center">{renderSocialIconSwitch(social_link.name)}
                              </label>
                              <input
                                  type="text"
                                  id={social_link.name}
                                  name={social_link.name}
                                  className="border rounded w-full py-2 px-3"
                                  placeholder="Link to social profile. Optional"
                                  value={socialLinksList}
                                  onChange={(e) => setSocialLinksList(e.target.value)} 
                              />
                              </div>
                          )})
                      }
                      </div>
                  </fieldset> */}
              {/* </fieldset> */}

            </form>
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
          </main>

          {/* <!-- Sidebar --> */}
          <aside>
            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Manage Profile</h3>

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


                {/* <Link
                    to={`/edit-class/${workout.id}`}
                    className="bg-navy hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >Edit Class</Link>
                <button 
                    onClick={() => onDeleteClick(workout.id)}
                    className="bg-orange-dark hover:bg-dark-light text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                    Delete Class
                </button> */}
            </div>
            </aside>
          </div>
        </div>
      </section>
  )
}

export default ProfilePage;
