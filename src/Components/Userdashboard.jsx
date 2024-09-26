import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlightContext } from './FlightContext';
import axios from 'axios';
import logo from "../assets/flight-logo.png";
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';


function Userdashboard() {
  const [usernav, setusernav] = useState("profile");
  const { setprofileimg, profileimg , userdetails, finalBookings, setFinalBookings } = useContext(FlightContext);
  const navigate = useNavigate();
  const inputref = useRef(null);
  const BASEURL = "https://dhru-airways.onrender.com";
  

  // Handle delete
  const deleteFinalBooking = async (id) => {
    
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to Delete this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1a73e8",
        cancelButtonColor: "#c82333",
        iconColor: '#1a73e8',
        confirmButtonText: "Yes, delete Booking!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token');
            // Perform the deletion via axios
            await axios.delete(`${BASEURL}/final_bookings/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            // Update the state to remove the deleted booking from the list
            setFinalBookings(finalBookings.filter(booking => booking._id !== id));
      
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted. You will Get Your Refund Shortly",
              icon: "success",
              confirmButtonColor: "#1a73e8",
              cancelButtonColor: "#c82333",
              iconColor: '#1a73e8'
            });
          } catch (error) {
            console.error("Error deleting booking:", error);
            // Show error message
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting your booking.",
              icon: "error",
              confirmButtonColor: "#1a73e8",
              cancelButtonColor: "#c82333",
              iconColor: '#1a73e8',
            });
          }
        }
      });
      
    } catch (error) {
      console.error('Error deleting final booking:', error);
    }
  };
  



  const generatePDF = (booking) => {
    const doc = new jsPDF();
  
    // Add background color
    doc.setFillColor(240, 240, 240); // Light gray background
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');
  
    // Logo URL
    const logo = 'https://i.ibb.co/TPJJ2zr/flight-logo.png'; // Logo URL
    doc.addImage(logo, 'PNG', 60, 10, 30, 20); // Adjust dimensions as necessary
  
    // Add Title
    doc.setFontSize(30);
    doc.setTextColor(0, 102, 204); // Blue color
    doc.text('Dhru Airways', 20, 40);
  
    // Add Subtitle
    doc.setFontSize(24);
    doc.text('Invoice', 20, 50);
  
    // Add a border around the main content area
    const margin = 15;
    const contentHeight = 180; // Adjust based on your content height
    doc.setDrawColor(0, 102, 204); // Blue border color
    doc.rect(margin, 80, doc.internal.pageSize.getWidth() - margin * 2, contentHeight, 'S'); // 'S' for stroke
  
    // Add Invoice Data
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60); // Medium gray color
  
    // Starting Y position for the invoice data
    let startY = 100; // Starting Y position inside the border
  
    // Assuming the booking object contains an array of passengers
    const passenger = booking.passengers[0]; // Get the first passenger (you may want to loop if there are multiple)
  
    // Add Booking Data
    doc.text(`Booking ID: ${booking._id}`, 20, startY);
    startY += 10;
    doc.text(`From: ${passenger.departure}`, 20, startY);
    startY += 10;
    doc.text(`To: ${passenger.arrival}`, 20, startY);
    startY += 10;
    doc.text(`Flight Name: ${passenger.aircraft}`, 20, startY);
    startY += 10;
    doc.text(`Flight No: ${passenger.flightno}`, 20, startY);
    startY += 10;
    doc.text(`Carrier Code: ${passenger.carrierCode}`, 20, startY);
    startY += 10;
    doc.text(`Scheduled Date: ${new Date(passenger.scheduleddate).toLocaleString()}`, 20, startY);
    startY += 10;
    doc.text(`Class: ${passenger.travelClass}`, 20, startY);
    startY += 10;
    doc.text(`Name: ${passenger.name}`, 20, startY);
    startY += 10;
    doc.text(`E-mail: ${passenger.email}`, 20, startY);
    startY += 10;
    doc.text(`Phone: ${passenger.phone}`, 20, startY);
    startY += 10;
    doc.text(`Total: $${passenger.totalprice}`, 20, startY);
    startY += 10;
    doc.text(`Stops: ${passenger.stops}`, 20, startY);
    startY += 10;
    doc.text(`Travel Duration: ${passenger.totalDuration}`, 20, startY);
    startY += 10;
  
    // Add a horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, startY + 10, 190, startY + 10); // Line below the details
  
    // Add Footer
    doc.setFontSize(10);
    doc.text('Thank you for choosing our service!', 20, startY + 20);
    doc.text('Contact us: dhruairways@gmail.com', 20, startY + 25);
  
    // Create a Blob and download
    const pdfOutput = doc.output('blob');
    const url = URL.createObjectURL(pdfOutput);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.click();
    URL.revokeObjectURL(url); 
    // Clean up the URL object
  };
  
  


  useEffect(() => {
    const fetchUserData = async () => {
      fetchUserData();
    }
    
  },[]);

  const handleLogout = async () => {

    await Swal.fire({
      title: "Are you sure?",
      text: "You want to Log-Out",
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#c82333",
      confirmButtonColor: "#1a73e8",
      iconColor: '#1a73e8',
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out",
          text: "You Are Successfully Logged Out",
          icon: "success",
          cancelButtonColor: "#c82333",
          confirmButtonColor: "#1a73e8",
          iconColor: '#1a73e8',
        });

        localStorage.removeItem('token'); // Clear token on logout
        navigate('/');
      }

    });

  };

  const handleFileChange = (event) => {

    const file = event.target.files[0];
    setprofileimg(URL.createObjectURL(file))

  };


  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="profile-page my-5">
          {/* Sidebar */}
          <div className="sidebar navbar-expand-lg mx-sm-auto">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span><img src='https://img.icons8.com/ios-filled/50/menu--v6.png' alt="menu" /></span>
            </button>
            <div className="profile-info">   <img src={profileimg ? profileimg : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'} alt="profile" ref={inputref} style={{ width: "60px" }} />
             
            {userdetails ? (
      <div className='mt-4'>
        <h2 className='text-primary'>{userdetails.username}</h2>
        <p>{userdetails.email}</p>
      </div>
    ) : (
      <p>Loading user details...</p>
    )}
  
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="sidebar-menu text-center mx-auto">
                <li className={`${usernav === "profile" ? "active" : ""}`} onClick={() => { setusernav("profile") }}>
                  <img src='https://img.icons8.com/arcade/64/gender-neutral-user--v1.png' className="mx-1" alt="profile" />My Profile
                </li>
                <li className={`${usernav === "bookings" ? "active" : ""}`} onClick={() => { setusernav("bookings") }}>
                  <img src='https://img.icons8.com/arcade/64/combi-ticket.png' className="mx-1" alt="bookings" />My Bookings
                </li>
                <li className={`${usernav === "payment" ? "active" : ""}`} onClick={() => { setusernav("payment") }}>
                  <img src='https://img.icons8.com/arcade/64/online-payment-.png' className="mx-1" alt="payment" />Refunds
                </li>
                <li className={`${usernav === "wishlist" ? "active" : ""}`} onClick={() => { setusernav("wishlist") }}>
                  <img src='https://img.icons8.com/arcade/64/like.png' className="mx-1" alt="wishlist" />Wishlist
                </li>
                <li className={`${usernav === "signout" ? "active" : ""}`} onClick={handleLogout}>
                  <img src='https://img.icons8.com/arcade/64/exit.png' className="mx-1" alt="signout" />Sign Out
                </li>
              </ul>
            </div>
          </div>

          {/* Main Section */}
          <div className="main-profile">
            {usernav === "profile" ? (
              <div className="profile-form">
                <form>
                  <div className="profile-photo">
                    <img src={profileimg ? profileimg : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'} alt="profile" ref={inputref} style={{ width: "60px" }} />
                    <label htmlFor="profile-photo-input">Change</label>
                    <input type="file" id="profile-photo-input" onChange={handleFileChange} name='image' hidden />
                  </div>

                  <div className="form-group">
                    <label htmlFor="full-name">Full Name</label>
                    <input value={userdetails.username} disabled/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile-number">E-mail</label>
                    <input value={userdetails.email} disabled/>
                  </div>
                <span>For Security Purpose You can only update Image of Your account.</span>
                  <div className='text-center'>
                    <button className='btn btn-primary' type='submit'>Update</button>
                  </div>
                </form>
              </div>
            ) : null}

{usernav === "bookings" ? (
  <div className="bookings text-center">
    <div className="d-flex justify-content-center">
      <h1>Bookings</h1> 
      <img src="https://img.icons8.com/arcade/64/combi-ticket.png" alt="Booking Icon" />
    </div>

    {finalBookings && finalBookings.length === 0 ? (
      <div>
        <p>There are no bookings.</p>
      </div>
    ) : (
      <div className="final-booking-container my-3">
{finalBookings.map((booking,index) => (
  <div key={index} className="final-booking-card">
    <h3>From: {booking.passengers[0].departure} → To: {booking.passengers[0].arrival}</h3>
    <p>Flight Name: {booking.passengers[0].aircraft}</p>
    <p>Flight No: {booking.passengers[0].flightno}</p>
    <p>Carrier Code: {booking.passengers[0].carrierCode}</p>
    <p>Class: {booking.passengers[0].travelClass}</p>
    {booking.passengers.map((passenger,index) => (
      <div key={index}>
        <p>Name: {passenger.name}</p>
        <p>E-mail: {passenger.email}</p>
        <p>Phone: {passenger.phone}</p>
        <p>Total: ${passenger.totalprice}</p>
        <p>Stops: {passenger.stops}</p>
        <p>Scheduled Date: {new Date(passenger.scheduleddate).toLocaleString()}</p>
        <p>Duration: {passenger.totalDuration}</p>
        <span className='btn btn-light' onClick={()=>{generatePDF(booking)}}>Download Ticket</span>
      </div>
    ))}
      <span className='btn btn-danger mt-3' onClick={() => deleteFinalBooking(booking._id)}>Cancel Booking</span>
  </div>
))}

      </div>





    )}
  </div>
) : null}


            {usernav === "payment" ? (
              <div className="payment text-center">
                <h1>Refunds</h1>
                <p>Refunds Will be reflect to your account in 4 to 5 working days</p>
              </div>
            ) : null}

            {usernav === "wishlist" ? (
              <div className="wishlist text-center">
                <h1>Wishlist</h1>
                <p>This feature will come soon.</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="footer">
          <div className="text-center">
            <img src={logo} alt="logo" />
            <h6 className="text-white">Copyrights ©2024 Dhru. Built by Dhamodharan.</h6>
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
  );
}

export default Userdashboard;
