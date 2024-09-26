import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'react-toastify';

const ReservationForm = () => {
  const BASEURL = "https://dhru-airways.onrender.com";
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    passengers: '',
    classType: 'Economy',
    seatno: ""
  });
console.log(formData)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please Login");
        navigate("/login");
        return;
      }
    
      
      await axios.post(`${BASEURL}/reservations`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Reservation created successfully");
      navigate("/reservation-list");
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Failed to create reservation');
    }
  };

  return (
    <div className='container reservation-form'>
      <Navbar />
      <form onSubmit={handleSubmit} className='my-5'>
        <h4 className='text-center my-3'>Book Your Reservation:</h4>
        <input type="text" name="departure" value={formData.departure} onChange={handleChange} placeholder="Departure" required />
        <input type="text" name="arrival" value={formData.arrival} onChange={handleChange} placeholder="Arrival" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="number" name="passengers" value={formData.passengers} onChange={handleChange} placeholder="Passengers" required />
        <select name="classType" value={formData.classType} onChange={handleChange} className='mb-3'>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>
        <button type="submit" className='btn btn-primary'>Submit</button>
        <Link to={"/reservation-list"} className='btn btn-primary mx-4'>Your Reservations</Link>
      </form>
      <Footer />
    </div>
  );
};

export default ReservationForm;
