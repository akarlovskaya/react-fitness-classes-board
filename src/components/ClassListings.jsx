import React from 'react';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import ClassListing from './ClassListing';
import Spinner from './Spinner';

const ClassListings = ( {isHome = false} ) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Workouts Data Fetching
  useEffect(() => {
    const fetchAllWorkouts = async () => {
      try {
        const workoutsRef = collection(db, "workouts"); 
        const q = query(
          workoutsRef,
          orderBy("timeStamp", "desc")
        );
        
        const querySnap = await getDocs(q);

        let fetchedAllWorkouts = [];
        querySnap.forEach((doc) => {
          fetchedAllWorkouts.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setClasses(fetchedAllWorkouts);
        
      } catch (error) {
        console.error("Error fetching all workouts: ", error);
      }finally {
        setLoading(false);
      }
    };

    fetchAllWorkouts();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h1 className="text-3xl font-bold text-navy mb-6 text-center">
          { isHome ? 'Recent Fitness Classes' : 'Browse All Fitness Classes'}
        </h1>
          { loading ? (
            <Spinner loading={loading}/>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((workout) => (
                <ClassListing key={workout.id} id={workout.id} workout={workout.data}/>
              ))}
            </ul>
          )}
      </div>
    </section>
  )
}

export default ClassListings;
