import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { toast } from 'react-toastify';
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


const ProfilePage = () => {
  const auth = getAuth();
  console.log("auth.currentUser ", auth.currentUser);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instructorName: auth.currentUser.displayName || "",
    instructorDescription: "",
    contactEmail: auth.currentUser.email,
    contactPhone: auth.currentUser.phoneNumber || "",
    // ToDO: instructorPhoto: auth.currentUser.photoURL || ""
  });
  const [editInfo, setEditInfo] = useState(false);

  const {instructorName, instructorDescription, contactEmail, contactPhone } = formData;

  function onSignOut() {
    // signing out
    auth.signOut();
    // redirect to Home page
    navigate("/");
  }

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  console.log("auth.currentUser.phoneNumber ", auth.currentUser.phoneNumber);

  // add change to DB
 const onSubmit = async () => {
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

        // update data in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
            fullName: instructorName,
            email: contactEmail,
            // TODO - phone: contactPhone,
            // TODO - about: instructorDescription
        });
      
      toast.success("Profile details updated.");
      
    } catch (error) {
      console.log('error ', error);
      toast.error("Could not update details.");
    }
  }

  return (
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl text-center font-semibold mb-6">My Profile</h1>

            {/* Edit and Sign Out */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
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

              <button
                  type="submit"
                  className="white hover:text-purple text-navy font-bold py-2 px-4 rounded-full w-full border-2 focus:outline-none focus:shadow-outline"
                  onClick={onSignOut}
              >
                  Sign Out
              </button>
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

            {/* Create Class Listing Button*/}
            <Link to='/add-class'
              className='flex bg-navy hover:bg-navy-light justify-center text-white py-2 px-4 rounded-full w-full items-center focus:outline-none focus:shadow-outline'
            >
              <IoCreateOutline className='mr-2 text-xl'/> Create Class
            </Link>
          </div>
        </div>
      </section>
  )
}

export default ProfilePage;
