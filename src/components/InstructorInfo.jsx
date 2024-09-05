import React, { useState, useEffect } from 'react';
import SocialLinks from './SocialLinks';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import defaultAvatarImg from '../assets/images/avatar-img.png';

const InstructorInfo = ({workout}) => {
  // Destructure the instructor info from workout and set it as the initial state for instructorData
  const [instructorData, setInstructorData] = useState({
    name: workout.instructor.name,
    id: workout.instructor.id,
    contactEmail: workout.instructor.contactEmail,
    contactPhone: workout.instructor.contactPhone,
  });
  console.log('instructorData', instructorData.socials);

  // Fetch additional instructor data from Firestore
    useEffect(() => {
      const fetchInstructorInfo = async () => {
        try {
          // Use the instructor.id from the workout object to fetch the instructor's data
          const userRef = doc(db, "users", workout.instructor.id);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            // Merge the existing data with any additional data from Firestore
            setInstructorData((prevState) => ({
              ...prevState,
              ...userDoc.data(),
            }));
        }
          else {
            console.log("Instructor document not found.");
          }
        } catch (error) {
          console.error("Error fetching instructor data: ", error);
        }
      };
  
      fetchInstructorInfo();
    }, [workout.instructor.id]); 

  // Handle loading state if data isn't fetched yet
  if (!instructorData) {
    return <div>Loading Instructor Info...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Instructor Info</h2>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl ">{ instructorData.name }</h3>
          {instructorData.instructorTitle &&
            <p className="text-gray-700 mb-3">{instructorData.instructorTitle}</p>
          }
          <img 
            src={instructorData.avatarImage  || defaultAvatarImg}
            className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
            alt={`${instructorData.name || 'Profile Name'}'s photo`}>
          </img>
        </div>


        {instructorData.description && (
          <>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{ instructorData.description }</p>
          </>
        )}

        <hr className="my-4" />

        {instructorData.contactEmail && (
          <>
          <h3 className="text-xl">Contact Email:</h3>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{ instructorData.contactEmail }</p>
          </>
        )}

        {instructorData.contactPhone && (
          <>
          <h3 className="text-xl mt-4">Contact Phone:</h3>
          <p className="my-2 bg-indigo-100 p-2 font-bold">{ instructorData.contactPhone }</p>
          </>
        )}

        {instructorData.socials && (
          <SocialLinks socialLinks={instructorData.socials} />
        )}
    </div>
  )
}

export default InstructorInfo;
