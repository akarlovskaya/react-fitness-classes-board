import React from 'react';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import {FaMapMarker} from 'react-icons/fa';
import Moment from 'react-moment';
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";


const ClassListing = ({workout, id, onDelete, onEdit}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  let description = workout.description;


// show short version of description
  if (!showFullDescription && description.length >= 130 ) {
    description = description.substring(0, 130) + '...';
  }

  return (
    <li key={id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-150 relative">
      <Link to={`/classes/${id}`}>
        <Moment className="absolute top-2 right-2 bg-beige uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg" fromNow>
          {workout.timeStamp?.toDate()}
        </Moment>
        <div className="p-4">
          <div className="mb-6">
            <div className="text-gray-600 my-2">{workout.type}</div>
            <h3 className="text-xl font-bold">{workout.title}</h3>
          </div>

          <div className="mb-5 min-h-20">
            {description}
            {
            description.length >= 130 
            ?
              <button 
                onClick={() => setShowFullDescription((prevState) => !prevState)} 
                className='text-navy mb -5 hover:text-indigo-600'>
                { showFullDescription ? 'Less' : 'Read more'}
              </button> 
            : null
          }
          </div>

          { workout.type === "Session" ? 
              <h3 className="text-navy mb-2">${workout.cost} CAD per 10 sessions</h3>
          : 
              <h3 className="text-navy mb-2">${workout.cost} CAD</h3> 
          }

          <div className="border border-gray-100 mb-5"></div>

          <div className="flex flex-col lg:flex-row justify-between relative"> 
            <div className="text-orange-dark mb-3">
                <FaMapMarker className='inline text-lg mb-1 mr-1' />
                {workout.location.city}
            </div>
            {/* <Link
              to={`/classes/${id}`}
              className="h-[36px] bg-navy hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
              Read More
            </Link> */}
            <div>
              {onDelete && (
                <FaTrash 
                  className="absolute bottom-4 right-2 h-[14px] cursor-pointer text-orange-dark"
                  onClick={()=> onDelete(id)}
                />
              )}
              {onEdit && (
                <MdModeEdit 
                  className="absolute bottom-4 right-7 h-4 cursor-pointer text-black"
                  onClick={()=> onEdit(id)}
                />
              )}
            </div>
          </div>

        </div>
      </Link>

  </li>
  )
}

export default ClassListing;
