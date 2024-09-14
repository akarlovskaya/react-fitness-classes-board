import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Spinner from './Spinner';
import { HiOutlineMail } from "react-icons/hi";

const Message = ({instructorId, workout}) => {
    const [authUserId, setAuthUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messageInstructor, setMessageInstructor] = useState(false);
    const [message, setMessage] = useState("");
    // console.log('workout.instructor.id', workout.instructor.id);
    // console.log('auth.currentUser?.uid', auth.currentUser?.uid);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setAuthUserId(user.uid);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    function onChange(e) {
        setMessage(e.target.value);
      }

    // Handle loading state
    if (isLoading) {
        return <Spinner/>
    }

    // Check if current user is the instructor
    const isCreator = instructorId === authUserId;

    return (
    <>
    {/* show message btn if it is not a author of post and btn was not clicked */}
    {!isCreator && !messageInstructor && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-bold">Questions?</h3>
            <p className="text-md mb-6">Contact Instructor</p>
            <button 
                onClick={()=>setMessageInstructor(true)}
                className="flex bg-navy hover:bg-navy-light justify-center text-white py-2 px-4 rounded-full w-full items-center 
                focus:outline-none focus:shadow-outline">
                <HiOutlineMail className='mr-2 text-xl'/> Send email
            </button>
        </div>
        )}

        {/* message text area */}
        {messageInstructor && authUserId !== null && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold">Questions?</h3>
                <p className="text-md mb-6">Contact Instructor</p>
                <div className="flex flex-col w-full">
                    <p>
                    Contact <b>{workout.instructor.name}</b> about <b>{workout.title}</b> class.
                    </p>
                    <div className="mt-3 mb-6">
                    <textarea
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={onChange}
                        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                    ></textarea>
                    </div>
                    <a
                    href={`mailto:${workout.instructor.contactEmail}?Subject=${workout.title}&body=${message}`}
                    >
                    <button 
                        className="bg-navy hover:bg-navy-light text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        type="button">
                        Send Message
                    </button>
                    </a>
                </div>
            </div>
        )}
        </>
    );
};

export default Message;
