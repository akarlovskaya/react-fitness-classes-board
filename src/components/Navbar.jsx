import React from 'react';
import { NavLink } from 'react-router-dom';
import vanklasLogo from '../assets/images/vanKlas-logo-narrow.png';

const Navbar = () => {

  const LinkClass = ({ isActive }) => 
    isActive 
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <>
    <header className="bg-navy border-b shadow-sm sticky top-0 z-50">
          <nav className="flex justify-between items-center px-3 max-w-6xl mx-auto">

            {/* Logo */}
            <div>
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img
                  className="h-20 w-auto"
                  src={ vanklasLogo }
                  alt="vanklasLogo, Discover Fitness in Metro Vancouver"
                />
              </NavLink>
            </div>

            {/* Navigation */}
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
          </nav>
    </header>
    </>
  )
}

export default Navbar;
