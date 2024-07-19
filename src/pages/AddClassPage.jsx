import React from 'react';

const AddClassPage = () => {
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
                    required>
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
                placeholder="Tell what to expect from your classes - e.g. goal of the class, duration, what participants should bring and wear, if any eguipment will be used in your class. Note: Make your first sentence as informative and catchy as possible, as only the first 130 characters will be visible on the Home Page. The full description will be visible on the Class Details page.">
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
                  <label for="monday" class="font-medium text-gray-900">Monday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="tuesday" name="tuesday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="tuesday" class="font-medium text-gray-900">Tuesday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="wednesday" name="wednesday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="wednesday" class="font-medium text-gray-900">Wednesday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="thursday" name="thursday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="thursday" class="font-medium text-gray-900">Thursday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="friday" name="friday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="friday" class="font-medium text-gray-900">Friday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="saturday" name="saturday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="saturday" class="font-medium text-gray-900">Saturday</label>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="sunday" name="sunday" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                </div>
                <div class="text-sm leading-6">
                  <label for="sunday" class="font-medium text-gray-900">Sunday</label>
                </div>
              </div>
            </div>
          </fieldset>

            {/* <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Day</label>
            <select
                id="day"
                name="day"
            className="border rounded w-full py-2 px-3"required>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            </div> */}

            <div className="mb-4">
            <label
                htmlFor="fee"
                className="block text-sm font-semibold leading-6 text-gray-900 mb-2">Fee</label>
            <input
                type="text"
                id="fee"
                name="fee"
                className="border rounded w-full py-2 px-3"
                placeholder="Price for One Class or Session"
                required
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
                    />
                    <label htmlFor="postal-code" className='block text-gray-700 font-bold mb-2'>
                        ZIP / Postal code
                    </label>
                    <input
                        type='text'
                        id='postal-code'
                        name='postal-code'
                        className='border rounded w-full py-2 px-3 mb-2'
                        required           
                    />

                </div>
            </fieldset>


            <fieldset>
            <legend className="font-semibold uppercase mb-2 mt-8">Instructor Info</legend>
            <div className="mb-4">
            <label htmlFor="instructor" className="block text-gray-700 font-bold mb-2">Name</label>
            <input
                type="text"
                id="instructor"
                name="instructor"
            className="border rounded w-full py-2 px-3"/>
            </div>

            <div className="mb-4">
            <label
                htmlFor="about_instructor"
            className="block text-gray-700 font-bold mb-2"
                >About You</label>
            <textarea
                id="about_instructor"
                name="about_instructor"
            className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Tell a bit about yourself - experience, what moves you?"
            ></textarea>
            </div>

            <div className="mb-4">
            <label
                htmlFor="contact_email"
            className="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input
                type="email"
                id="contact_email"
                name="contact_email"
            className="border rounded w-full py-2 px-3"
                placeholder="You email address"
                required
            />
            </div>
            <div className="mb-4">
            <label
                htmlFor="contact_phone"
            className="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
            className="border rounded w-full py-2 px-3"
                placeholder="Add phone number. Optional"
            />
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
