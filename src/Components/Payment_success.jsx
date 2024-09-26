import React, { useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
function Payment_success() {


  const BASEURL = "http://localhost:3000";
const handleSendEmail = async () => {
  const token = localStorage.getItem("token"); // Adjust this if you store the token differently
  try {
    const response = await fetch(`${BASEURL}/send-email-success`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: set content type if needed
      },
    });

    const result = await response.json();
    console.log(result); 
    if (response.ok) {
      toast.success("E-mail sent"); // Show success message
    } else {
      toast.error(result.message || "Failed to send email"); // Display specific error message if available
    }
  } catch (error) {
    console.error("Error sending email:", error);
    alert("An error occurred while sending the email");
  }
};

const handlePaymentSuccess = async (bookingId, sessionId) => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${BASEURL}/payment_success`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`
      },
      body: JSON.stringify({
          booking_id: bookingId,
          session_id: sessionId,
      }),
  });

  const result = await response.json();
  
  if (result.success) {
      console.log("Booking confirmed:", result.booking);
      // Display booking confirmation in the UI
  } else {
      console.error("Payment confirmation failed:", result.message);
  }
};

// Extract booking_id and session_id from the URL query parameters after success redirect
const queryParams = new URLSearchParams(window.location.search);
const bookingId = queryParams.get('booking_id');
const sessionId = queryParams.get('session_id');

handlePaymentSuccess(bookingId, sessionId);



  useEffect(()=>{
    handleSendEmail();
   
  },[])


  return (
    <div className='success-container'>
    <div className="container success">
        <div className="icon">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#4CAF50" stroke-width="2"/>
                <path d="M6 12l4 4 8-8" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        
        
        <h1>Payment Successful</h1>
        <p>Your payment has been processed successfully. Thank you for your purchase!</p>
        <a href="/" className="button" >Go to Homepage</a>
    </div>
    </div>
  )
}

export default Payment_success
