import React from 'react';
import workouts from '../fitnessClasses.json';
import ClassListing from './ClassListing';

const ClassListings = ( {isHome = false} ) => {
  const classListings = isHome ? workouts.slice(0, 3) : workouts;

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          { isHome ? 'Recent Fitness Classes' : 'Browse All Fitness Classes'}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          { classListings.map((workout) => (
            <ClassListing key={workout.id} workout={workout}/>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ClassListings;
