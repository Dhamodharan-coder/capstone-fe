import React, { useState } from 'react'
import logo from "../assets/flight-logo.png"
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Eye icons



function Login() {
  const BASEURL = "http://localhost:3000";
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:(values)=>{
      const errors = {};
     
      if (!values.email) {
        errors.email = '! E-mail Required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = '! Invalid email address';
      }
      
      // Password validation
      if (!values.password) {
        errors.password = 'Required';
      } 
      return errors;
    },
    onSubmit:async (values)=>{
 try {
  const response = await axios.post(`${BASEURL}/login`,values);

  const token = response.data.token;
  localStorage.setItem('token', token);

  toast.success("SuccessFully Logged In");
navigate("/");
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
        <div class="left-section">
          </div>
        <div class="right-section">
            <div class="login-form">
                <h2>Welcome back</h2>
                <p>New here? <Link to={"/sign-up"} class="signup-link">Create an account</Link></p>

                <form onSubmit={formik.handleSubmit}>
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

                    <div class="extra-options">
                       
                        <Link to={"/forgot_password"} class="forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit" class="login-btn">Login</button>
                </form>
                
                <p className='text-center'>or </p>



<Link to={"/sign-up"} type="button" class="signup-btn">Sign Up</Link>
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

export default Login
