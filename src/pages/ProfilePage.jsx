import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    instructorName: auth.currentUser.displayName,
    instructorDescription: "About John",
    contactEmail: auth.currentUser.email,
    contactPhone: "123-22-33"
  });

  const {instructorName, instructorDescription, contactEmail, contactPhone } = formData;

  function onSignOut() {
    // signing out
    auth.signOut();
    // redirect to Home page
    navigate("/");
  }

  return (
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl text-center font-semibold mb-6">My Profile</h1>

            {/* Edit and Sign Out */}
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <button
                  className="white hover:text-purple text-navy font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit">
                  Edit
              </button>

              <button
                  onClick={onSignOut}
                  className="white hover:text-purple text-navy font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit">
                  Sign Out
              </button>
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
                          className="border rounded w-full py-2 px-3"
                          value={instructorName}
                          // onChange={(e) => setInstructorName(e.target.value)} 
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
                          className="border rounded w-full py-2 px-3"
                          rows="4"
                          placeholder="Tell a bit about yourself - experience, what moves you?"
                          value={instructorDescription}
                          // onChange={(e) => setInstructorDescription(e.target.value)} 
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
                          className="border rounded w-full py-2 px-3"
                          placeholder="You email address"
                          required
                          value={contactEmail}
                          // onChange={(e) => setContactEmail(e.target.value)} 
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
                          className="border rounded w-full py-2 px-3"
                          placeholder="Add phone number. Optional"
                          value={contactPhone}
                          // onChange={(e) => setContactPhone(e.target.value)} 
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
          </div>
        </div>
      </section>
  )
}

export default ProfilePage;
