import React from 'react';
import { useState } from 'react'; 
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox';
import { toast } from 'react-toastify';

const EditClassPage = ({updateClassSubmit}) => {
    const workout = useLoaderData();

    const [type, setType] = useState(workout.type);
    const [title, setTitle] = useState(workout.title);
    const [description, setDescription] = useState(workout.description);
    const [time, setTime] = useState(workout.time);
    const [fee, setFee] = useState(workout.cost);
    const [daysList, setDaysList] = useState(workout.days);
    const [place, setPlace] = useState(workout.location.place);
    const [address, setAddress] = useState(workout.location.address);
    const [city, setCity] = useState(workout.location.city);
    const [region, setRegion] = useState(workout.location.region);
    const [zipcode, setZipcode] = useState(workout.location.zipcode);
    const [instructorName, setInstructorName] = useState(workout.instructor.name);
    const [instructorDescription, setInstructorDescription] = useState(workout.instructor.description);
    const [contactEmail, setContactEmail] = useState(workout.instructor.contactEmail);
    const [contactPhone, setContactPhone] = useState(workout.instructor.contactPhone);
    const [paymentOptions, setPaymentOptions] = useState(workout.payment_options);

    // for redirecting to Class page
    const navigate = useNavigate();
    const {id} = useParams();

    const DAYS = [
        {
          id: "1",
          name: "monday",
          label: "Monday"
        },
        {
          id: "2",
          name: "tuesday",
          label: "Tuesday"
        },
        {
          id: "3",
          name: "wednesday",
          label: "Wednesday"
        },
        {
          id: "4",
          name: "thursday",
          label: "Thursday"
        },
        {
          id: "5",
          name: "friday",
          label: "Friday"
        },
        {
          id: "6",
          name: "saturday",
          label: "Saturday"
        },
        {
           id: "7",
           name: "sunday",
           label: "Sunday"
        }
      ];

    const PAYMENT_OPTIONS = [
        {
            id: "1",
            type: "etransfer",
            label: "E-transfer"
        },
        {
            id: "2",
            type: "cash",
            label: "Cash"
        },
        {
            id: "3",
            type: "visaMastercard",
            label: "Visa/Mastercard"
        },
        {
            id: "4",
            type: "cheque",
            label: "Cheque"
        }
      ];


      const handleSelectDay = (event) => {
        const value = event.target.value; // monday
        const id = event.target.id; // 1
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add checked day to the daysList
            setDaysList([...daysList, value]);
        } else {
            // Remove unchecked item from the daysList
            const filteredList = daysList.filter((item) => item !==value);
            setDaysList(filteredList);
        }

    };

    const handleSelectPayment = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            // Add checked option to the PaymentOptions list
            setPaymentOptions([...paymentOptions, value]);
        } else {
            // Remove unchecked item from the PaymentOptions list
            const filteredList = paymentOptions.filter((item) => item !==value);
            setPaymentOptions(filteredList);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();

        const updatedWorkout = {
            id,
            type,
            title,
            description,
            time,
            cost: fee,
            days: daysList,
            location: {
              place,
              address,
              city,
              region,
              zipcode
            },            
            instructor: {
              name: instructorName,
              description: instructorDescription,
              contactEmail,
              contactPhone
            },
            payment_options: paymentOptions
        }

        console.log('updatedWorkout :', updatedWorkout);

        updateClassSubmit(updatedWorkout);

        // show confirmation
        toast.success('Class listing updated successfully!');
        // redirect to Class page
        navigate(`/classes/${id}`);
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
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
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
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                {/* Checkbox DAY of WEEK */}
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
                                checked={daysList.includes(day.name)}
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
                        htmlFor="fee"
                        className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Fee</label>
                    <input
                        type="number"
                        id="fee"
                        name="fee"
                        className="border rounded w-full py-2 px-3 mb-2"
                        placeholder="Price for One Class or Session"
                        required
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
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
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}         
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}         
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}       
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
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}     
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
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}           
                    />
                </div>
            </fieldset>
            {/* END of LOCATION */}

            {/* INSTRUCTOR INFORMATION */}
            <fieldset>
                <legend className="font-semibold uppercase mb-2 mt-8">Instructor Info</legend>
                <div className="mb-4">
                <label htmlFor="instructorName" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="instructorName"
                        name="instructorName"
                        className="border rounded w-full py-2 px-3"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)} 
                    />
                </div>
                {/* About */}
                <div className="mb-4">
                <label
                    htmlFor="instructorDescription"
                    className="block text-gray-700 font-bold mb-2">About You</label>
                    <textarea
                        id="instructorDescription"
                        name="instructorDescription"
                        className="border rounded w-full py-2 px-3"
                        rows="4"
                        placeholder="Tell a bit about yourself - experience, what moves you?"
                        value={instructorDescription}
                        onChange={(e) => setInstructorDescription(e.target.value)} 
                    ></textarea>
                </div>
                {/* Contact Email */}
                <div className="mb-4">
                    <label
                        htmlFor="contactEmail"
                        className="block text-gray-700 font-bold mb-2">Contact Email</label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        className="border rounded w-full py-2 px-3"
                        placeholder="You email address"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)} 
                    />
                </div>
                {/* Contact Phone */}
                <div className="mb-4">
                    <label
                    htmlFor="contactPhone"
                    className="block text-gray-700 font-bold mb-2">Contact Phone</label>
                    <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        className="border rounded w-full py-2 px-3"
                        placeholder="Add phone number. Optional"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)} 
                    />
                </div>
            </fieldset>
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
                        checked={paymentOptions.includes(payment.type)}
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
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit">
                Add Class
            </button>
            </div>
        </form>
        </div>
        </div>
    </section>
  )
}

export default EditClassPage;
