import React from 'react';
import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'; 
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import ClassPage, { workoutLoader} from './pages/ClassPage';
import AddClassPage from './pages/AddClassPage';
import EditClassPage from './pages/EditClassPage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PrivateRoute from './components/PrivateRoute';
import { db } from './firebase.js';
import { addDoc,collection } from 'firebase/firestore';

const App = () => {
  // Add new workout
  const addWorkout = async (newWorkout) => {
      try {
        const docRef = await addDoc(collection(db, 'workouts'), newWorkout);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    const res = await fetch(`/api/classes/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Edit workout
  const updateWorkout = async (updatedWorkout) => {
    const res = await fetch(`/api/classes/${updatedWorkout.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWorkout),
    });
    console.log('updatedWorkout: ', updatedWorkout);
    return;

  };
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={< MainLayout />}>
        <Route index element={< HomePage />} />
        <Route path='/classes' element={< ClassesPage />} />
        <Route path='/classes/:id' element={< ClassPage deleteWorkout={deleteWorkout}/>} loader={workoutLoader}/>

        <Route path='/add-class' element={< PrivateRoute />}>
          <Route path='/add-class' element={< AddClassPage addClassSubmit={addWorkout}/>} />
        </Route>
        
        <Route path='/edit-class/:id' element={< PrivateRoute />}>
          <Route path='/edit-class/:id' element={< EditClassPage updateClassSubmit={updateWorkout}/>} loader={workoutLoader}/>
        </Route>
        
        <Route path='/profile' element={< PrivateRoute />}>
          <Route path='/profile' element={< ProfilePage />} />
        </Route>
        
        <Route path='/sign-in' element={< SignInPage />} />
        <Route path='/sign-up' element={< SignUpPage />} />
        <Route path='/forgot-password' element={< ForgotPasswordPage />} />
        <Route path='*' element={< NotFound />} />
      </Route>
      
      ) 
  );
  return <RouterProvider router={router} />
}

export default App;