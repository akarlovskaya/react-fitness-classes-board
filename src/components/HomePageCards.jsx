import React from 'react';
import Card from './Card';

const HomePageCards = () => {
  return (
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Card>
            <h2 className="text-2xl font-bold">For Participants</h2>
            <p className="mt-2 mb-4">
              Find fitness classes near you
            </p>
            <a
              href="/jobs.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Classes
            </a>
          </Card>
          <Card bg='bg-orange-100'>
            <h2 className="text-2xl font-bold">For Fitness Proffesionals</h2>
            <p className="mt-2 mb-4">
              List your classes to help others discover them
            </p>
            <a
              href="/add-job.html"
              className="inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Class
            </a>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomePageCards
