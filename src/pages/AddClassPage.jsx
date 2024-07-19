import React from 'react';
import { useState } from 'react'; 

const AddClassPage = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [days, setDays] = useState('');
    const [fee, setFee] = useState(null);
    const [place, setPlace] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [instructorName, setInstructorName] = useState('');
    const [instructorDescription, setInstructorDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [paymentOptions, setPaymentOptions] = useState('');

  return (
    <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form>
            <h1 className="text-3xl text-center font-semibold mb-6">Add Class</h1>

            <fieldset>
                <legend className="font-semibold uppercase mb-2 mt-8">Class Information</legend>
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

            <fieldset>
            <legend class="block text-sm font-semibold leading-6 text-gray-900 mb-2">Days of the Week</legend>
            <div class="mb-4">
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="monday" name="monday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="monday" class="font-medium text-gray-900">Monday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="tuesday" name="tuesday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="tuesday" class="font-medium text-gray-900">Tuesday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="wednesday" name="wednesday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="wednesday" class="font-medium text-gray-900">Wednesday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="thursday" name="thursday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="thursday" class="font-medium text-gray-900">Thursday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="friday" name="friday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="friday" class="font-medium text-gray-900">Friday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="saturday" name="saturday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="saturday" class="font-medium text-gray-900">Saturday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="sunday" name="sunday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="sunday" class="font-medium text-gray-900">Sunday</label>
                </div>
              </div>
            </div>
          </fieldset>

            <div className="mb-4">
            <label
                htmlFor="fee"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Fee</label>
            <input
                type="number"
                id="fee"
                name="fee"
                className="border rounded w-full py-2 px-3"
                placeholder="Price for One Class or Session"
                required
                value={fee}
                onChange={(e) => setFee(e.target.value)}
            />
            </div>
            </fieldset>

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

            <fieldset>
            <legend class="block text-sm font-semibold leading-6 text-gray-900 mb-2">Payment Options</legend>
            <div class="mb-4">
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="etransfer" name="etransfer" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="etransfer" class="font-medium text-gray-900">E-transfer</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="cash" name="cash" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="cash" class="font-medium text-gray-900">Cash</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="visa" name="visa" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="visa" class="font-medium text-gray-900">Visa/Mastercard</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="cheque" name="cheque" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label htmlFor="cheque" class="font-medium text-gray-900">Cheque</label>
                </div>
              </div>
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
};

export default AddClassPage;
