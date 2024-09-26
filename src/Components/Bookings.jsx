import React, { useEffect, useState } from 'react'
import logo from "../assets/flight-logo.png"
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'

function Bookings() {

  return (
    <div className='container'>
      <Navbar />
<Searchbar />


      
      <div className='footer'>
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

export default Bookings
