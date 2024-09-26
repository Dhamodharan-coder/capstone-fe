import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { FlightContext } from './FlightContext';

import { Link } from 'react-router-dom';


function Searchbar() {
  const BASEURL = "https://dhru-airways.onrender.com";
const [passvisible,setpassvisible]=useState("none");
const [searchtab,setsearchtab]=useState("flights");
const [tripoption,settripoption]=useState("round-trip");
const [spinner,setspinner]=useState(false);
const [listview,setlistview] = useState(true);

const {setuserdetails,setFinalBookings,finalBookings,setvalue,setcompany,value,company,setSelectedFlight,setSelectedFlightt,setsearchformik,noflightbookings,setnoflightbookings} = useContext(FlightContext);


const [filteredFlights, setFilteredFlights] = useState(value); // Initialize with all flights

  // Function to filter flights based on stops
  const filterFlights = () => {
    const sortedFlights = [...value].sort((a, b) => {
      const stopsA = a.itineraries[0].segments.length - 1; // Number of stops
      const stopsB = b.itineraries[0].segments.length - 1; // Number of stops
      return stopsA - stopsB; // Sort by number of stops (0 first)
    });
    setFilteredFlights(sortedFlights);
  };


  const filterFlightsByPrice = () => {
    const sortedFlights = [...value].sort((a, b) => {
      return parseFloat(a.price.total) - parseFloat(b.price.total); // Sort by price (low to high)
    });
    setFilteredFlights(sortedFlights);
  };

const Navigate = useNavigate();


  

function changehandler(e){
let value = e.target.value;
settripoption(value);
}
    function passclick(){
if(passvisible=="none"){
    setpassvisible("block")
}else{
    setpassvisible("none")
}
    }


    const formik =useFormik({
        initialValues:{
depature:"",
arrival: "",
date:"",
return:"",
passengers:"0",
class:""
        },
        validate: (values)=>{

        },
        onSubmit: async (values)=>{
  
            setsearchformik(values)
                try {
                    setspinner(true);
                 const response = await axios.get(`${BASEURL}/api`);
                 const respons = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${values.depature}&destinationLocationCode=${values.arrival}&departureDate=${values.date}&adults=${values.passengers}&max=10&travelClass=${values.class}`, {
                   headers: {
                     'Authorization': `Bearer ${response.data.access_token}`,
                   },
                 });
                 const dat = await respons.json();

                 if(dat.data === undefined){
                    setnoflightbookings(true)
                    setspinner(false);
                 }
                else{
                    setcompany(dat.dictionaries);
                    setvalue(dat.data);
               setspinner(false);
               setnoflightbookings(false);
                }
               } catch (error) {
                 console.error('Error making API request:', error);
               }
Navigate("/bookings")
        }
    });

    const handleBookNow = (val,company) => {
        setSelectedFlight(val);
        setSelectedFlightt(company);
      };

      const getUserDetails = async () => {
        try {
          const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
          if (!token) {
            throw new Error('No token found. Please log in.');
          }
    
          const response = await axios.get(`${BASEURL}/user_details`, {
            headers: {
              Authorization: `Bearer ${token}`, // Ensure it's in the format 'Bearer <token>'
            },
          });
    
          // Set the user object instead of an array
          setuserdetails(response.data.user);
    
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

       const token = localStorage.getItem('token');
       
    const fetchFinalBookings = async () => {
      try {

        const response = await axios.get(`${BASEURL}/final_bookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
     
        setFinalBookings(response.data.finalBookings);
        
      } catch (error) {
        console.error('Error fetching final bookings:', error);
      }
    };
      useEffect(()=>{
getUserDetails();



    fetchFinalBookings();
 
      },[token])

  return (
    <div>
    <div className='search-bar p-4' id='searchbar'>

      <div className='heading'>
        <div className='my-auto'>
            <h5>Search Flights</h5>
        </div>
        <div  className='d-flex flex-direction-row'>
        <div className='mb-3' onClick={()=>setsearchtab("flights")}>
            <a href='#' className={`m-1 btn ${searchtab==="flights"?"btn-style":""}`}><img src='https://img.icons8.com/pulsar-line/48/airplane-mode-on.png' />Flights</a>
            </div>
           <div onClick={()=>setsearchtab("bookings")}>
           <a href='#'  className={`m-1 btn ${searchtab==="bookings"?"btn-style":""}`}><img src='https://img.icons8.com/material-outlined/24/book.png' /> My Bookings</a>
           </div>
        </div>
      </div>



      <div className="option">
        <select name='options' value={tripoption} onChange={changehandler}>
            <option value="round-trip">One-Time</option>
            <option value="one-time">Round Trip</option>
        </select>
        </div>



    {searchtab==="flights" ?(
         <div className="search p-4">
         <form onSubmit={formik.handleSubmit}>
            <div className='search'>
         <div className="depature d-flex">
          <div className="img me-2 my-auto">
          <img src='https://img.icons8.com/wired/64/FFFFFF/airplane-take-off.png'/>
          </div>
       <div className='d-flex flex-column'>
       <label className='mb-2 text-primary'>Departure</label>
       <select name="depature" onChange={formik.handleChange} value={formik.values.name}>
    <option value="">Search the Country</option>

    <option value="KBL">Afghanistan (Kabul)</option>

    <option value="SYD">Australia (Sydney)</option>
    <option value="MEL">Australia (Melbourne)</option>
    <option value="BNE">Australia (Brisbane)</option>
    <option value="PER">Australia (Perth)</option>

    <option value="GRU">Brazil (São Paulo)</option>
    <option value="GIG">Brazil (Rio de Janeiro)</option>

    <option value="YYZ">Canada (Toronto)</option>
    <option value="YVR">Canada (Vancouver)</option>
    <option value="YUL">Canada (Montreal)</option>
    <option value="YYC">Canada (Calgary)</option>

    <option value="PEK">China (Beijing)</option>
    <option value="PVG">China (Shanghai)</option>
    <option value="CAN">China (Guangzhou)</option>
    <option value="HKG">Hong Kong (Hong Kong)</option>

    <option value="CDG">France (Paris Charles de Gaulle)</option>
    <option value="ORY">France (Paris Orly)</option>
    <option value="NCE">France (Nice)</option>

    <option value="FRA">Germany (Frankfurt)</option>
    <option value="MUC">Germany (Munich)</option>
    <option value="TXL">Germany (Berlin)</option>
    <option value="DUS">Germany (Düsseldorf)</option>

    <option value="DEL">India (Delhi)</option>
    <option value="BOM">India (Mumbai)</option>
    <option value="BLR">India (Bangalore)</option>
    <option value="MAA">India (Chennai)</option>
    <option value="HYD">India (Hyderabad)</option>
    <option value="CCU">India (Kolkata)</option>
    <option value="GOI">India (Goa)</option>

 
    <option value="HND">Japan (Tokyo Haneda)</option>
    <option value="NRT">Japan (Tokyo Narita)</option>
    <option value="KIX">Japan (Osaka Kansai)</option>

    <option value="MEX">Mexico (Mexico City)</option>
    <option value="CUN">Mexico (Cancún)</option>

    <option value="SVO">Russia (Moscow Sheremetyevo)</option>
    <option value="DME">Russia (Moscow Domodedovo)</option>
    <option value="LED">Russia (St. Petersburg)</option>

    <option value="JED">Saudi Arabia (Jeddah)</option>
    <option value="RUH">Saudi Arabia (Riyadh)</option>

    <option value="JNB">South Africa (Johannesburg)</option>
    <option value="CPT">South Africa (Cape Town)</option>

    <option value="ICN">South Korea (Seoul Incheon)</option>
    <option value="GMP">South Korea (Seoul Gimpo)</option>

    <option value="MAD">Spain (Madrid)</option>
    <option value="BCN">Spain (Barcelona)</option>

    <option value="BKK">Thailand (Bangkok)</option>
    <option value="DMK">Thailand (Bangkok Don Mueang)</option>

    <option value="IST">Turkey (Istanbul)</option>

    <option value="DXB">United Arab Emirates (Dubai)</option>
    <option value="AUH">United Arab Emirates (Abu Dhabi)</option>


    <option value="LHR">United Kingdom (London Heathrow)</option>
    <option value="LGW">United Kingdom (London Gatwick)</option>
    <option value="MAN">United Kingdom (Manchester)</option>

    <option value="JFK">United States (New York John F. Kennedy)</option>
    <option value="LAX">United States (Los Angeles)</option>
    <option value="ORD">United States (Chicago O'Hare)</option>
    <option value="ATL">United States (Atlanta)</option>
    <option value="SFO">United States (San Francisco)</option>
    <option value="MIA">United States (Miami)</option>
    <option value="DFW">United States (Dallas/Fort Worth)</option>

</select>

       <span className='mt-2'>{formik.values.depature}</span>
       </div>
       </div>
       
       <div className='my-auto'>
       <div className='img pass-img'>
           <img src='https://img.icons8.com/ios-filled/50/FFFFFF/data-in-both-directions.png' />
       </div>
       
       </div>
       <div className="arrival d-flex">
           <div className="img my-auto me-2">
       <img src='https://img.icons8.com/dotty/80/FFFFFF/airplane-landing.png' />
           </div>
       <div className='d-flex flex-column'>
       <label className='mb-2 text-primary'>Arrival</label>
       <select name="arrival" onChange={formik.handleChange} value={formik.values.name}>
    <option value="">Search the Country</option>

    <option value="KBL">Afghanistan (Kabul)</option>

    <option value="SYD">Australia (Sydney)</option>
    <option value="MEL">Australia (Melbourne)</option>
    <option value="BNE">Australia (Brisbane)</option>
    <option value="PER">Australia (Perth)</option>

    <option value="GRU">Brazil (São Paulo)</option>
    <option value="GIG">Brazil (Rio de Janeiro)</option>

    <option value="YYZ">Canada (Toronto)</option>
    <option value="YVR">Canada (Vancouver)</option>
    <option value="YUL">Canada (Montreal)</option>
    <option value="YYC">Canada (Calgary)</option>

    <option value="PEK">China (Beijing)</option>
    <option value="PVG">China (Shanghai)</option>
    <option value="CAN">China (Guangzhou)</option>
    <option value="HKG">Hong Kong (Hong Kong)</option>

    <option value="CDG">France (Paris Charles de Gaulle)</option>
    <option value="ORY">France (Paris Orly)</option>
    <option value="NCE">France (Nice)</option>

    <option value="FRA">Germany (Frankfurt)</option>
    <option value="MUC">Germany (Munich)</option>
    <option value="TXL">Germany (Berlin)</option>
    <option value="DUS">Germany (Düsseldorf)</option>

    <option value="DEL">India (Delhi)</option>
    <option value="BOM">India (Mumbai)</option>
    <option value="BLR">India (Bangalore)</option>
    <option value="MAA">India (Chennai)</option>
    <option value="HYD">India (Hyderabad)</option>
    <option value="CCU">India (Kolkata)</option>
    <option value="GOI">India (Goa)</option>

 
    <option value="HND">Japan (Tokyo Haneda)</option>
    <option value="NRT">Japan (Tokyo Narita)</option>
    <option value="KIX">Japan (Osaka Kansai)</option>

    <option value="MEX">Mexico (Mexico City)</option>
    <option value="CUN">Mexico (Cancún)</option>

    <option value="SVO">Russia (Moscow Sheremetyevo)</option>
    <option value="DME">Russia (Moscow Domodedovo)</option>
    <option value="LED">Russia (St. Petersburg)</option>

    <option value="JED">Saudi Arabia (Jeddah)</option>
    <option value="RUH">Saudi Arabia (Riyadh)</option>

    <option value="JNB">South Africa (Johannesburg)</option>
    <option value="CPT">South Africa (Cape Town)</option>

    <option value="ICN">South Korea (Seoul Incheon)</option>
    <option value="GMP">South Korea (Seoul Gimpo)</option>

    <option value="MAD">Spain (Madrid)</option>
    <option value="BCN">Spain (Barcelona)</option>

    <option value="BKK">Thailand (Bangkok)</option>
    <option value="DMK">Thailand (Bangkok Don Mueang)</option>

    <option value="IST">Turkey (Istanbul)</option>

    <option value="DXB">United Arab Emirates (Dubai)</option>
    <option value="AUH">United Arab Emirates (Abu Dhabi)</option>


    <option value="LHR">United Kingdom (London Heathrow)</option>
    <option value="LGW">United Kingdom (London Gatwick)</option>
    <option value="MAN">United Kingdom (Manchester)</option>

    <option value="JFK">United States (New York John F. Kennedy)</option>
    <option value="LAX">United States (Los Angeles)</option>
    <option value="ORD">United States (Chicago O'Hare)</option>
    <option value="ATL">United States (Atlanta)</option>
    <option value="SFO">United States (San Francisco)</option>
    <option value="MIA">United States (Miami)</option>
    <option value="DFW">United States (Dallas/Fort Worth)</option>

</select>
       <span className='mt-2'>{formik.values.arrival}</span>
       </div>
       </div>
              
       <div className="date d-flex" >
       <div className="img my-auto me-2">
       <img src='https://img.icons8.com/sf-regular/50/FFFFFF/calendar.png' />
           </div>
           <div className="d-flex flex-column">
       <label className='mb-2 text-primary'>Date</label>
       <input type='date'  name='date' value={formik.values.name} onChange={formik.handleChange}
      />
       <span className='mt-2'>{formik.values.date}</span>
       </div>
       </div>
       
       <div className={`date ${tripoption === "round-trip" ?"d-none":"d-flex"}`} >
       <div className="img my-auto me-2">
       <img src='https://img.icons8.com/sf-regular/50/FFFFFF/calendar.png' />
           </div>
           <div className="d-flex flex-column">
       <label className='mb-2 text-primary'>Return</label>
       <input type='date'  name='return' value={formik.values.name} onChange={formik.handleChange}
      />
       <span className='mt-2'>{formik.values.return}</span>
       </div>
       </div>
       
       <div>
       <div className="passengers d-flex" onClick={passclick}>
       <div className="img my-auto me-2">
       <img src='https://img.icons8.com/dotty/80/FFFFFF/passenger.png' />
           </div>
       
       <div className='d-flex flex-column'>
       <span className='text-primary'>Passengers/Class</span>
       <h5 className='mt-1' onClick={passclick}>{formik.values.passengers}</h5>
       <label >{formik.values.class}</label>
       </div>
       </div>
       
       <div className="passengers-details" style={{display:`${passvisible}`}}>
           <h6 className='text-primary'>Passengers</h6>
         <div className='passenger-input'>
               <h5>{formik.values.passengers}</h5>
               <span>Person</span>
           <div className='mb-3'>
           <input type='number' placeholder='Enter the persons' className='p-2'
       name='passengers' value={formik.values.name} onChange={formik.handleChange}
       />
           </div>
         </div>
       
         <div className="class-input mt-2">
       <h6 className='text-primary'>Cabin Class</h6>
       <select  as="select"
            name="class"
            onChange={formik.handleChange}
            value={formik.values.name}>
                <option value="BUSINESS">Select the class</option>
        <option value="BUSINESS">Business</option>
        <option value="ECONOMY">Economy</option>
        <option value="FIRST">First</option>
       </select>
       <span onClick={passclick} className='btn btn-primary mt-3'>Ok</span>
         </div>
       </div>
       
       
       
       </div>
       </div>
       <div className='text-center mt-4'>
<input className='btn btn-primary' type='submit' value="Search" onClick={()=>{setlistview(true)}}/>
</div>
         </form>
            </div>
    ):(
        <div className="bookings-item text-center">
         
         {finalBookings && finalBookings.length === 0 ? (
      <div>
         <span className='text-dark'>You Don't Have Any Bookings...</span>
      </div>
    ) : (
      <div className="final-booking-container d-flex flex-column">
        <h5 className='text-dark'>Your Bookings:</h5>
        {finalBookings.map((booking) => (
  <div key={booking._id} className="final-booking-card">
    <h3>From: {booking.passengers[0].departure} → To: {booking.passengers[0].arrival}</h3>
    <p>Flight Name: {booking.passengers[0].aircraft}</p>
    <p>Flight No: {booking.passengers[0].flightno}</p>
    <p>Carrier Code: {booking.passengers[0].carrierCode}</p>
    <p>Class: {booking.passengers[0].travelClass}</p>
    {booking.passengers.map((passenger) => (
      <div key={passenger._id}>
        <p>Name: {passenger.name}</p>
        <p>E-mail: {passenger.email}</p>
        <p>Phone: {passenger.phone}</p>
        <p>Total: ${passenger.totalprice}</p>
        <p>Stops: {passenger.stops}</p>
        <p>Scheduled Date: {new Date(passenger.scheduleddate).toLocaleString()}</p>
        <p>Duration: {passenger.totalDuration}</p>
      </div>
    ))}
  </div>
))}

      </div>
    )}

          
           
        </div>
    )
    }


              
    </div>
    <div className={`${!spinner?"bg-primary search_bar_list":''} d-flex flex-column`}>



    {spinner ?(
   <div className='m-auto mb-5'>
 <div class="spinner-border text-primary" role="status">
         <span class="sr-only"></span>
         </div>  
    </div>
):(
<>
{
    noflightbookings ? (<div className='mx-auto p-5 text-light'>
        <h1 className='mx-auto p-5 text-light'>No Flights Available</h1>
    </div>):(
        <div>
          <div className='d-flex justify-content-center m-4'>
          <span className='btn btn-light m-2' onClick={()=>{filterFlights(),setlistview(false)}}>Zero Stops</span>
            <span className='btn btn-light m-2' onClick={()=>{filterFlightsByPrice(),setlistview(false)}}>Best Prices</span>
          </div>
          {(listview ? value : filteredFlights).map((val, index) => (
  <div className="list my-5" key={index}>
    <div className="itinerary-container m-auto">
      <div className="header">
        {val.itineraries && val.itineraries.length > 0 && val.itineraries[0].segments.length > 0 ? (
          <>
            <h1>
              {val.itineraries[0].segments[0].departure.iataCode} &rarr; {val.itineraries[0].segments[val.itineraries[0].segments.length - 1].arrival.iataCode}
            </h1>
            <p>
              {val.itineraries[0].segments.length - 1} Stops • {val.itineraries[0].duration} Total Hours
            </p>
          </>
        ) : (
          <h1>No Itinerary Available</h1>
        )}
      </div>

      <div className="details">
        <p>
          <strong>Travel Class: </strong>
          {
  val.travelerPricings && val.travelerPricings.length > 1 &&
  val.travelerPricings[1] && 
  val.travelerPricings[1].fareDetailsBySegment && 
  Array.isArray(val.travelerPricings[1].fareDetailsBySegment) ?
    val.travelerPricings[1].fareDetailsBySegment.map((cab) => `${cab.cabin} , `) :
    "N/A"
}

          <br />
          <strong>Flight Number: </strong>
          {val.itineraries && val.itineraries[0].segments.length > 0 ? val.itineraries[0].segments.map((carrier)=>(`${carrier.number}->` || "N/A")) || "N/A" : "N/A"} {/* Flight number from 'number' field */}
          <br />
          <strong>Carrier Code: </strong>
          {val.itineraries && val.itineraries[0].segments.length > 0 ? (
            <>
              {val.itineraries[0].segments.map((carrier)=>(`${carrier.carrierCode}->` || "N/A"))}
            </>
          ) : "N/A"}
          <br />
          <strong>Scheduled Departure: </strong>
          {val.itineraries && val.itineraries[0].segments.length > 0 ? new Date(val.itineraries[0].segments[0].departure.at).toLocaleString() : "N/A"}
          <br />
          <strong>Cancellation Policy: </strong>
          {val.cancellationPolicy || "No cancellation policy available."}
          <p><strong>ID:</strong> {index + 1}</p>
        </p>
      </div>

      <div className="row">
        <div className="col col-lg-8">
          <div className="flight-summary">
            {val.itineraries && val.itineraries.length > 0 && val.itineraries[0].segments.map((segment, segIndex) => (
              <div className="flight-info" key={segIndex}>
                <div className="d-flex justify-content-between">
                  <div className="flight-section">
                    <p>
                      <strong>{`${company.carriers[segment.carrierCode]}`}</strong>
                      <br />
                      {`${company.aircraft[segment.aircraft.code]}`}
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
                {segIndex < val.itineraries[0].segments.length - 1 && (
                  <div className="layover bg-primary">
                    <p className=' text-light'>Layover: {new Date(val.itineraries[0].segments[segIndex + 1].departure.at).toLocaleString()} - {new Date(segment.arrival.at).toLocaleString()}</p>
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
                <span>${val.price.total}</span>
              </div>
              <div className="fare-item">
                <span>Discount</span>
                <span className="discount">0</span>
              </div>
              <div className="fare-item">
                <span>Passengers</span>
                <span>{formik.values.passengers}</span>
              </div>
              <div className="fare-total">
                <span>Total Fare</span>
                <span>${val.price.total * formik.values.passengers}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="layover">
        <p>Last Ticket Booking Date: <strong>{val.lastTicketingDate}</strong></p>
      </div>

      <div className="mt-4 text-center">
        <Link to={"/booking-list"} className="btn btn-primary" onClick={() => { handleBookNow(val, company); }}>Book Now</Link>
      </div>
    </div>
  </div>
))}




        </div>
    )
}
</>
    
)
    }

    </div>
    </div>
  )
}

export default Searchbar
