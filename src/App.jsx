import React from 'react';
import { Route, createHashRouter,createRoutesFromElements,RouterProvider } from 'react-router-dom'; 
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

// const App = () => {

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path='/' element={< MainLayout />}>
//         <Route index element={< HomePage />} />

//         <Route path='/classes' element={< ClassesPage />} />
//         <Route path='/classes/:id' element={< ClassPage />} loader={workoutLoader}/>

//         <Route path='/add-class' element={< PrivateRoute />}>
//           <Route path='/add-class' element={< AddClassPage />} />
//         </Route>
        
//         <Route path='/edit-class' element={< PrivateRoute />}> 
//           <Route path='/edit-class/:id' element={< EditClassPage/>}/>
//         </Route>

//         <Route path='/profile' element={< PrivateRoute />}>
//           <Route path='/profile' element={< ProfilePage />} />
//         </Route>
        
//         <Route path='/sign-in' element={< SignInPage />} />
//         <Route path='/sign-up' element={< SignUpPage />} />
//         <Route path='/forgot-password' element={< ForgotPasswordPage />} />
//         <Route path='*' element={< NotFound />} />
//       </Route>
      
//       ) 
//   );
//   return <RouterProvider router={router} />
// }

// I am using createHashRouter for GitHub Pages only
const App = () => {
  const router = createHashRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/classes' element={<ClassesPage />} />
        <Route path='/classes/:id' element={<ClassPage />} loader={workoutLoader}/>
        
        <Route path='/add-class' element={<PrivateRoute />}>
          <Route index element={<AddClassPage />} />
        </Route>
        
        <Route path='/edit-class' element={<PrivateRoute />}> 
          <Route path=':id' element={<EditClassPage/>}/>
        </Route>

        <Route path='/profile' element={<PrivateRoute />}>
          <Route index element={<ProfilePage />} />
        </Route>
        
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
    // { basename: "/react-fitness-classes-board"}
  );

  return <RouterProvider router={router} />;
}

export default App;