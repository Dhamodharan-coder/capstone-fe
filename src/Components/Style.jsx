import React from 'react'
import style_one from "../assets/style-1.png"
import style_two from "../assets/style-2.png"
import style_three from "../assets/style-3.png"
import { Link } from 'react-router-dom'

function Style() {




  
  return (
    <div>
    <div className='book-style' id='reservation'>
    <div className="row">
   <div className="col col-lg-4">
   <div className='content'>
     <img src={style_one}  className='img-fluid'/>
      <h4>Search choice</h4>
      <span>Total 630+ destinations that we work with</span>
     </div>
   </div>
   <div className="col-lg-4">
 <div className='content'>
     <img src={style_two}  className='img-fluid'/>
      <h4>Select Destination</h4>
      <span>Insipidity the sufficient discretion imprudence</span>
     </div>
</div>
<div className="col-lg-4">
     <div className='content'>
     <img src={style_three} className='img-fluid'/>
      <h4>Easy To Book</h4>
      <span>With an easy and fast ticket purchase process</span>
     </div>
     </div>
    </div>
    </div>



     <div  className='book-now bg-primary'>
        <div>
        <div className='d-flex align-items-center flex-wrap'><h1>It's Time to Discover</h1><img src='https://img.icons8.com/ios-filled/50/0275d8/airport.png' className='mx-4' /></div>
        <span>Click the Button to Make Your Reservation Here</span>
        </div>
        <div className='my-auto'>
            <Link to={"/reservation"} className='btn btn-dark p-3'>Reservation</Link>
        </div>
     </div>

    </div>
  )
}

export default Style
