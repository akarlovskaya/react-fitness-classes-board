import React from 'react';
import Hero from '../components/Hero';
import HomePageCards from '../components/HomePageCards';
import ClassListings from '../components/ClassListings';
import ViewAllClasses from '../components/ViewAllClasses';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomePageCards/>
      <ClassListings isHome={true}/>
      <ViewAllClasses/>
    </>
  )
}

export default HomePage;
