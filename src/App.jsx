import React from 'react';
import { Route, createBrowserRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'; 
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ClassesPage from './pages/ClassesPage';
import ClassPage, { workoutLoader} from './pages/ClassPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={< MainLayout />}>
      <Route index element={< HomePage />} />
      <Route path='/classes' element={< ClassesPage />} />
      <Route path='/classes/:id' element={< ClassPage />} loader={workoutLoader}/>
      <Route path='*' element={< NotFound />} />
    </Route>
    
    ) 
);

const App = () => {
  return <RouterProvider router={router} />
}

export default App;