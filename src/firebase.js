// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAo_rWCV6FZYOad1GmLlLm_q0e8pF4zbBc",
    authDomain: "react-fitness-classes-bo-df7e0.firebaseapp.com",
    projectId: "react-fitness-classes-bo-df7e0",
    storageBucket: "react-fitness-classes-bo-df7e0.appspot.com",
    messagingSenderId: "188757528033",
    appId: "1:188757528033:web:815b51009266a60a1656a0"
  };

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();