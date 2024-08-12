import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  async function onSubmit(e) {
    e.preventDefault();

    try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);
        toast.success("Email was sent");
        // To do - redirect to Sign In page automatically
        
    } catch (error) {
        toast.error("Could not sent reset password");
    }
  }

  return (
    <section className="bg-blue-50 px-4 py-10 h-screen">
        <div className="container-xl lg:container m-auto">
            <h1 className="text-3xl font-bold text-navy mb-6 text-center">Forgot Password</h1>
        
        <form 
            onSubmit={onSubmit}
            className="w-full md:w-[67%] lg:w-[30%] m-auto">
            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>Enter email:
            <input 
                type="email"
                id={email}
                name="email"
                className="border rounded w-full py-2 px-3 mb-5"
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </label>

            <div className='flex justify-between text-sm sm:text-base mb-10'>
                <p>Don't have account? 
                    <Link to="/sign-up" className='text-orange-dark hover:text-orange-light ml-1'>Register</Link>
                </p>
                <p>
                    <Link to="/sign-in" className='text-navy hover:text-indigo-600'>Sign In</Link>
                </p>
            </div>
             <button 
                type='submit'
                className='w-full bg-navy text-white px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-navy-light'>
                    Sent Reset Password
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

export default ForgotPasswordPage;
