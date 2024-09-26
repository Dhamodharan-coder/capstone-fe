import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Aboutus() {
  return (
    <div className='container'>
      <Navbar />
      <div className='my-4'>
        <h1 className='text-center'>About Dhru Airways</h1>
        <span>
        Welcome to Dhru Airways, where your journey begins with comfort, convenience, and reliability. As one of the emerging leaders in the airline industry, Dhru Airways is committed to providing passengers with world-class service, affordable fares, and unforgettable travel experiences.
        </span><br /><span>
We operate both domestic and international flights, connecting you to popular destinations around the globe. Whether you're traveling for business or leisure, our fleet of modern aircraft ensures that your journey is as comfortable as your destination is exciting. Our professional staff is dedicated to delivering exceptional customer service from the moment you book your ticket to the time you land at your destination.
</span><br />
<span>
At Dhru Airways, safety is our highest priority, and we adhere to international aviation safety standards to ensure that your journey is smooth and secure. We aim to make every flight a memorable one by offering a range of in-flight services, including entertainment, meals, and seating options tailored to your needs. Experience the world with Dhru Airways—where your satisfaction takes flight.
        </span>
        <br />
        <span>!Note this all for just educational purpose dhru airways is a project based airways model not original</span>
      </div>
      <Footer />
    </div>
    
  )
}

export default Aboutus
