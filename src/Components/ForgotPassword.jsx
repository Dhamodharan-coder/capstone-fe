import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const BASEURL = "http://localhost:3000";
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/api/forgot_password`, { email });
      setMessage(response.data.message);
      toast.success("Reset Link sent to E-Mail");
    } catch (error) {
      setMessage('Error sending reset link, please try again.');
      toast.success("Error sending reset link, please try again.");
    }
  };

  return (
   <div className='container'>
    <Navbar />
     <div className="forgot-password-container my-5">
      <h2 className='text-dark'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label>Email:</label>
        <input
          type="email"  
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className='text-dark mt-4'>{message}</p>}
    </div>
    <Footer />
   </div>
  );
};

export default ForgotPassword;
