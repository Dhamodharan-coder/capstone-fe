import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Terms() {
  return (
    <div>
        <div className='container'>
      <Navbar />
      <div className='my-4'>
        <h1 className='text-center'>Terms and Conditions</h1>
        <span>
        <h5 className='text-primary'>1. Acceptance of Terms</h5>
        By booking a flight or using the services provided by Dhru Airways, you agree to these Terms and Conditions. These terms govern all bookings, services, and purchases made via our website or other booking platforms. </span><br />
     <br />
        <span>
        <h5 className='text-primary'>2. Booking and Payment</h5>
        Booking Confirmation: All reservations are subject to availability. A booking is only confirmed once full payment has been made and a confirmation email is received.
Payment Methods: Dhru Airways accepts various payment methods including credit/debit cards, mobile payments, and bank transfers. All prices are listed in the relevant currency at the time of booking.
Cancellation Policy: Cancellations made within 24 hours of booking may be eligible for a full refund, depending on the fare type. Refunds for cancellations after this period may vary based on the fare rules of the ticket purchased. Please check our cancellation policy before booking.
        </span><br />

        <span>
        <h5 className='text-primary'>3. Check-In and Boarding</h5>
        Check-In Times: Passengers are required to check in at least 2 hours before domestic flights and 3 hours before international flights. Online check-in is available for select flights.
Boarding: Boarding gates close 30 minutes before the scheduled departure for domestic flights and 45 minutes before international flights. Dhru Airways reserves the right to deny boarding to any passenger who fails to arrive at the gate on time.
   </span><br />
    
   <span>
        <h5 className='text-primary'>4. Baggage Policy</h5>
        Carry-On: Passengers are allowed one carry-on bag and one personal item (such as a handbag or laptop) free of charge, within the size and weight limits.
Checked Baggage: Allowances for checked baggage vary depending on the fare class and destination. Excess baggage fees may apply for overweight or additional luggage.
  </span><br />


  <span>
        <h5 className='text-primary'>5. Flight Changes and Delays</h5>
        Flight Changes: Changes to your flight booking (e.g., date or time) can be made based on availability, and any additional charges will depend on the fare type and route.
Delays and Cancellations: In case of delays or cancellations due to weather, operational issues, or other unforeseen circumstances, Dhru Airways will attempt to notify passengers as soon as possible. Compensation or rebooking options will be provided as per regulatory guidelines.
</span><br />

<span>
        <h5 className='text-primary'>6. Passenger Conduct</h5>
        All passengers must comply with Dhru Airways' in-flight policies, including safety regulations and crew instructions. Disruptive behavior, non-compliance with safety protocols, or violation of the law may result in penalties or removal from the flight.
        </span><br />

        <span>
        <h5 className='text-primary'>7. Liability
        </h5>
        Dhru Airways' liability for any damages or losses is limited to the maximum extent permitted by law. In the event of baggage loss, delay, or damage, compensation will be provided in accordance with international aviation rules.
         </span><br />

         <span>
        <h5 className='text-primary'>8. Amendments to Terms
        </h5>
        Dhru Airways reserves the right to amend these terms at any time. Continued use of our services after changes are made constitutes acceptance of the updated terms.

</span><br />

<span>!Note this all for just educational purpose dhru airways is a project based airways model not original</span>
     
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default Terms
