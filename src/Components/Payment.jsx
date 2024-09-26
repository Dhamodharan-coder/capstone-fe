import React, { useState,useEffect } from 'react'
import { FlightContext } from './FlightContext';
import logo from "../assets/flight-logo.png"
import { loadStripe } from '@stripe/stripe-js'
import { useContext } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Payment() {

  // Frontend: payment.js
  const { ticket,setticket,selectedFlightt,selectedFlight,searchformik,userinfo,setuserinfo,setSelectedSeats,selectedSeats,userdetails } = useContext(FlightContext); // Access selected flight from con
  const BASEURL = "http://localhost:3000";

const [userinfotwo,setuserinfotwo]=useState([]);
const [name,setname]= useState([])

  const [seats, setSeats] = useState([
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
    { id: 6, selected: false },
    { id: 7, selected: false },
    { id: 8, selected: false },
    { id: 9, selected: false },
    { id: 10, selected: false },
    { id: 11, selected: false },
    { id: 12, selected: false },
    { id: 13, selected: false },
    { id: 14, selected: false },
    { id: 15, selected: false },
    { id: 16, selected: false },
    { id: 17, selected: false },
    { id: 18, selected: false },
    { id: 19, selected: false },
    { id: 20, selected: false },
    { id: 21, selected: false },
    { id: 22, selected: false },
    { id: 23, selected: false },
    { id: 24, selected: false },
    { id: 25, selected: false },
    { id: 26, selected: false },
    { id: 27, selected: false },
    { id: 28, selected: false },
    { id: 29, selected: false },
    { id: 30, selected: false },
  ]);
  

  // Fetch user seat data from backend on component mount

  // Toggle seat selection
  const toggleSeat = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === id ? { ...seat, selected: !seat.selected } : seat
      )
    );
  };

  // Save selected seats to database
  const saveSeats = async () => {
    const token = localStorage.getItem('token');
    const showseat = seats.filter((seat) => seat.selected).map((seat) => seat.id);
    setSelectedSeats(showseat)

    try {
      await axios.post(
        `${BASEURL}/save-seats`,
        { selectedSeats }, // Wrap selectedSeats in an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("seats saved successfully")
    } catch (error) {
      console.error('Error saving seats:', error);
    }
  }



  const makepayment = async () => {
    const stripe = await loadStripe("pk_test_51Pz1ZFFRMxM3lb44FIs2yMSTjX6OWtuce7Hedeugx4oZ1vIAtgm5B9LIAxjLVOA0CblPjGNfzXslthhhNgMbWr04005XH7nwPV");
  
    // Collect passenger details from your form or state
    const passengers = [
      {
        name: name.name,           // Required field
        email: name.email,  // Required field
        phone: name.phone,  
        flightno: userinfo.flightno.map(e => `${e.number},`).join(' '),
        scheduleddate: userinfo.scheduleddate,  // Ensure this is a valid date format
        stops: userinfo.stops,
        totalprice: Math.round(Number(userinfo.totalprice)),  // Ensure it's a valid number, default to 0 if NaN
        price: Number(userinfo.price) || 0,       // Ensure it's a valid number, default to 0 if NaN
        departure: userinfo.departure,
        arrival: userinfo.arrival,
        totalDuration: userinfo.totalDuration,
        carrierCode: userinfo.carrierCode.map(ea => `${ea.carrierCode},`).join(' '),
        aircraft: userinfo.aircraft,
        travelClass: userinfo.travelClass[0],
      },
      // Add more passengers as needed
    ];
   
    
    // Prepare the request body with passenger details
    const body = {
      bookingId: userinfo._id,
      amount: Math.round(Number(userinfo.totalprice)),  // Total amount
      paymentMethod: "card",
      passengers: passengers  // Passengers array
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

    if (response.ok && session.url) {
      // Redirect to Stripe's checkout page
      window.location.href = session.url;
    } else {
      console.error("Failed to create payment session.", session);
    }
    
  };
  
  

const fetchuserinfo= async ()=>{
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (!token) {
    throw new Error('Please log in.');
  }

  const userinforesponse = await axios.get(`${BASEURL}/booking_list/user_list`,{
    headers: {
      Authorization: `Bearer ${token}`, // Ensure it's in the format 'Bearer <token>'
    }});
    const bookingData = userinforesponse.data.data[0].passengers[0];
    console.log(bookingData)
    setname(bookingData)
  setuserinfo(bookingData);
setuserinfotwo(userinforesponse.data.data);


    }

   



    const handleDeleteBooking = async (bookingId) => {
      if (!bookingId) {
        console.error("Booking ID is undefined");
        return;
      }
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('please log in.');
          return;
        }
  
        const response = await axios.delete(`${BASEURL}/booking_list/user/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        alert('Booking deleted successfully!');
        console.log(response.data);
  
        // After deletion, re-fetch the bookings to update the UI
        fetchuserinfo();
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking');
      }
    };

 
  
const formik= useFormik({
  initialValues : {
    
  },
  onSubmit : async (values)=>{
   console.log(values)
 
  }

});


 
   


const fetchUserSeats = async () => {

  try {
     const token = localStorage.getItem('token');
    const response = await axios.get(`${BASEURL}/get-seats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userSeats = response.data.selectedSeats;
    // Set the seat selections from the database
    setSeats((prevSeats) =>
      prevSeats.map((seat) => ({
        ...seat,
        selected: userSeats.includes(seat.id),
      }))
    );
  } catch (error) {
    console.error('Error fetching user seats:', error);
  }
};

    
  useEffect(()=>{
    fetchuserinfo();
    fetchUserSeats();
    
  },[])
 
  return (
    <div>
    <div className="container">
      <Navbar />
      


      <form onSubmit={formik.handleSubmit}>
        <div className="row mt-4">
            <div className="col col-lg-5 mx-auto">
<div className='payment-inputs'>
    <h1 className='m-2'>Your Bookings</h1>
    <h4 className='m-2'>Confirmation</h4>
    
<div className="payment-container">
<div className="card-logo mx-auto">
    <span>Seat Selection:</span>

    <div className="App mx-auto my-4">
      
      <div className="seat-container">
      <div>
      <h2 className='text-dark'>Select Your Seats</h2>
     <div className='seat-grid-container'>
     <div className="seat-grid">
        {seats.map((seat) => (
          <span
            key={seat.id}
            className={`seat ${seat.selected ? 'selected' : ''}`}
            onClick={() => toggleSeat(seat.id)}
          >
            {seat.id}
          </span>
        ))}
      </div>
     </div>
      <span className='btn btn-primary my-4' onClick={saveSeats}>Save Seats</span>
    </div>

      </div>
    </div>
</div>

<div className="card-details">


<button className='btn btn-primary m-3' onClick={makepayment} type='submit'>Pay Now</button>
</div>
</div>
</div>
            </div>
            <div className="col col-lg-5 my-auto">
            <div className="booking-summary">
   
       {/* Fare Summary */}
       <div className="fare-summary-1">
        <h3>Fare Summary</h3>
        <div className="fare-item">
          <span>Base Fare <i className="info-icon">ℹ️</i></span>
          <span>{userinfo.price}</span>
        </div>

        <div className="fare-item">
          <span>Discount <i className="info-icon"></i></span>
          <span className='text-success'>0</span>
        </div>
        <div className="fare-item">
          <span>Passengers <i className="info-icon"></i></span>
          <span>{searchformik.passengers}</span>
        </div>

        
       
        <div className="total-fare">
          <span>Total Fare</span>
          <span>{Math.round(userinfo.totalprice)}</span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="booking-details">
        <h3>Details</h3>
       <div className='d-flex justify-content-between'>
       <div>
       <div className='my-1'>
        <span><strong>ID:</strong> {selectedFlight.id}</span>
        </div>
        {/* <div className='my-1'>
        <span><strong>Flight No:</strong> {userinfo.flightno.map(ea => `${ea.number} ->`).join(' ')}</span>
        </div>
        <div className='my-1'>
        <span><strong>Carrier Code:</strong> {userinfo.carrierCode.map(eaa=> `${eaa.carrierCode} ->`).join(' ')}</span>
        </div> */}
       <div className='mt-3'>
        <span><strong>No Of Seats:</strong> {selectedSeats.length}</span>
        </div>
        <div>
        <span><strong>Seat Numbers:</strong> {selectedSeats.map((e,index)=>(
          <>
          {`${e},`}
          </>
        ))}</span>
        </div>
        <div className='my-3'>
        <span><strong>Flight Name: </strong> {userinfo.aircraft}</span><br/>
        <span><strong>Date and Time: </strong>{userinfo.scheduleddate}</span><br />
        <span><strong>Travel Class: </strong>{userinfo.travelClass}</span><br />
        </div>
       </div>
       </div>
        <div className="ticket-info">
          <div className="flight-icon">✈️</div>
          <div className="flight-detail">
            <span>{userinfo.departure} &rarr; {userinfo.arrival}</span>
            <span>{userinfo.stops}  Stops • {userinfo.totalDuration} Total Hours</span>
          </div>
        </div>
       <div>
       {
  Array.isArray(userinfotwo) && userinfotwo.map((user, index) => (
    Array.isArray(user.passengers) && user.passengers.map((passenger, passIndex) => (
      <div className="traveler-info" key={passIndex}>
        <div className="traveler-icon">👤</div>
        <div className="traveler-detail">
          <span>{passenger.name}</span>
          <span>{passenger.email}</span>
          <span>{passenger.phone}</span>
          <button className='btn btn-primary' onClick={() => handleDeleteBooking(passenger._id)}>Delete</button>
        </div>
      </div>
    ))
  ))
}




       </div>
        </div>
    
        </div>
            </div>
        </div>
        </form>

        <div className='footer mt-4'>
<div className='text-center'>
<img src={logo} />
<h6 className='text-white'>Copyrights ©2024 Dhru. Build by Dhamodharan.</h6>
</div>
<div className="footer-content">
<ul>
<Link to={"/aboutus"} className='nav-link'> <li>About</li> </Link>
   <Link to={"/policy"} className='nav-link'> <li>Policy</li> </Link>
   <Link to={"/terms"} className='nav-link'> <li>Terms & Conditions</li> </Link>
</ul>
</div>
      </div>
    </div>    
    </div>
  )
}

export default Payment
