import React from 'react';
import {NavLink} from 'react-router-dom';
import vanklasLogo from '../assets/images/vanKlas-logo-narrow.png';

const Navbar = () => {

  const LinkClass = ({ isActive }) => 
    isActive 
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <>
    <nav className="bg-navy border-b">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-20 w-auto"
                src={ vanklasLogo }
                alt="vanklasLogo, Discover Fitness in Metro Vancover"
              />
              {/* <span className="hidden md:block text-white text-2xl font-bold ml-2">Discover Fitness in Metro Vancover</span> */}
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                to="/"
                  className={LinkClass}>Home</NavLink>
                <NavLink
                  to="/classes"
                  className={LinkClass}>Classes</NavLink>
                <NavLink
                  to="/add-class"
                  className={LinkClass}>Add Class</NavLink>
                <NavLink
                  to="/profile"
                  className={LinkClass}>Profile</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar;
