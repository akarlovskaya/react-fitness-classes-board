import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomePageCards from './components/HomePageCards';
import ClassListings from './components/ClassListings';
import ViewAllClasses from './components/ViewAllClasses';


const App = () => {
  return (
    <>
      < Navbar/>
      < Hero/>
      < HomePageCards />
      < ClassListings />
      < ViewAllClasses />
    </>
  )
}

export default App;