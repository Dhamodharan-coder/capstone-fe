import React, { useState } from 'react'
import logo from "../assets/flight-logo.png"
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar'

function AdminLogin() {
 const BASEURL = "http://localhost:3000";
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    onSubmit:async (values)=>{
 try {
  const response = await axios.post(`${BASEURL}/admin/login`,values);

  const token = response.data.token;
  localStorage.setItem('token', token);

  toast.success("SuccessFully Logged In");
navigate("/admin-dashboard");
 } catch (error) {
  toast.error("Incorrect Username or Password")
  console.log("Something Went Wrong",error);
 }
    }
  });

  return (
    <div className='container'>
        <Navbar />
        <div class="login m-auto my-5">
        <div class="admin-left-section">
          </div>
        <div class="right-section">
            <div class="login-form">
             <h4 className='text-center'><span className='text-primary'>Admin</span> Login</h4>

                <form onSubmit={formik.handleSubmit}>
                    <label for="email">Enter email id</label>
                    <input type="email" id="email" placeholder="Enter the E-Mail" required
                     name="email"
                     value={formik.values.email}
 onChange={formik.handleChange}
                    />

                    <label for="password">Enter password</label>
                    <input type="password" id="password" placeholder="Enter the Password" required 
                     name="password"
                     value={formik.values.password}
 onChange={formik.handleChange}
                    />

                    <div class="extra-options">
                       
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </div>

                    <button type="submit" class="login-btn">Login</button>
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

export default AdminLogin
