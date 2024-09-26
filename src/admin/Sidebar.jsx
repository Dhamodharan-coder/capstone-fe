import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/flight-logo.png"
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Sidebar = () => {
  const BASEURL = "https://dhru-airways.onrender.com";
    const [adminnav,setadminnav] = useState("dashboard");
    const [adminuserdetails,setadminuserdetails] = useState([]);
    const [getbookings,setgetbookings]=useState([]);
    const [getreservation,setgetreservation]=useState([]);
    const [deletedbookings,setdeletedbookings]=useState([]);
const navigate = useNavigate();
const totalPrice = getbookings.map((booking) => {
  return booking.passengers.reduce((totals, passenger) => {
    return totals + Number(passenger.totalprice); // Assuming passenger has a `totalprice` field
  },0);
});

const totalPricetwo = deletedbookings.map((booking) => {
  return booking.passengers.reduce((totals, passenger) => {
    return totals + Number(passenger.totalprice); // Assuming passenger has a `totalprice` field
  },0);
});
const total = totalPrice.reduce((acc,curr)=>{return acc+curr},0)
const totaltwo = totalPricetwo.reduce((acc,curr)=>{return acc+curr},0)




  



const data = {
  labels: [
    'Sales',
    'Refund',
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [total, totaltwo],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};


const editreservation = async(id)=>{
    const value = prompt("Enter the Status");
    const seatnoval = prompt ("Enter the Seatno");
  
    try {
       const token = localStorage.getItem("token")
        await axios.put(`${BASEURL}/admin/reservation/${id}`,{ status: value  , seatno:seatnoval},{
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        toast.success("updated successfully");
        getreservationdetails();
    } catch (error) {
        console.error("something error",error)
    }
}


const getuserdetails = async ()=>{
   try {
    const token = localStorage.getItem("token");
    if (!token) {
        toast.error("Please Login");
        throw new Error('No token found. Please log in.');
      }
const details = await axios.get(`${BASEURL}/admin/users`,{
    headers: {
        'Authorization': `Bearer ${token}`,
      }})
      setadminuserdetails(details.data);
   } catch (error) {
    console.error("error while fetching data",error)
   }
}

const getreservationdetails = async ()=>{
    try {
     const token = localStorage.getItem("token");
     if (!token) {
         toast.error("Please Login");
         throw new Error('No token found. Please log in.');
       }
 const details = await axios.get(`${BASEURL}/admin/reservation`,{
     headers: {
         'Authorization': `Bearer ${token}`,
       }})
       setgetreservation(details.data);
    } catch (error) {
     console.error("error while fetching data",error)
    }
 }

 const getdeletebookingdetails = async ()=>{
  try {
   const token = localStorage.getItem("token");
   if (!token) {
       toast.error("Please Login");
       throw new Error('No token found. Please log in.');
     }
const details = await axios.get(`${BASEURL}/admin/deleted-bookings`,{
   headers: {
       'Authorization': `Bearer ${token}`,
     }})
     setdeletedbookings(details.data);
     console.log(deletedbookings)
  } catch (error) {
   console.error("error while fetching data",error)
  }
}


const finalbooking = async()=>{
    const token = localStorage.getItem("token");
    if(!token){
        toast.error("Please Login!")
        throw new Error('No token found. Please log in.');
    }
    const booking_response = await axios.get(`${BASEURL}/admin/final_bookings`,{
        headers:{
          "Authorization" :  `Bearer ${token}`,
        }
    });
    setgetbookings(booking_response.data.finalBookings);
    console.log(booking_response.data.finalBookings)
}


const deleteuser = async (id) => {
    if (!id) {
      console.error("User ID is undefined");
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in.');
        return;
      }
  
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete the user",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#c82333",
        confirmButtonColor: "#1a73e8",
        iconColor: '#1a73e8',
        confirmButtonText: "Yes"
      });
  
      if (result.isConfirmed) {
        // Proceed to delete the user if confirmed
        const response = await axios.delete(`${BASEURL}/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  console.log(response)
        // Success message
        await Swal.fire({
          title: "User Deleted",
          text: "The user has been deleted",
          icon: "success",
          confirmButtonColor: "#1a73e8",
          iconColor: '#1a73e8',
        });
  
        toast.success('User deleted successfully');
        getuserdetails(); // Call to refresh the user list
      }
  
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const deletereservation = async (id) => {
    if (!id) {
      console.error("Reservation ID is undefined");
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in.');
        return;
      }
  
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete the Reservation",
        icon: "question",
        showCancelButton: true,
        cancelButtonColor: "#c82333",
        confirmButtonColor: "#1a73e8",
        iconColor: '#1a73e8',
        confirmButtonText: "Yes"
      });
  
      if (result.isConfirmed) {
        // Proceed to delete the user if confirmed
        const response = await axios.delete(`${BASEURL}/admin/reservation/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  console.log(response)
        // Success message
        await Swal.fire({
          title: "Reservation Deleted",
          text: "The Reservation has been deleted",
          icon: "success",
          confirmButtonColor: "#1a73e8",
          iconColor: '#1a73e8',
        });
  
        toast.success('Reservation deleted successfully');
        getreservationdetails(); // Call to refresh the user list
      }
  
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast.error('Failed to delete reservation');
    }
  };
  



    const handleLogout = async () => {

        await Swal.fire({
          title: "Are you sure?",
          text: "You want to Log-Out",
          icon: "question",
          showCancelButton: true,
          cancelButtonColor: "#c82333",
          confirmButtonColor: "#1a73e8",
          iconColor: '#1a73e8',
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Logged Out",
              text: "You Are Successfully Logged Out",
              icon: "success",
              cancelButtonColor: "#c82333",
              confirmButtonColor: "#1a73e8",
              iconColor: '#1a73e8',
            });
    
            localStorage.removeItem('token'); // Clear token on logout
            navigate('/admin');
          }
    
        });
    
    
    
      };



      useEffect(()=>{
getuserdetails();
getreservationdetails();
finalbooking();
getdeletebookingdetails();
      },[])
  return (
   <div  className="container admin my-4">
     <div className="sidebar my-5">
        <div className='text-center'>
        <img src={logo} alt='logo' style={{width:"100px",height:"100px"}}  / >
        <h2>Admin Panel</h2>
        </div>
      <ul>
        <li>
         <a className={adminnav==="dashboard" ?'active':""} onClick={()=>{setadminnav("dashboard")}}>Dashboard</a>
        </li>
        <li>
        <a className={adminnav==="users" ?'active':""} onClick={()=>{setadminnav("users")}}>Users</a>
        </li>
        <li>
        <a className={adminnav==="bookings" ?'active':""} onClick={()=>{setadminnav("bookings")}}>Bookings</a>
        </li>
        <li>
        <a className={adminnav==="settings" ?'active':""} onClick={()=>{setadminnav("settings")}}>Reservations</a>
        </li>
      </ul>
      <span className='btn btn-primary' onClick={handleLogout}>Log Out</span>
    </div>



    <div className='admin-right my-5'>
         
  {
    adminnav === "dashboard" ?(
        <div>
    <div className='admindashboard my-3'>
        <div className='adminheader'>
            <div className='box'>
      <h4>Total Users</h4>
      <h2> {adminuserdetails.length}</h2>
            </div>
          </div>
          <div className='adminheader'>
            <div className='box'>
      <h4>Total Bookings</h4>
      <h2> {getbookings.length}</h2>
            </div>
          </div>
          <div className='adminheader'>
            <div className='box'>
      <h4>Total Sales</h4>
      <h2> $ {total}</h2>
            </div>
          </div>
          <div className='adminheader'>
            <div className='box'>
      <h4>Refund</h4>
      <h2> $ {totaltwo}</h2>
            </div>
          </div>
          </div>
        <div className='chart-container'>
        <Doughnut data={data} options={options}  />
        </div>
          
        </div>):("")
  }

{
    adminnav === "users" ?(<div className='my-3'>
        <h1 className='text-center'>Users</h1>
        <div className='container'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Created On</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        adminuserdetails.map((e,index)=>(
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{e.username}</td>
            <td>{e.email}</td>
            <td>{e.createdAt}</td>
            <td onClick={()=>{deleteuser(e._id)}}><button className='btn btn-danger'>Delete</button></td>
          </tr>
        ))
       
    }
   
  </tbody>
</table>
            </div>
    </div>):("")
}


{
    adminnav === "bookings" ?(<div className='my-3'>
        <h1 className='text-center'>Bookings</h1>
        <div className='container'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Flight Name</th>
      <th scope="col">Flight No.</th>
      <th scope="col">Carrier Code</th>
      <th scope="col">Stops</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">ScheduledTime</th>
      <th scope="col">Name</th>
      <th scope="col">Class</th>
      <th scope="col">Total Price</th>
      <th scope="col">Person</th>
    
    </tr>
  </thead>
  <tbody>
  {
  getbookings && getbookings.length > 0 && getbookings.map((e, index) => (
    <React.Fragment key={index}>
      <tr>
        <th scope="row" rowSpan={e.passengers && e.passengers.length > 0 ? e.passengers.length : 1}>
          {index + 1}
        </th>
        {
          e.passengers && e.passengers.length > 0 ? (
            e.passengers.map((a, i) => (
              <React.Fragment key={i}>
                <td>{a.aircraft}</td>
                <td>{a.flightno[0]}</td>
                <td>{a.carrierCode[0]}</td>
                <td>{a.stops}</td>
                <td>{a.departure}</td>
                <td>{a.arrival}</td>
                <td>{a.scheduleddate}</td>
                <td>{a.name}</td>
                <td>{a.travelClass}</td>
                <td>{a.totalprice}</td>
              </React.Fragment>
            ))
          ) : (
            <td colSpan="3">No passengers found</td>
          )
          
        }
     
        <td>{e.passengers.length}</td>
      </tr>
    </React.Fragment>
  ))
}


   
  </tbody>
</table>
            </div>
    </div>):("")
}

{
    adminnav === "settings" ?(<div className='my-3'>
        <h1 className='text-center'>Reservations</h1>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Depature</th>
      <th scope="col">Arrival</th>
      <th scope="col">Class</th>
      <th scope="col">Passengers</th>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col">Created On</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        getreservation.map((e,index)=>(
            <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{e.departure}</td>
            <td>{e.arrival}</td>
            <td>{e.class}</td>
            <td>{e.passengers}</td>
            <td>{e.date}</td>
            <td>{e.status}</td>
            <td>{e.createdAt}</td>
            <td onClick={()=>{editreservation(e._id)}}><button className='btn btn-warning'>Edit</button></td>
            <td onClick={()=>{deletereservation(e._id)}}><button className='btn btn-danger'>Delete</button></td>
          </tr>
        ))
       
    }
   
  </tbody>
</table>
    </div>):("")
}

  
    </div>

     </div>
  
  );
};

export default Sidebar;
