import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const BASEURL = "https://dhru-airways.onrender.com";
  const { token } = useParams(); // Extract token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setMessage("Passwords don't match");
    }

    try {
      const response = await axios.post(`${BASEURL}/api/reset_password`, {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      // Redirect after successful password reset
      if (response.data.message === 'Password reset successful') {
        toast.success("Reset Successfully");
        navigate('/login');
      }
    } catch (error) {
      setMessage('Error resetting password, please try again.');
      toast.success("Error resetting password, please try again.");
    }
  };

  return (
  <div className='container'>
    <Navbar />
      <div className="reset-password-container my-5">
      <h2 className='text-dark'>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    <Footer />
  </div>
  );
};

export default ResetPassword;
