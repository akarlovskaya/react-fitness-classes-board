import React from 'react';
import { useState } from 'react'; 
import Checkbox from '../components/Checkbox';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { renderSocialIconSwitch } from '../utilities/Utilities';

const AddClassPage = ({addClassSubmit}) => {
    const [type, setType] = useState('Drop-In');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [fee, setFee] = useState('');
    const [daysList, setDaysList] = useState([]);
    const [place, setPlace] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [instructorDescription, setInstructorDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [socialLinksList, setSocialLinksList] = useState([]);
    const [paymentOptions, setPaymentOptions] = useState([]);

    // for redirecting to Class page
    const navigate = useNavigate();
    

    const DAYS = [
        {
          name: "monday",
          label: "Monday"
        },
        {
          name: "tuesday",
          label: "Tuesday"
        },
        {
          name: "wednesday",
          label: "Wednesday"
        },
        {
          name: "thursday",
          label: "Thursday"
        },
        {
          name: "friday",
          label: "Friday"
        },
        {
          name: "saturday",
          label: "Saturday"
        },
        {
           name: "sunday",
           label: "Sunday"
        }
      ];

    const PAYMENT_OPTIONS = [
        {
            type: "etransfer",
            label: "E-transfer"
        },
        {
            type: "cash",
            label: "Cash"
        },
        {

            type: "visaMastercard",
            label: "Visa / Mastercard"
        },
        {
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

        const newWorkout = {
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

        addClassSubmit(newWorkout);

        // show confirmation
        toast.success('Class listing created successfully!');
        // redirect to Class page
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
                        DAYS.map(day => 
                            <Checkbox 
                                key={day.name}
                                type="checkbox"
                                value={day.name} 
                                id={day.name} 
                                name={day.name}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                handleSelect={handleSelectDay}>{day.label}
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

            {/* PAYMENT OPTIONS */}
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
                        handleSelect={handleSelectPayment}>{payment.label}
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
