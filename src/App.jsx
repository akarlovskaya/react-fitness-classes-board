import React from 'react';
import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'; 
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import ClassPage, { workoutLoader} from './pages/ClassPage';
import AddClassPage from './pages/AddClassPage';
import NotFound from './pages/NotFound';

const App = () => {
  // Add new workout
  const addWorkout = async (newWorkout) => {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });
      console.log('newWorkout: ', newWorkout);
      return;
  };

  // Delete workout
  const deleteWorkout = async (id) => {
    const res = await fetch(`/api/classes/${id}`, {
      method: 'DELETE',
    });
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={< MainLayout />}>
        <Route index element={< HomePage />} />
        <Route path='/classes' element={< ClassesPage />} />
        <Route path='/classes/:id' element={< ClassPage deleteWorkout={deleteWorkout}/>} loader={workoutLoader}/>
        <Route path='/add-class' element={< AddClassPage addClassSubmit={addWorkout}/>} />
        <Route path='*' element={< NotFound />} />
      </Route>
      
      ) 
  );
  return <RouterProvider router={router} />
}

export default App;