import React from 'react'
import { useState,useContext } from 'react';
import { FlightContext } from './FlightContext';
import { useFormik } from 'formik';
import logo from "../assets/flight-logo.png"
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function BookingDetails() {
  const BASEURL = "http://localhost:3000";
    const [numPassengers, setNumPassengers] = useState(1); // State to control the number of passengers
    const {selectedFlight,selectedFlightt,searchformik} = useContext(FlightContext);
const Navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      passengers: Array(numPassengers).fill({ name: '',
         email: '', 
         phone: '', 
          flightno: selectedFlight.itineraries[0].segments,
          scheduleddate: new Date(selectedFlight.itineraries[0].segments[0].departure.at).toLocaleString(),
          stops: selectedFlight.itineraries[0].segments.length - 1,
          price:selectedFlight.price.total,
          totalprice: selectedFlight.price.total*searchformik.passengers,
          departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
          arrival: selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode,
          totalDuration: selectedFlight.itineraries[0].duration,
          carrierCode: selectedFlight.itineraries[0].segments,
          aircraft: selectedFlightt.aircraft[selectedFlight.itineraries[0].segments[0].aircraft.code],
          travelClass: selectedFlight.travelerPricings[0].fareDetailsBySegment[0].cabin,
        
        })
    },
    onSubmit: async (values) => {
      console.log(values)
      const token = localStorage.getItem('token');
if (!token) {
    alert('No token found in localStorage');
    return;
}// Assuming you're storing the token in localStorage

      await axios.post(`${BASEURL}/booking_list/user`, values, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      toast.success("List Added")
Navigate("/payment")
    },
  });

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...formik.values.passengers];
    newPassengers[index][field] = value;
    formik.setFieldValue('passengers', newPassengers);
  };

  const addPassengerFields = (e) => {
    e.preventDefault();
    setNumPassengers(numPassengers + 1);
    formik.setFieldValue('passengers', [...formik.values.passengers, { name: '', email: '', phone: '',
      flightno: selectedFlight.itineraries[0].segments.number,
      scheduleddate: new Date(selectedFlight.itineraries[0].segments[0].departure.at).toLocaleString(),
      stops: selectedFlight.itineraries[0].segments.length - 1,
      price:selectedFlight.price.total,
      totalprice: selectedFlight.price.total*searchformik.passengers,
      departure: selectedFlight.itineraries[0].segments[0].departure.iataCode,
      arrival: selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode,
      totalDuration: selectedFlight.itineraries[0].duration,
      carrierCode: selectedFlight.itineraries[0].segments.carrierCode,
      aircraft: selectedFlightt.aircraft[selectedFlight.itineraries[0].segments[0].aircraft.code],
      travelClass: selectedFlight.travelerPricings[0].fareDetailsBySegment[0].cabin,


     }]);
  };

  const removePassengerFields = (index) => {
    const newPassengers = formik.values.passengers.filter((_, i) => i !== index);
    setNumPassengers(newPassengers.length);
    formik.setFieldValue('passengers', newPassengers);
  };


  

  return (
    <div className='container '>
      <Navbar />
    <div className='d-flex flex-wrap mt-4'>
    <div className="booking-form-container d-flex flex-column justify-content-center">
      <h2>Enter Booking Details</h2>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.passengers.map((passenger, index) => (
          <div className="passenger-details" key={index}>
            <h3>Passenger {index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`name-${index}`}>Full Name</label>
              <input
                type="text"
                id={`name-${index}`}
                name={`passengers[${index}].name`}
                value={passenger.name}
                onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`email-${index}`}>Email</label>
              <input
                type="email"
                id={`email-${index}`}
                name={`passengers[${index}].email`}
                value={passenger.email}
                onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`phone-${index}`}>Phone</label>
              <input
                type="tel"
                id={`phone-${index}`}
                name={`passengers[${index}].phone`}
                value={passenger.phone}
                onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                required
              />
            </div>
            
            <button
              className="btn btn-danger"
              onClick={() => removePassengerFields(index)}
              disabled={numPassengers === 1} // Disable removing if only one passenger is left
            >
              Remove Passenger
            </button>
          </div>
        ))}

        <button className="btn btn-primary" onClick={addPassengerFields}>
          Add Another Passenger
        </button>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>


<div className="booking-form-container my-auto">
<div className="list my-5">
  <div className="itinerary-container m-auto">
    <div className="header">
      <h1>
        {selectedFlight.itineraries[0].segments[0].departure.iataCode} &rarr;{" "}
        {selectedFlight.itineraries[0].segments[selectedFlight.itineraries[0].segments.length - 1].arrival.iataCode}
      </h1>
      <p>
        {selectedFlight.itineraries[0].segments.length - 1} Stops •{" "}
        {selectedFlight.itineraries[0].duration} Total Hours
      </p>
    </div>
 

    <div className="details">
      <p>
        <strong>Travel Class:</strong>{" "}
        {
  selectedFlight.travelerPricings && 
  selectedFlight.travelerPricings[0].fareDetailsBySegment[0].cabin
}

      </p>
      <strong>Flight Number: </strong>
          {selectedFlight.itineraries && selectedFlight.itineraries[0].segments.length > 0 ? selectedFlight.itineraries[0].segments.map((carrier)=>(`${carrier.number} ->`)) || "N/A" : "N/A"} {/* Flight number from 'number' field */}
          <br />
          <strong>Carrier Code: </strong>
          {selectedFlight.itineraries && selectedFlight.itineraries[0].segments.length > 0 ? (
            <>
              {selectedFlight.itineraries[0].segments.map((carrier)=>(`${carrier.carrierCode} ->`)) || "N/A"}
            </>
          ) : "N/A"}
          <br />
          <strong>Scheduled Departure: </strong>
          {selectedFlight.itineraries && selectedFlight.itineraries[0].segments.length > 0 ? new Date(selectedFlight.itineraries[0].segments[0].departure.at).toLocaleString() : "N/A"}
          <br />
          <strong>Cancellation Policy: </strong>
          {selectedFlight.cancellationPolicy || "No cancellation policy available."}
          <br />
          <p><strong>ID:</strong>{selectedFlight.id}</p>
          
       
    </div>

    <div className="row">
      <div className="col col-lg-8">
        <div className="flight-summary">
          
{
selectedFlight.itineraries && selectedFlight.itineraries.length > 0 && selectedFlight.itineraries[0].segments.map((segment, segIndex) => (
  <div className="flight-info" key={segIndex}>
    <div className="d-flex justify-content-between">
      <div className="flight-section">
        <p>
          <strong>{`${selectedFlightt.carriers[segment.carrierCode]}`}</strong>
          <strong>{`${selectedFlightt.carriers[segment.carrierCode]}`}</strong>
          <br />
          {`${selectedFlightt.aircraft[segment.aircraft.code]}`}
        </p>
      </div>

      <div className="duration">
        <p>
          <strong>Travel Hours</strong>
          <br />
          {segment.duration}
        </p>
      </div>
    </div>

    {/* Displaying departure and arrival information */}
    <div className="flight-section d-flex justify-content-between">
      <div>
        <p>
          <strong>{segment.departure.iataCode}</strong>
          <br />
          {new Date(segment.departure.at).toLocaleString()} {/* Format date as needed */}
          <br />
          Terminal: {segment.departure.terminal}
        </p>
      </div>
      <div>
        <p>
          <strong>{segment.arrival.iataCode}</strong>
          <br />
          {new Date(segment.arrival.at).toLocaleString()} {/* Format date as needed */}
          <br />
          Terminal: {segment.arrival.terminal}
        </p>
      </div>
    </div>
    
    {/* Add a separator or waiting time display if there is a next segment */}
    {segIndex < selectedFlight.itineraries[0].segments.length - 1 && (
      <div className="layover bg-primary">
        <p className=' text-light'>Layover: {new Date(selectedFlight.itineraries[0].segments[segIndex + 1].departure.at).toLocaleString()} - {new Date(segment.arrival.at).toLocaleString()}</p>
      </div>
    )}
  </div>
))}
</div>
      </div>

      <div className="col col-lg-4">
        <div className="fare-summary">
          <div className="fare-summary-box">
            <h3>Fare Summary</h3>
            <div className="fare-item">
              <span>Base Fare</span>
              <span>${selectedFlight.price.total}</span>
            </div>
            <div className="fare-item">
              <span>Discount</span>
              <span className="discount">0</span>
            </div>
            <div className="fare-item">
              <span>Passengers</span>
              <span>{searchformik.passengers}</span>
            </div>

            <div className="fare-total">
              <span>Total Fare</span>
              <span>${(selectedFlight.price.total * searchformik.passengers).toFixed(2)}</span> {/* Format total */}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="layover">
      <p>
        Last Ticket Booking Date:{" "}
        <strong>{new Date(selectedFlight.lastTicketingDate).toLocaleString()}</strong> {/* Format date */}
      </p>
    </div>
  </div>
</div>



</div>
    </div>


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
  )
}

export default BookingDetails
