import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import logo from "../assets/flight-logo.png"




const AdminDashboard = () => {
  return (
    <div>
      <div className='admin main-header'>
      <img src={logo} alt='logo' className='mx-4' style={{width:"100px",height:"100px"}}  / >
      <h1 className='text-dark mt-4'><span className='text-primary'>Dhru</span> Airways</h1>
      </div>
      <Sidebar />
      
    </div>
  );
};

export default AdminDashboard;
