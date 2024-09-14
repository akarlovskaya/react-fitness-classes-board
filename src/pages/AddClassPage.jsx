import React from 'react';
import { useState } from 'react'; 
import Checkbox from '../components/Checkbox';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { DAYS, PAYMENT_OPTIONS } from '../utilities/Utilities.jsx';
import { db } from '../firebase.js';


const AddClassPage = ({addClassSubmit}) => {
    const [formData, setFormData] = useState({
        type: 'Drop-In',
        title: '',
        description: '',
        time: '',
        fee: '',
        daysList: [],
        place: '',
        address: '',
        city: '',
        region: '',
        zipcode: '',
        paymentOptions: [],
    });
    // for redirecting to Class page
    const navigate = useNavigate();
    const auth = getAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleCheckboxChange = (e, stateKey) => {
        const { value, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [stateKey]: checked
                ? [...prevState[stateKey], value]
                : prevState[stateKey].filter(item => item !== value)
        }));
    };

    // Add new workout
    const addWorkout = async (newWorkout) => {
        try {
        const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
        } catch (error) {
        console.error('Error adding document: ', error);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        const newWorkout = {
            ...formData,
            cost: formData.fee,
            days: formData.daysList,
            location: {
                place: formData.place,
                address: formData.address,
                city: formData.city,
                region: formData.region,
                zipcode: formData.zipcode
            },
            instructor: {
                name: auth.currentUser.displayName || "",
                id: auth.currentUser.uid,
                contactEmail: auth.currentUser.email,
                contactPhone: auth.currentUser.phoneNumber || ""
            },
            payment_options: formData.paymentOptions,
            timeStamp: serverTimestamp()
        };

        addWorkout(newWorkout);
        toast.success('Class listing created successfully!');
        navigate('/classes');
    };
    
  return (
    <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form onSubmit={submitForm}>
            <h1 className="text-3xl text-center font-semibold mb-6">Add Class</h1>

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
                        value={formData.type}
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
                        value={formData.title}
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
                        value={formData.description}
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
                        value={formData.time}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Checkbox DAY of WEEK */}
                {/* TODO: add validation */}
                <fieldset>
                    <legend className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Days of the Week</legend>
                    <div className="mb-4">
                    { 
                        DAYS.map(day => 
                            <Checkbox 
                                key={day.name}
                                type="checkbox"
                                value={day.name} 
                                id={day.name} 
                                name={day.name}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                handleSelect={(e) => handleCheckboxChange(e, 'daysList')}>{day.label}
                            </Checkbox>
                        )
                        } 
                    </div>
                </fieldset>
                {/* Fee */}
                <div className="mb-4">
                    <label
                        htmlFor="fee"
                        className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Fee</label>
                    <input
                        type="number"
                        id="fee"
                        name="fee"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Price for One Class or Session"
                        required
                        value={formData.fee}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset> 
            {/* END of CLASS INFORMATION */}

            {/* LOCATION */}
            <fieldset>
            <legend className="font-semibold uppercase mb-2 mt-10">Location</legend>
                <div className='mb-4'>
                    <label htmlFor="place" className='block text-gray-700 font-bold mb-2'>
                        Place
                    </label>
                    <input
                        type='text'
                        id='place'
                        name='place'
                        className='border rounded w-full py-2 px-3 mb-2'
                        placeholder='E.g., name of a Gym or Studio'
                        required
                        value={formData.place}
                        onChange={handleInputChange}         
                    />

                    <label htmlFor="address" className='block text-gray-700 font-bold mb-2'>
                        Street Address
                    </label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        className='border rounded w-full py-2 px-3 mb-2'
                        required
                        value={formData.address}
                        onChange={handleInputChange}         
                    />

                    <label htmlFor="city" className='block text-gray-700 font-bold mb-2'>
                        City
                    </label>
                    <input
                        type='text'
                        id='city'
                        name='city'
                    className='border rounded w-full py-2 px-3 mb-2'
                        required
                        value={formData.city}
                        onChange={handleInputChange}       
                    />

                    <label htmlFor="region" className='block text-gray-700 font-bold mb-2'>
                        State / Province
                    </label>
                    <input
                        type='text'
                        id='region'
                        name='region'
                        className='border rounded w-full py-2 px-3 mb-2'
                        required
                        value={formData.region}
                        onChange={handleInputChange}     
                    />
                    <label htmlFor="zipcode" className='block text-gray-700 font-bold mb-2'>
                        ZIP / Postal code
                    </label>
                    <input
                        type='text'
                        id='zipcode'
                        name='zipcode'
                        className='border rounded w-full py-2 px-3 mb-2'
                        required
                        value={formData.zipcode}
                        onChange={handleInputChange}           
                    />
                </div>
            </fieldset>
            {/* END of LOCATION */}

            {/* PAYMENT OPTIONS */}
            {/* TODO: add validation */}
            <fieldset>
            <legend className="font-semibold uppercase mb-2 mt-8">Payment Options</legend>
            <div className="mb-4">
               { 
                PAYMENT_OPTIONS.map(payment => 
                    <Checkbox 
                        key={payment.type}
                        type="checkbox"
                        value={payment.type} 
                        id={payment.type} 
                        name={payment.type}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        handleSelect={(e) => handleCheckboxChange(e, 'paymentOptions')}>{payment.label}
                    </Checkbox>
                   )
                } 
            </div>
          </fieldset>

            <div>
            <button
                className="bg-navy hover:bg-navy-light text-white py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit">
                Add Class
            </button>
            </div>
        </form>
        </div>
        </div>
    </section>
  )
};

export default AddClassPage;
