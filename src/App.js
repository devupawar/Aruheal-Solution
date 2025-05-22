import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard';
import Login from './Login';
import MyNavbar from './MyNavbar';
import AddProduct from './AddProduct';
import AddFaq from './AddFaq';
import AddBlog from './AddBlog';
import AddTestimonial from './AddTestimonial';
import ViewFaq from './ViewFaq';
import ViewProducts from './ViewProducts';
import ViewBlogs from './ViewBlog';
import ViewTestimonials from './ViewTestimonials';
import ViewEnquiries from './ViewEnquiries';
import ViewDistributor from './ViewDistributor';
import RegisterAdmin from './RegisterAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from './Settings';
import ForgotPassword from './ForgotPassword';
import './App.css';
import  { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import ViewProfile from './ViewProfile';
import AddAward from './AddAward';
import ViewAward from './ViewAward';



const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  
  console.log("isAuthenticated:", isAuthenticated);  // Debugging step

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decoded.exp < currentTime) {
        console.log("Token has expired");
        // Handle token expiration, maybe log the user out or refresh the token
      } else {
        console.log("Token is valid");
        // Continue with the authenticated user flow
      }
    }
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated ? <MyNavbar /> : null}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Moved here for accessibility */}
        
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path='/addfaq' element={<AddFaq/>} />      
            <Route path="/addblog" element={<AddBlog />} />
            <Route path='/addtestimonial' element={<AddTestimonial />} />     
            <Route path='/viewfaq' element={<ViewFaq />} />  
            <Route path='/viewproducts' element={<ViewProducts />} />  
            <Route path='/viewblogs' element={<ViewBlogs />} />
            <Route path='/viewtestimonials' element={<ViewTestimonials />} /> {/* Fixed typo */}
            <Route path='/viewenquiries' element={<ViewEnquiries />} /> {/* Fixed typo */}
            <Route path='/addadmin' element={<RegisterAdmin />} />
            <Route path='/viewdistributors' element={<ViewDistributor />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/register' element={<RegisterAdmin />} />
            <Route path='/viewprofile' element={<ViewProfile />} />
            <Route path='/addaward' element={<AddAward/>}/>
            <Route path='/viewaward' element={<ViewAward/>}/>
            
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
