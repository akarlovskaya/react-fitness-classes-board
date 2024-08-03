import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const { fullName, email, password } = formData;
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(values => ({...values, [name]: value}))
  };

 

  return (
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
            <h1 className="text-3xl font-bold text-navy mb-6 text-center">Sign Up</h1>
        
        <form className="w-full md:w-[67%] lg:w-[30%] m-auto">
            <label htmlFor="fullName" className='block text-gray-700 font-bold mb-2'>Enter full name:
            <input 
                type="text"
                id={fullName}
                name="fullName"
                className="border rounded w-full py-2 px-3 mb-5"
                onChange={handleOnChange}/>
            </label>
            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>Enter email:
            <input 
                type="email"
                id={email}
                name="email"
                className="border rounded w-full py-2 px-3 mb-5"
                onChange={handleOnChange}/>
            </label>
            <div className='relative'>
            <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>Enter password:
            <input 
                type={ showPassword ? "text" : "password" }
                id={password}
                name="password"
                className="border rounded w-full py-2 px-3"
                onChange={handleOnChange}
                />
            { showPassword 
                ? <IoIosEye 
                    className='absolute right-3 top-9 text-xl cursor-pointer'
                    onClick={() => setShowPassword((prevState) => !prevState)}
                />
                : <IoIosEyeOff 
                    className='absolute right-3 top-9 text-xl cursor-pointer'
                    onClick={() => setShowPassword((prevState) => !prevState)}
                />
             }
            </label>
            </div>
            <div className='flex justify-between text-sm sm:text-base mb-10'>
                <p>Have an account? 
                    <Link to="/sign-ip" className='text-orange-dark hover:text-orange-light ml-1'>Sign In</Link>
                </p>
                <p>
                    <Link to="/forgot-password" className='text-navy hover:text-indigo-600'>Forgot Password?</Link>
                </p>
            </div>
             <button 
                type='submit'
                className='w-full bg-navy text-white px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-navy-light'>
                    Sign Up
             </button>
             <div className='flex items-center my-4 
                             before:border-t before:flex-1 before:border-gray-300
                             after:border-t after:flex-1 after:border-gray-300'>
                <p className='text-center font-semibold mx-4'>OR</p>
             </div>
             <OAuth />
        </form>
        </div>
    </section>
  )
}

export default SignUpPage;
