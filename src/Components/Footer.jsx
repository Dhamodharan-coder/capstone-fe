import React from 'react'
import logo from "../assets/flight-logo.png"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Footer() {


  

  const onSubmit = async (event) => {
    event.preventDefault();
   
    const formData = new FormData(event.target);

    formData.append("access_key", "0fb6c1be-22dc-4230-bcf5-87fd185e945a");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "You Are Subscribed!",
        text: "You will get Out Latests",
        icon: "success",
        cancelButtonColor: "#c82333",
    confirmButtonColor: "#1a73e8",
    iconColor: '#1a73e8'
      });
      event.target.reset();
    } else {
      console.log("Error", data);
  
    }
  };


  return (
    <div>
     
        <div className="contact" id='contact'>
        <div className="row">
            <div className="col col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="card mb-3 mx-auto" style={{width:"18rem"}}>
  <div class="card-body text-center">
    <img src='https://img.icons8.com/glyph-neue/64/headphones.png' className='m-2'/>
    <h5 class="card-title">Call us</h5>
    <p class="card-text">Feel Free to Clarify douts and Queries to our representetive Through Call</p>
    <a href="#" class="btn">8248438383</a>
  </div>
</div>
</div>
<div className='col-lg-3 col-md-6 col-sm-6 col-xs-12'>
<div class="card mb-3 mx-auto" style={{width:"18rem"}}>
  <div class="card-body text-center">
    <img src='https://img.icons8.com/material-outlined/64/new-post.png' className='m-2'/>
    <h5 class="card-title">E-mail</h5>
    <p class="card-text">Feel Free to Clarify douts and Queries to our representetive Through E-mail</p>
    <a href="mailto:dhruairways@gmail.com" class="btn">dhruairways@gmail.com</a>
  </div>
</div>
</div>
<div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
    <div className="car"></div>
</div>
</div>
<div className="contact-mail">
    <div className='mx-auto m-2'>
        <img src='https://img.icons8.com/material-outlined/24/new-post.png' />
    </div>
   <div className='mx-auto m-2'>
   <span>Get the latest news and offers</span>
   <h1><span className='text-primary'>Subscribe</span> to our newsletter</h1>
   </div>
   <form onSubmit={onSubmit}>
   <div className="input mx-auto m-2">
   <input type='email' placeholder='Enter Your Mail Address' name='email' required />
   <button type="submit">Subscribe</button>
   </div>
   </form>
</div>
        </div>

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

export default Footer
