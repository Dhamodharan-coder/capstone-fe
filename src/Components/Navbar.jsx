import React, { useEffect, useState,useContext, useRef } from 'react'
import logo from "../assets/flight-logo.png"
import { Link } from 'react-router-dom'
import { FlightContext } from './FlightContext';
import { HashLink } from 'react-router-hash-link';
function Navbar() {
const [logorevel,setlogoreveal] = useState(false);

const {loginacc,setloginacc, profileimg} = useContext(FlightContext);
const inputref = useRef(null);
const token = localStorage.getItem('token');

useEffect(()=>{
  if(token){
    setloginacc(true);
  }else{
    setloginacc(false);
  }
  
},[token])

function handlelogo(){
  if(logorevel){
    setlogoreveal(false);
  }else{
    setlogoreveal(true)
  }
}
  return (
    <div>
      
     {
      loginacc ?(

        <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><img src={logo} alt='logo'/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse  mx-5" id="navbarSupportedContent">
          <div className='nav-heading'>
            <span><span className='text-primary'>Dhru </span>Airways Booking</span>
           </div>
            <div className='ms-auto  mx-4'>
            <ul class="navbar-nav mx-auto">
              <li class="m-2 ">
              <HashLink smooth to="/#destinations">Popular Destinations</HashLink>
              </li>
              <li class="m-2 ">
              <Link to="/flight-status">Flight Status</Link>
              </li>
              <li class="m-2">
              <HashLink smooth to="/#contact">Contact</HashLink>
              </li>
              <li class="m-2">
              <Link to={"/reservation"}>Reservation</Link>
              </li>
            </ul>
      
          </div>
         <div>
         
         <Link to={"/bookings"} className='btn btn-primary'>Book Tickets</Link>
         </div>
            </div>
            
            {/* <div className='notification-icon'>
            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiPgo8cGF0aCBkPSJNMTIuODEgNDYuMzFjLjI0LjA2LjQ5LjA5LjczLjA5IDEuMzQgMCAyLjU3LS45MSAyLjkxLTIuMjcgMi43OC0xMS4xMiA5LjQtMjAuOTcgMTguNjMtMjcuNzEgMS4zNC0uOTggMS42My0yLjg1LjY1LTQuMTktLjk4LTEuMzQtMi44NS0xLjYzLTQuMTktLjY1LTEwLjM2IDcuNTctMTcuNzkgMTguNjEtMjAuOTEgMzEuMUMxMC4yMiA0NC4yOCAxMS4yIDQ1LjkxIDEyLjgxIDQ2LjMxek05Mi45MyAxNi40MmM5LjIzIDYuNzQgMTUuODQgMTYuNTggMTguNjMgMjcuNzEuMzQgMS4zNiAxLjU2IDIuMjcgMi45MSAyLjI3LjI0IDAgLjQ5LS4wMy43My0uMDkgMS42MS0uNCAyLjU4LTIuMDMgMi4xOC0zLjY0LTMuMTItMTIuNDgtMTAuNTUtMjMuNTMtMjAuOTEtMzEuMS0xLjM0LS45OC0zLjIxLS42OS00LjE5LjY1QzkxLjMgMTMuNTcgOTEuNTkgMTUuNDQgOTIuOTMgMTYuNDJ6TTE5LjIgOTAuODVjLS45OCAzLjkxLS4xMiA3Ljk4IDIuMzcgMTEuMTUgMi40OCAzLjE4IDYuMjIgNSAxMC4yNSA1aDE0LjQ2YzEuNDMgOC41IDguODMgMTUgMTcuNzMgMTVzMTYuMjktNi41IDE3LjczLTE1aDE0LjQ2YzQuMDMgMCA3Ljc3LTEuODIgMTAuMjUtNSAyLjQ4LTMuMTggMy4zNC03LjI0IDIuMzctMTEuMTVMOTcuOTcgNDcuNTNDOTQuMDcgMzEuOTEgODAuMSAyMSA2NCAyMVMzMy45MyAzMS45MSAzMC4wMyA0Ny41M0wxOS4yIDkwLjg1ek02NCAxMTZjLTUuNTggMC0xMC4yNy0zLjgzLTExLjYxLTloMjMuMjFDNzQuMjcgMTEyLjE3IDY5LjU4IDExNiA2NCAxMTZ6TTY0IDI3YzEzLjM0IDAgMjQuOTIgOS4wNCAyOC4xNSAyMS45OGwxMC44MyA0My4zMmMuNTMgMi4xMS4wNiA0LjI5LTEuMjcgNi4wMS0xLjM0IDEuNzEtMy4zNSAyLjY5LTUuNTIgMi42OUgzMS44MWMtMi4xNyAwLTQuMTgtLjk4LTUuNTItMi42OS0xLjM0LTEuNzEtMS44LTMuOS0xLjI3LTYuMDFsMTAuODMtNDMuMzJDMzkuMDggMzYuMDQgNTAuNjYgMjcgNjQgMjd6Ij48L3BhdGg+Cjwvc3ZnPg==" />
            </div> */}
          <div className="profile-logo" onClick={handlelogo}>
              <img src={profileimg ? profileimg : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'} alt="profile" ref={inputref} style={{ width: "50px" }}  />
          </div>
      
          {logorevel?(<div className="profile-logo-box">
            {loginacc?(<div>
              <img src='https://img.icons8.com/fluency/48/gender-neutral-user.png' />
          <Link to={"/user"} className='a'>My Profile</Link>
          
          </div>):(<div>
             <div> <img src='https://img.icons8.com/fluency/48/login-rounded-right.png' />
             <Link to={"/login"} className='a'>Login / Sign-up</Link></div>
          <div> 
          <img src='https://img.icons8.com/3d-fluency/94/administrator-male--v3.png' />
            <Link to={"/admin"} className='a'>Admin</Link></div>
            </div>)}
          </div>):("")}
        </div>
      </nav>
      ):(
        <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><img src={logo} alt='logo'/></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse  mx-4" id="navbarSupportedContent">
          <div className='nav-heading'>
            <span><span className='text-primary'>Dhru </span>Airways Booking</span>
           </div>
            <div className='ms-auto  mx-4 '>
            <ul class="navbar-nav">
              <li class="m-2">
              <HashLink smooth to="/#destinations">Popular Destinations</HashLink>
              </li>
              <li class="m-2">
              <HashLink smooth to="/#contact">Contact</HashLink>
              </li>
              <li class="m-2">
                <Link to={"/reservation"}>Reservation</Link>
              </li>
            </ul>
      
          </div>
          <Link to={"/bookings"} className='btn btn-primary'>Book Tickets</Link>
            </div>
            
            {/* <div className='notification-icon'>
            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiPgo8cGF0aCBkPSJNMTIuODEgNDYuMzFjLjI0LjA2LjQ5LjA5LjczLjA5IDEuMzQgMCAyLjU3LS45MSAyLjkxLTIuMjcgMi43OC0xMS4xMiA5LjQtMjAuOTcgMTguNjMtMjcuNzEgMS4zNC0uOTggMS42My0yLjg1LjY1LTQuMTktLjk4LTEuMzQtMi44NS0xLjYzLTQuMTktLjY1LTEwLjM2IDcuNTctMTcuNzkgMTguNjEtMjAuOTEgMzEuMUMxMC4yMiA0NC4yOCAxMS4yIDQ1LjkxIDEyLjgxIDQ2LjMxek05Mi45MyAxNi40MmM5LjIzIDYuNzQgMTUuODQgMTYuNTggMTguNjMgMjcuNzEuMzQgMS4zNiAxLjU2IDIuMjcgMi45MSAyLjI3LjI0IDAgLjQ5LS4wMy43My0uMDkgMS42MS0uNCAyLjU4LTIuMDMgMi4xOC0zLjY0LTMuMTItMTIuNDgtMTAuNTUtMjMuNTMtMjAuOTEtMzEuMS0xLjM0LS45OC0zLjIxLS42OS00LjE5LjY1QzkxLjMgMTMuNTcgOTEuNTkgMTUuNDQgOTIuOTMgMTYuNDJ6TTE5LjIgOTAuODVjLS45OCAzLjkxLS4xMiA3Ljk4IDIuMzcgMTEuMTUgMi40OCAzLjE4IDYuMjIgNSAxMC4yNSA1aDE0LjQ2YzEuNDMgOC41IDguODMgMTUgMTcuNzMgMTVzMTYuMjktNi41IDE3LjczLTE1aDE0LjQ2YzQuMDMgMCA3Ljc3LTEuODIgMTAuMjUtNSAyLjQ4LTMuMTggMy4zNC03LjI0IDIuMzctMTEuMTVMOTcuOTcgNDcuNTNDOTQuMDcgMzEuOTEgODAuMSAyMSA2NCAyMVMzMy45MyAzMS45MSAzMC4wMyA0Ny41M0wxOS4yIDkwLjg1ek02NCAxMTZjLTUuNTggMC0xMC4yNy0zLjgzLTExLjYxLTloMjMuMjFDNzQuMjcgMTEyLjE3IDY5LjU4IDExNiA2NCAxMTZ6TTY0IDI3YzEzLjM0IDAgMjQuOTIgOS4wNCAyOC4xNSAyMS45OGwxMC44MyA0My4zMmMuNTMgMi4xMS4wNiA0LjI5LTEuMjcgNi4wMS0xLjM0IDEuNzEtMy4zNSAyLjY5LTUuNTIgMi42OUgzMS44MWMtMi4xNyAwLTQuMTgtLjk4LTUuNTItMi42OS0xLjM0LTEuNzEtMS44LTMuOS0xLjI3LTYuMDFsMTAuODMtNDMuMzJDMzkuMDggMzYuMDQgNTAuNjYgMjcgNjQgMjd6Ij48L3BhdGg+Cjwvc3ZnPg==" />
            </div> */}
          <div className="profile-logo" onClick={handlelogo}>
              <img src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1726223111~exp=1726226711~hmac=ccfe8d9c2cad2bb4ad66cfbf0f19c8d0cafa99a32dbc41fc01007a02663ef027&w=740' alt="profile" ref={inputref} style={{ width: "50px" }}  />
          </div>
      
          {logorevel?(<div className="profile-logo-box">
            {loginacc?(<div>
              <img src='https://img.icons8.com/fluency/48/gender-neutral-user.png' />
          <Link to={"/user"} className='a'>My Profile</Link></div>):(<div>
             <div> <img src='https://img.icons8.com/fluency/48/login-rounded-right.png' />
             <Link to={"/login"} className='a'>Login / Sign-up</Link></div>
          <div> 
          <img src='https://img.icons8.com/3d-fluency/94/administrator-male--v3.png' />
            <Link to={"/admin"} className='a'>Admin</Link></div>
            </div>)}
          </div>):("")}
        </div>
      </nav>
      )
     }

    </div>
  )
}

export default Navbar
