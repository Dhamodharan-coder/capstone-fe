import React from 'react'
import logo from "../assets/flight-logo.png"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from './Navbar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons


function Signup() {
  const BASEURL = "https://dhru-airways.onrender.com";
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      username:"",
      email:"",
      password:""
    },
    validate:(values)=>{
      const errors = {};
      if (!values.username) {
        errors.username = '! Username Required';
      }
      if (!values.email) {
        errors.email = '! E-mail Required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '! Invalid email address';
      }
      
      // Password validation
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[a-z]/.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      } else if (!/[0-9]/.test(values.password)) {
        errors.password = 'Password must contain at least one digit';
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = 'Password must contain at least one special character';
      }
      return errors;
    },
    onSubmit:async (values)=>{
try {
  await axios.post(`${BASEURL}/register`,values);
  toast.success("Registered Successfully");
navigate("/login");
} catch (error) {
  console.log("Something Went Wrong",error);
  toast.error("Email Already Exist Try Another");
}
    }
  });
  return (
    <div className='container'>
        <Navbar />
        <div class="signup my-5 m-auto">
        <div class="left-section">
         </div>
        <div class="right-section">
            <div class="signup-form">
                <h2>Create your account</h2>
                <p>Already have an account? <Link to={"/login"} class="login-link">Login here</Link></p>

                <form onSubmit={formik.handleSubmit}>
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" placeholder="Enter the Name"
                    name="username"
                    value={formik.values.name}
onChange={formik.handleChange}
                    required />
                    <span> {formik.errors.username ? <div  className='text-danger'>{formik.errors.username}</div> : null}</span>

                    <label for="email">Enter email id</label>
                    <input type="email" id="email" placeholder="Enter the E-Mail" required 
                     name="email"
                     value={formik.values.email}
 onChange={formik.handleChange}
                    />
                     <span> {formik.errors.email ? <div  className='text-danger'>{formik.errors.email}</div> : null}</span>

                    <label for="password">Enter password</label>
                    <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter the Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                />
                <span
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
                     <span> {formik.errors.password ? <div className='text-danger'>{formik.errors.password}</div> : null}</span>

                    <button type="submit" class="signup-btn">Sign Up</button>
                </form>
                

            </div>
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

export default Signup
