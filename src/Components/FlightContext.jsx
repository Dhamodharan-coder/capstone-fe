// FlightContext.js
import React, { createContext, useState } from 'react';

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [value,setvalue] = useState([]);
const [company,setcompany]=useState([]);// Add selected flight state
const [selectedFlight,setSelectedFlight]=useState("");
const [selectedFlightt,setSelectedFlightt]=useState("");
const [userinfo,setuserinfo]=useState([]);
const [searchformik,setsearchformik]=useState([]);
const [noflightbookings,setnoflightbookings]=useState(false);
const [selectedSeats, setSelectedSeats] = useState([]);
const [profileimg,setprofileimg]=useState(null)
const [userdetails, setuserdetails] = useState([]);
const [finalBookings, setFinalBookings] = useState([]);
const [loginacc,setloginacc]=useState(false);
const[ticket,setticket]=useState([]);
  return (
    <FlightContext.Provider value={{ ticket,setticket,finalBookings, setFinalBookings,userdetails, loginacc,setloginacc,setuserdetails,setvalue,setcompany,value,company,selectedFlight,noflightbookings,setnoflightbookings,setSelectedFlight,searchformik,setsearchformik,selectedFlightt,setSelectedFlightt,userinfo,setuserinfo,selectedSeats,setSelectedSeats,profileimg,setprofileimg}}>
      {children}
    </FlightContext.Provider>
  );
};
