import React from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ClassPage = ({deleteWorkout}) => {
    const navigate = useNavigate();
    const workout = useLoaderData();
    // console.log('workout: ', workout);
    // console.log(' workout.days ', workout.payment_options);

    const onDeleteClick = (workoutId) => {
        const confirm = window.confirm("Are you sure you want to delete this class listing?");

        if (!confirm) return;

        deleteWorkout(workoutId);

        toast.success('Class listing deleted successfully!');

        navigate('/classes');
    };

    // Convert time to AM / PM
    const changeTimeFormat = (time) => {
        const timeString12hr = new Date('1970-01-01T' + time + 'Z')
            .toLocaleTimeString('en-CA',
            {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
            );
        return timeString12hr;
    }

    // Capitalize First Letter for Days Array and string together with comma
    function formatDaysArray(daysArray) {
        return daysArray.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
    };

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
                <div className="text-gray-500 mb-4">{ workout.type }</div>
                <h1 className="text-3xl font-bold mb-4">
                    { workout.title }
                </h1>
                <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <FaMapMarker className='inline text-lg mb-1 mr-1 mt-1 text-orange-700' />
                    <p className="text-orange-700"> { workout.location.city } </p>
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

                    {/* <p className="mb-4">${ workout.cost } CAD</p> */}

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
                {/* <!-- Instructor Info --> */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Instructor Info</h3>

                    <h2 className="text-2xl">{ workout.instructor.name }</h2>

                    <p className="my-2"> { workout.instructor.description } </p>

                    <hr className="my-4" />

                    <h3 className="text-xl">Contact Email:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">{ workout.instructor.contactEmail }</p>

                    <h3 className="text-xl">Contact Phone:</h3>

                    <p className="my-2 bg-indigo-100 p-2 font-bold">{ workout.instructor.contactPhone }</p>
                </div>

                {/* <!-- Manage --> */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 className="text-xl font-bold mb-6">Manage Class</h3>
                    <Link
                        to={`/edit-class/${workout.id}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                        >Edit Class</Link>
                    <button 
                        onClick={() => onDeleteClick(workout.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                        Delete Class
                    </button>
                </div>
            </aside>
            </div>
        </div>
        </section>
        </>
    )
};

const workoutLoader = async ({params}) => {
    const res = await fetch(`/api/classes/${params.id}`);
    const data = await res.json();
    return data;
};


export { ClassPage as default, workoutLoader };
