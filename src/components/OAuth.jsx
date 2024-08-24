import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'; 
import { db } from '../firebase.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const navigate = useNavigate();
  
  async function onClickGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check user existence in db
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          fullName: user.displayName,
          contactEmail: user.email,
          createdAtAuth: serverTimestamp()
        });
      }
      // redirect to Home Page
      navigate("/");

    } catch (error) {
      console.log(error);
        // show error message
        toast.error("Could not authorize with Google.");
    }
  }

  
  return (
    <button 
        type='button'
        onClick={onClickGoogle}
        className='flex items-center justify-center w-full bg-orange-dark text-white px-7 py-3 text-sm font-medium 
                   rounded shadow-md hover:bg-orange-light'>
            <FcGoogle className='mr-4 text-2xl bg-white rounded-full'/> Continue with Google
    </button>
  )
}

export default OAuth;
