import React from 'react';
import ClassListing from './ClassListing';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { toast } from 'react-toastify';

function ProfilePageMyClasses({workouts, loading, setWorkouts}) {
    const navigate = useNavigate();

    const onDelete = async (workoutID) => {
        const confirm = window.confirm("Are you sure you want to delete this class listing?");
        if (!confirm) return;
    
        await deleteDoc(doc(db, "workouts", workoutID));
        const updatedListings = workouts.filter(
          workout => workout.id !== workoutID
        );
        setWorkouts(updatedListings);
    
        toast.success('Class listing deleted successfully!');
      };
    
      const onEdit = (id) => {
        navigate(`/edit-class/${id}`);
      };


  return (
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
      {!loading && workouts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-navy mb-6 text-center">My Classes</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <ClassListing 
                key={workout.id} 
                id={workout.id} 
                workout={workout.data}
                onDelete={()=>onDelete(workout.id)}
                onEdit={()=>onEdit(workout.id)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  </section>
  )
}

export default ProfilePageMyClasses;
