import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

function Policy() {
  return (
    <div>
        <div className='container'>
      <Navbar />
      <div className='my-4'>
        <h1 className='text-center'>Policy</h1>
        <span> <h6 className='text-primary my-2'>
        1. Introduction</h6>
        At Dhru Airways, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our services, book a flight, or visit our website.
        </span><br />
        <span>
        <h6 className='text-primary my-2'>
        2. Information We Collect</h6>
        Personal Data: When you book a flight or create an account with us, we collect personal information such as your name, contact details, date of birth, payment information, and passport details (for international flights).
Technical Data: We also collect information about your device, IP address, browser type, and activity on our website to enhance your user experience.
Cookies: Our website uses cookies to track user behavior, personalize your browsing experience, and improve our services.
</span><br />
<span>!Note this all for just educational purpose dhru airways is a project based airways model not original</span>
      </div>
      <Footer />
    </div>
    
    </div>
  )
}

export default Policy
