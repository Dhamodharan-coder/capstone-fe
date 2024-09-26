import React from 'react'

function Payment_failure() {
  const BASEURL = "http://localhost:3000";
  const handleSendEmails = async () => {
    const token = localStorage.getItem("token"); // Adjust this if you store the token differently
  try {
    const response = await fetch(`${BASEURL}/send-email-failure`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        "Content-Type": "application/json", // Optional: set content type if needed
      },
    });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert(result.message);  // Show success message
      } else {
        alert("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email");
    }
  };

  const handlePaymentFailure = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASEURL}/payment_failure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          booking_id: bookingId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Booking deleted due to failed payment.");
      } else {
        alert(`Failed to delete booking: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during payment failure handling:", error);
      alert("An error occurred while handling the payment failure.");
    }
  };

  // Extract booking_id and session_id from the URL query parameters after success redirect
const queryParams = new URLSearchParams(window.location.search);
const bookingId = queryParams.get('booking_id');


handlePaymentFailure(bookingId);

  
  return (
    <div className='failure-container'>
        <div className="container failure">
        <div className="icon">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#F44336" stroke-width="2"/>
                <path d="M6 6l12 12M18 6L6 18" stroke="#F44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <h1>Payment Failed</h1>
        <p>Unfortunately, your payment could not be processed. Please try again.</p>
        <a href="/" className="button" onClick={handleSendEmails}>Return to Homepage</a>
    </div>
    </div>
  )
}

export default Payment_failure
