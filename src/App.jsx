import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomePageCards from './components/HomePageCards';
import ClassListings from './components/ClassListings';


const App = () => {
  return (
    <>
      < Navbar/>
      < Hero/>
      < HomePageCards />
      < ClassListings />

      <section className="m-auto max-w-lg my-10 px-6">
        <a
          href="jobs.html"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View All Jobs</a
        >
      </section>
    </>
  )
}

export default App
