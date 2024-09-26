// src/App.js
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Payment from './Components/Payment';
import Userdashboard from './Components/Userdashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Bookings from './Components/Bookings';
import Payment_success from './Components/Payment_success';
import Payment_failure from './Components/Payment_failure';
import BookingDetails from './Components/BookingDetails';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute component
import { FlightProvider } from './Components/FlightContext';
import { ToastContainer } from 'react-toastify';
import ReservationForm from './Components/ReservationForm';
import ReservationList from './Components/ReservationList';
import Aboutus from './Components/Aboutus';
import Terms from './Components/Terms';
import Policy from './Components/Policy';
import Admin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard"
import FlightStatus from './Components/FlightStatus';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';



function App() {
  const destinations = [
    {
      destination: "Thailand",
      rating: 4,
      imageUrl1: 'https://i.pinimg.com/564x/54/fd/d0/54fdd03a41d272f2ed1a754509bb2d58.jpg',
      additionalInfo: "The Next Flight is on 26th September"
    },
    {
      destination: "France",
      rating: 5,
      imageUrl1: "https://i.pinimg.com/564x/3c/d6/3d/3cd63dec1e77ca1c57f6c6954aa6a818.jpg",
      additionalInfo: "Visit the iconic Eiffel Tower"
    },
    {
      destination: "Japan",
      rating: 4.5,
      imageUrl1: "https://i.pinimg.com/564x/79/b2/b5/79b2b5ec3a3e8c54000575fa005777b9.jpg",
      additionalInfo: "Explore the cherry blossom season in April"
    },
    {
      destination: "Australia",
      rating: 4.7,
      imageUrl1: "https://i.pinimg.com/564x/0a/66/0b/0a660b4f00b6b0e897e9e5791108489b.jpg",
      additionalInfo: "Experience the Great Barrier Reef"
    }
  ];

  return (
    <FlightProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          
          <Route path="/" element={<Home destinations={destinations} />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path='/reservation' element={<ReservationForm />} />
          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/policy' element={<Policy />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password/:token" element={<ResetPassword />} />
       
          
      
          
          <Route
            path="/bookings"
            element={
              
                <Bookings />
          
            }
          />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Userdashboard />
              </ProtectedRoute>
            }
          />





<Route path='/reservation-list' element={
                <ProtectedRoute> <ReservationList /></ProtectedRoute>
           } />
         
          <Route
            path="/booking-list"
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            }
          />

          
<Route path="/payment_success" element={ <ProtectedRoute><Payment_success /></ProtectedRoute>} />
          <Route path="/payment_failure" element={ <ProtectedRoute><Payment_failure /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer />
    </FlightProvider>
    
  );
}

export default App;
