import React from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Navbar from './Navbar';

function FlightStatus() {
  const BASEURL = "http://localhost:3000";
    const [flightData, setFlightData] = useState([]);
    const [spinner,setspinner]=useState(false);
    const formik = useFormik({
      initialValues:  {
            flightno: "",
            carrierCode: "",
            date:"",
        },
    onSubmit : async(values)=>{
    try {
      setspinner(true);
        const response = await axios.get(`${BASEURL}/api`);
        const respons = await fetch(`https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${values.carrierCode}&flightNumber=${values.flightno}&scheduledDepartureDate=${values.date}`, {
          headers: {
            'Authorization': `Bearer ${response.data.access_token}`,
          },
        });
        setspinner(false);
        const dat = await respons.json();
        console.log(dat)
        setFlightData(dat.data)
    } catch (error) {
        console.log(error)
    }
    }
    });
   
  return (
    <div className='container'>
      <Navbar />
      <div className="flight-status-form">
      <h2 className='text-primary'>Flight Status Search</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Flight Number Input */}
        <div className="form-group">
          <label htmlFor="flightNumber">Flight Number</label>
          <input
            type="text"
            name="flightno"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter Flight Number"
            required
          />
        </div>

        {/* Carrier Code Input */}
        <div className="form-group">
          <label htmlFor="carrierCode">Carrier Code</label>
          <input
            type="text"
            name="carrierCode"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter Carrier Code"
            required
          />
        </div>

        {/* Scheduled Date Input */}
        <div className="form-group">
          <label htmlFor="scheduledDate">Scheduled Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
        </div>

        {/* Search Button */}
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>

    {spinner ?(
   <div className='m-auto my-5 d-flex justify-content-center'>
 <div class="spinner-border text-primary" role="status">
         <span class="sr-only"></span>
         </div>  
    </div>
):(

    <div className="flight-status-container">
      <h2 className="heading">Flight Status</h2>
      {flightData.map((flight, index) => (
        <div key={index} className="flight-card">
          {/* Flight Designator Data */}
          <div className="flight-designator">
            <h3>Flight Designator:</h3>
            <p>
              <strong>Carrier Code:</strong> {flight.flightDesignator.carrierCode}
            </p>
            <p>
              <strong>Flight Number:</strong> {flight.flightDesignator.flightNumber}
            </p>
          </div>

          {/* Flight Points Data */}
          <div className="flight-points">
            <h3>Flight Points:</h3>
            <p>
              <strong>Departure IATA Code:</strong> {flight.flightPoints[0].iataCode} <br />
              <strong>Departure Time:</strong> {new Date(flight.flightPoints[0].departure.timings[0].value).toLocaleString()}
            </p>
            <p>
              <strong>Arrival IATA Code:</strong> {flight.flightPoints[1].iataCode} <br />
              <strong>Arrival Time:</strong> {new Date(flight.flightPoints[1].arrival.timings[0].value).toLocaleString()}
            </p>
          </div>
          
          {/* Flight Segment Data */}
          <p>
            <strong>Scheduled Segment Duration:</strong> {flight.segments[0].scheduledSegmentDuration}
          </p>
          
          {/* Flight Leg Data */}
          <p>
            <strong>Aircraft Type:</strong> {flight.legs[0].aircraftEquipment.aircraftType}
          </p>
        </div>
      ))}
    </div>
)}
    </div>
  )
}

export default FlightStatus
