import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ClassPage = () => {
    // const {id} = useParams();
    const workout = useLoaderData();

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
                    <i
                    className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                    ></i>
                    <p className="text-orange-700"> { workout.location } </p>
                </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Class Description
                </h3>

                <p className="mb-4"> { workout.description } </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Fee</h3>

                <p className="mb-4">{ workout.cost }</p>
                </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
                {/* <!-- Company Info --> */}
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
                    to={`/classes/edit/${workout.id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >Edit Class</Link>
                <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
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
