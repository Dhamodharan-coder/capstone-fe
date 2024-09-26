import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { loadStripe } from '@stripe/stripe-js'
import { FlightContext } from "./FlightContext";
import { toast } from 'react-toastify';

const ReservationList = () => {
  const BASEURL = "http://localhost:3000";
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null); 
 const { userdetails } = useContext(FlightContext);// Track the reservation being edited
  const [formData, setFormData] = useState({
    departure: '',
    arrival: '',
    date: '',
    passengers: '',
    classType: 'Economy'
  });



  // Fetch reservations on component mount
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login");
        return;
      }

      const response = await axios.get(`${BASEURL}/reservations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      toast.error("Failed to fetch reservations");
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation._id); // Set the reservation ID being edited
    setFormData({
      departure: reservation.departure,
      arrival: reservation.arrival,
      date: reservation.date,
      passengers: reservation.passengers,
      classType: reservation.classType
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found");
        return;
      }

      // Update reservation using the API
      await axios.put(`${BASEURL}/reservations/${editingReservation}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Reservation updated successfully");
      setEditingReservation(null); // Clear the editing state after submission
      fetchReservations(); // Refresh the list
    } catch (error) {
      console.error("Error updating reservation:", error);
      toast.error("Failed to update reservation");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found");
        return;
      }

      const confirmDelete = window.confirm("Are you sure you want to delete this reservation?");
      if (!confirmDelete) return;

      await axios.delete(`${BASEURL}/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Reservation deleted successfully");
      fetchReservations(); // Fetch the updated list after deletion
    } catch (error) {
      console.error("Error deleting reservation:", error);
      toast.error("Failed to delete reservation");
    }
  };

  
  const makepayment = async (reservation) => {

    const stripe = await loadStripe("pk_test_51Pz1ZFFRMxM3lb44FIs2yMSTjX6OWtuce7Hedeugx4oZ1vIAtgm5B9LIAxjLVOA0CblPjGNfzXslthhhNgMbWr04005XH7nwPV");

    const body = {
      
      bookingId: reservation,  // Example booking ID
      amount: 1000,         // Example amount in USD
      paymentMethod: "card",
    };
  
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}` // Add authentication token here
    };
  
    // Sending request to create a checkout session
    const response = await fetch(`${BASEURL}/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)  // Send the passengers array in the request body
    });
  
    const session = await response.json();
  
    if (session.url) {
      // Redirecting the user to Stripe's checkout page using the session URL
      window.location.href = session.url;
     
    } else {
      console.error("Failed to create payment session.");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h4>Your Reservations: <span className="text-primary">{userdetails.username}</span></h4>
      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation._id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Reservation Details:</h5>
              <span>!Once Your Reservation Approved You Will get a payment link</span>
              <p className="mt-4">Reservation ID: {reservation._id}</p>
              <p>Departure: {reservation.departure}</p>
              <p>Arrival: {reservation.arrival}</p>
              <p>Date: {reservation.date}</p>
              <p>Passengers: {reservation.passengers}</p>
              <p>Class: {reservation.classType}</p>
              <p>seatno: {reservation.seatno}</p>
              <p>Status: <span className={`${reservation.status==="pending" ? "yellow":reservation.status==="approved" ?"green" : "red"}`}>{reservation.status}</span> </p>
             <div> 
              {
                reservation.status==="approved" ? (<button className='btn btn-primary m-3' onClick={()=>{makepayment(reservation._id)}} type='submit'>Pay Now</button>) :(<div>
                   <button
                onClick={() => handleEdit(reservation)}
                className="btn btn-primary mx-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(reservation._id)}
                className="btn btn-dark mx-2"
              >
                Delete
              </button>
                </div>)
              }
             </div>

              {/* Inline edit form - Render only for the reservation being edited */}
              {editingReservation === reservation._id && (
                <form onSubmit={handleSubmit} className="my-5">
                  <h4 className="text-center my-3">Edit Your Reservation:</h4>
                  <input
                    type="text"
                    name="departure"
                    value={formData.departure}
                    onChange={handleChange}
                    placeholder="Departure"
                    required
                  />
                  <input
                    type="text"
                    name="arrival"
                    value={formData.arrival}
                    onChange={handleChange}
                    placeholder="Arrival"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    placeholder="Passengers"
                    required
                  />
                  <select
                    name="classType"
                    value={formData.classType}
                    onChange={handleChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First Class">First Class</option>
                  </select>
                  <button type="submit" className="btn btn-primary mt-2">
                    Save
                  </button>
                </form>
              )}
            </div>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default ReservationList;
