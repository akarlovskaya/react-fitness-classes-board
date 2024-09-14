import React, { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import InstructorInfo from '../components/InstructorInfo';
import Message from '../components/Message';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase.js';
import { changeTimeFormat, formatDaysArray } from '../utilities/Utilities.jsx';
import { FaShare } from "react-icons/fa";

const ClassPage = () => {
    // const navigate = useNavigate();
    const workout = useLoaderData();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    return (
        <>
        <section>
            <div className="container m-auto py-6 px-6">
                <Link
                    to="/classes"
                    className="text-indigo-500 hover:text-indigo-600 flex items-center">
                    <FaArrowLeft className='mr-2'/> Back to All Classes
                </Link>
            </div>
        </section>

        <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
                <div
                    className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">

                        <div className='relative flex justify-between'>
                            <div className="text-gray-500 mb-4">{ workout.type }</div>
                            {/* <!-- Share link --> */} 
                            <button
                                type="button"
                                aria-label="Share this class"
                                title="Copy link to share"
                                className="flex text-navy hover:text-navy-light justify-center py-2 px-4 items-center"
                                onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setShareLinkCopied(true);
                                setTimeout(() => {
                                    setShareLinkCopied(false);
                                }, 2000);
                                }}>
                                    Share
                                    <FaShare 
                                        aria-hidden="true" 
                                        focusable="false"
                                        className="mr-2 text-xl pl-2" 
                                        title="Copy link to share" />
                            </button>
                            {shareLinkCopied && (
                                <span className="absolute top-0 right-0 text-xs z-10">
                                Link Copied
                                </span>
                            )}
                        </div>

                    <h1 className="text-3xl font-bold mb-4">
                        { workout.title }
                    </h1>
                    <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                        <FaMapMarker className='inline text-lg mb-1 mr-1 mt-1 text-orange-dark' />
                        <p className="text-orange-dark"> { workout.location.city } </p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-indigo-800 text-lg font-bold mb-6">
                        Class Description
                    </h3>

                    <p className="mb-4"> { workout.description } </p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Fee</h3>

                    { workout.type === "Session" ? 
                        <p className="mb-4">${workout.cost} CAD per 10 sessions</p>
                    : 
                        <p className="mb-4">${workout.cost} CAD</p> 
                    }

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Schedule</h3>

                    <p className="mb-4">{ changeTimeFormat(workout.time) } on {formatDaysArray(workout.days)} </p>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Location</h3>
                    <b className="mb-4">{ workout.location.place } </b>
                    <address 
                        className="mb-4">
                            { workout.location.address }<br/>
                            {`${workout.location.city}, ${workout.location.region}`}<br/>
                            { workout.location.zipcode }
                    </address>

                    <h3 className="text-indigo-800 text-lg font-bold mb-2">Payment Options</h3>
                    <ul>
                        { workout.payment_options.map( payment => {
                            return (
                                <li key={payment}>
                                    {payment.charAt(0).toUpperCase() + payment.slice(1)}
                                </li>  
                            )                   
                        })}
                    </ul>

                </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
                <InstructorInfo workout={workout}/>
                <Message instructorId={workout.instructor.id} workout={workout}/>

                {/* <!-- Manage --> */}
                    {/* <Link
                        to={`/edit-class/${workout.id}`}
                        className="bg-navy hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        >Edit Class</Link>
                    <button 
                        onClick={() => deleteWorkout(workout.id)}
                        className="bg-orange-dark hover:bg-dark-light text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                        Delete Class
                    </button> */}

            </aside>
            </div>
        </div>
        </section>
        </>
    )
};

const workoutLoader = async ({params}) => {
    const workoutId = params.id; // Get the workout ID from route params
    const workoutRef = doc(db, "workouts", workoutId); // Create a reference to the workout document
    const workoutDoc = await getDoc(workoutRef); // Fetch the document

    if (!workoutDoc.exists()) {
        throw new Error("Workout not found");
    }
    return workoutDoc.data();
};

export { ClassPage as default, workoutLoader };
