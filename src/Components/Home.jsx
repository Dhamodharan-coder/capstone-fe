import React from 'react'
import Searchbar from './Searchbar'
import Style from './Style'
import Cards from './Cards'
import Footer from './Footer'
import Navbar from './Navbar'
import { useContext } from 'react'
import { FlightContext } from './FlightContext';

function Home({destinations}) {
  const {userdetails,loginacc} = useContext(FlightContext);
  
  return (
    <div className='container'>
       <Navbar />
     {loginacc ?  <h3 className='text-center'><p>Hello</p> {userdetails.username}!</h3> : ""}

      <Searchbar />
      <Cards destinations={destinations} />
      <Style />
      <Footer />
    </div>
  )
}

export default Home
