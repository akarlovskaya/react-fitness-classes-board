import React from 'react';
import workouts from '../fitnessClasses.json';

const ClassListings = () => {
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Browse Fitness Classes
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          { workouts.map((workout) => (
            <li key={workout.id} className="bg-white rounded-xl shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <div className="text-gray-600 my-2">{workout.type}</div>
                  <h3 className="text-xl font-bold">{workout.title}</h3>
                </div>
  
                <div className="mb-5">
                  {workout.description}
                </div>
  
                <h3 className="text-indigo-500 mb-2">{ workout.cost }</h3>
  
                <div className="border border-gray-100 mb-5"></div>
  
                <div className="flex flex-col lg:flex-row justify-between mb-4">
                  <div className="text-orange-700 mb-3">
                    <i className="fa-solid fa-location-dot text-lg"></i>
                    {workout.location}
                  </div>
                  <a
                    href={`/workouts/${workout.id}`}
                    className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                  </a>
                </div>
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    </section>
  )
}

export default ClassListings;
