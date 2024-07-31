import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import {FaMapMarker} from 'react-icons/fa';


const ClassListing = ({workout}) => {
  const [showFullDescription, setshowFullDescription] = useState(false);
  let description = workout.description;

// show short version of description
  if (!showFullDescription && description.length >= 130 ) {
    description = description.substring(0, 130) + '...';
  }

  return (
    <li key={workout.id} className="bg-white rounded-xl shadow-md relative">
    <div className="p-4">
      <div className="mb-6">
        <div className="text-gray-600 my-2">{workout.type}</div>
        <h3 className="text-xl font-bold">{workout.title}</h3>
      </div>

      <div className="mb-5">
        {description}
      </div>
      {
        description.length >= 130 
        ?
          <button 
            onClick={() => setshowFullDescription((prevState) => !prevState)} 
            className='text-navy mb -5 hover:text-indigo-600'>
            { showFullDescription ? 'Less' : 'More'}
          </button> 
        : null
      }

      { workout.type === "Session" ? 
          <h3 className="text-navy mb-2">${workout.cost} CAD per 10 sessions</h3>
       : 
          <h3 className="text-navy mb-2">${workout.cost} CAD</h3> 
      }

      <div className="border border-gray-100 mb-5"></div>

      <div className="flex flex-col lg:flex-row justify-between mb-4"> 
        <div className="text-orange-dark mb-3">
          <FaMapMarker className='inline text-lg mb-1 mr-1' />
          {workout.location.city}
        </div>
        <Link
          to={`/classes/${workout.id}`}
          className="h-[36px] bg-navy hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Read More
        </Link>
      </div>
    </div>
  </li>
  )
}

export default ClassListing;
