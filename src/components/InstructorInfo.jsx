import React from 'react';
import SocialLinks from './SocialLinks';

const InstructorInfo = ({workout}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Instructor Info</h3>

        <h2 className="text-2xl">{ workout.instructor.name }</h2>

        <p className="my-2"> { workout.instructor.description } </p>

        <hr className="my-4" />

        <h3 className="text-xl">Contact Email:</h3>
        <p className="my-2 bg-indigo-100 p-2 font-bold">{ workout.instructor.contactEmail }</p>

        <h3 className="text-xl mt-4">Contact Phone:</h3>
        <p className="my-2 bg-indigo-100 p-2 font-bold">{ workout.instructor.contactPhone }</p>

        {
          workout.instructor.socialLinks 
          ? 
          <SocialLinks socialLinks={workout.instructor.socialLinks}/>
          : null
        }
        
    </div>
  )
}

export default InstructorInfo;
