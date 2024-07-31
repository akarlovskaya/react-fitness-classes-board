import React from 'react';
import { useState, useEffect } from 'react';
import ClassListing from './ClassListing';
import Spinner from './Spinner';


const ClassListings = ( {isHome = false} ) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlAPI = isHome
      ? '/api/classes?_limit=3' 
      : '/api/classes';

    const fetchClasses = async() => {
      try {
        const res = await fetch(urlAPI);
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
          setLoading(false);
        }
    };

    fetchClasses();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-navy mb-6 text-center">
          { isHome ? 'Recent Fitness Classes' : 'Browse All Fitness Classes'}
        </h2>
          { loading ? (
            <Spinner loading={loading}/>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {classes.map((workout) => (
                <ClassListing key={workout.id} workout={workout}/>
              ))}
            </ul>
          )}
      </div>
    </section>
  )
}

export default ClassListings;
