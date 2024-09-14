import React, { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import { toast } from 'react-toastify';
import { DAYS, PAYMENT_OPTIONS } from '../utilities/Utilities.jsx';
import Spinner from '../components/Spinner.jsx';
import { db } from '../firebase.js';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EditClassPage = () => {
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(true);
    // for redirecting to Class page
    const navigate = useNavigate();
    const {id} = useParams();
    const auth = getAuth();

    useEffect(() => {
        if (workout && workout.instructor.id !== auth.currentUser.uid) {
          toast.error("You can't edit this listing");
          navigate("/");
        }
      }, [auth.currentUser.uid, workout, navigate]);

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const docRef = doc(db, "workouts", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setWorkout({ id: docSnap.id, ...docSnap.data() });
                } else {
                    navigate("/");
                    toast.error("Listing does not exist");
                }
            } catch (error) {
                console.error("Error fetching workout:", error);
                toast.error("Error fetching workout data");
            } finally {
                setLoading(false);
            }
        };

        fetchWorkout();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorkout(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setWorkout(prevState => ({
            ...prevState,
            location: {
                ...prevState.location,
                [name]: value
            }
        }));
    };

    const handleSelectDay = (e) => {
        const { value, checked } = e.target;
        setWorkout(prevState => ({
            ...prevState,
            days: checked
                ? [...prevState.days, value]
                : prevState.days.filter(day => day !== value)
        }));
    };

    const handleSelectPayment = (e) => {
        const { value, checked } = e.target;
        setWorkout(prevState => ({
            ...prevState,
            payment_options: checked
                ? [...prevState.payment_options, value]
                : prevState.payment_options.filter(option => option !== value)
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const docRef = doc(db, "workouts", id);
            await updateDoc(docRef, workout);
            toast.success('Class listing updated successfully!');
            navigate(`/classes/${id}`);
        } catch (error) {
            console.error("Error updating document: ", error);
            toast.error('Error updating class listing');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!workout) {
        return <div>No workout found</div>;
    }

  return (
    <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form onSubmit={submitForm}>
            <h1 className="text-3xl text-center font-semibold mb-6">Edit Class</h1>

            <fieldset>
                <legend className="font-semibold uppercase mb-2 mt-8">Class Information</legend>
                {/* Type of class */}
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Type</label>
                    <select
                        id="type"
                        name="type"
                        className="border rounded w-full py-2 px-3"
                        required
                        value={workout.type}
                        onChange={handleInputChange}
                        >
                        <option value="Drop-In">Drop-In</option>
                        <option value="Session">Session</option>
                    </select>
                </div>

                {/* Name of class*/}
                <div className="mb-4">
                    <label 
                    htmlFor="title" 
                    className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Name</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="E.g. Cardio Dance"
                        required
                        value={workout.title}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="border rounded w-full py-2 px-3"
                        rows="5"
                        placeholder="Tell what to expect from your classes - e.g. goal of the class, duration, what participants should bring and wear, if any eguipment will be used in your class. Note: Make your first sentence as informative and catchy as possible, as only the first 130 characters will be visible on the Home Page. The full description will be visible on the Class Details page."
                        value={workout.description}
                        onChange={handleInputChange}>
                        </textarea>
                </div>
                {/* Time */}
                <div className="mb-4">
                    <label 
                        htmlFor="time" 
                        className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Time</label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        className="border rounded w-full py-2 px-3 mb-2"
                        required
                        value={workout.time}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Checkbox DAY of WEEK */}
                {/* TODO: add validation */}
                <fieldset>
                    <legend className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Days of the Week</legend>
                    <div className="mb-4">
                    { 
                        DAYS.map(day => {
                            return (                            
                            <Checkbox 
                                key={day.id}
                                type="checkbox"
                                value={day.name} 
                                id={day.id} 
                                checked={workout.days.includes(day.name)}
                                name={day.name}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                handleSelect={handleSelectDay}>{day.label}
                            </Checkbox>)
                        })
                    } 
                    </div>
                </fieldset>
                {/* Fee */}
                <div className="mb-4">
                    <label
                        htmlFor="cost"
                        className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Fee</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Price for One Class or Session"
                        required
                        value={workout.cost}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset> 
            {/* END of CLASS INFORMATION */}

            {/* LOCATION */}
            <fieldset>
            <legend className="font-semibold uppercase mb-2 mt-10">Location</legend>
                <div className='mb-4'>
                    {['place', 'address', 'city', 'region', 'zipcode'].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className='block text-gray-700 font-bold mb-2'>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                type='text'
                                id={field}
                                name={field}
                                className='border rounded w-full py-2 px-3 mb-2'
                                required
                                value={workout.location[field]}
                                onChange={handleLocationChange}
                            />
                        </div>
                    ))}
                </div>
            </fieldset>
            {/* END of LOCATION */}

            {/* PAYMENT OPRIONS */}
            <fieldset>
            <legend className="font-semibold uppercase mb-2 mt-8">Payment Options</legend>
            <div className="mb-4">
               { 
                PAYMENT_OPTIONS.map(payment => 
                    <Checkbox 
                        key={payment.id}
                        type="checkbox"
                        value={payment.type} 
                        id={payment.id} 
                        checked={workout.payment_options.includes(payment.type)}
                        name={payment.type}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        handleSelect={handleSelectPayment}>{payment.label}
                    </Checkbox>
                   )
                } 
            </div>
          </fieldset>

            <div>
            <button
                className="bg-navy hover:bg-navy-light text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit">
                    Edit Class
            </button>
            </div>
        </form>
        </div>
        </div>
    </section>
  )
}

export default EditClassPage;
