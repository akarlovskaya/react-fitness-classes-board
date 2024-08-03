import React from 'react';
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button 
        type='submit'
        className='flex items-center justify-center w-full bg-orange-dark text-white px-7 py-3 text-sm font-medium 
                   rounded shadow-md hover:bg-orange-light'>
            <FcGoogle className='mr-4 text-2xl bg-white rounded-full'/> Continue with Google
    </button>
  )
}

export default OAuth;
