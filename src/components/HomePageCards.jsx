import React from 'react';
import {Link} from 'react-router-dom';
import Card from './Card';

const HomePageCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card bg='bg-orange-100'>
            <h2 className="text-2xl font-bold">For Participants</h2>
            <p className="mt-2 mb-4">
              Find fitness classes near you
            </p>
            <Link
              to="/classes"
              className="inline-block bg-navy text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Classes
            </Link>
          </Card>
          <Card bg='bg-orange-100'>
            <h2 className="text-2xl font-bold">For Fitness Proffesionals</h2>
            <p className="mt-2 mb-4">
              List your classes to help others discover them
            </p>
            <Link
              to="/add-class"
              className="inline-block bg-navy text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Class
            </Link>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomePageCards;
