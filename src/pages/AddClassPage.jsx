import React from 'react';

const AddClassPage = () => {
  return (
    <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Class</h2>

            <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Class Type</label >
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
            <label className="block text-gray-700 font-bold mb-2">Class Name</label>
            <input
                type="text"
                id="title"
                name="title"
            className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Cardio Dance"
                required
            />
            </div>
            <div className="mb-4">
            <label
                htmlFor="description"
            className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
                id="description"
                name="description"
            className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Tell what to expect from your classes - ex. goal of the class, duration, what participants should bring and wear, if any eguipment will be used in your class. Note: make your first sentance informative and catchy as possible, because only first 130 characters will be visivle on Home Page. Full description is visible on Class details page."
            ></textarea>
            </div>

            <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Fee</label>
            <select
                id="fee"
                name="fee"
            className="border rounded w-full py-2 px-3"required>
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
            </select>
            </div>

            <div className='mb-4'>
            <label className='block text-gray-700 font-bold mb-2'>
                Location
            </label>
            <input
                type='text'
                id='location'
                name='location'
            className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Class Location'
                required           
            />
            </div>

            <h3 className="text-2xl mb-5">Instructor Info</h3>

            <div className="mb-4">
            <label htmlFor="instructor" className="block text-gray-700 font-bold mb-2">Instructor Name</label>
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
                >About Instructor</label>
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
