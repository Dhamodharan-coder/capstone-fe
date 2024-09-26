import React from 'react'

function Cards({destinations}) {
  return (
    <div>
   <div className="cards-heading text-center my-5" id='destinations'>
   <h1>Popular Destinations</h1>
   </div>
  <div className="row">
    
    {    
    
        destinations.map((item,index)=>(
          <div className="col col-lg-3 col-md-6 col-sm-12 col-xs-12"  key={index}>
              <div className="cards mb-4 mx-auto">
          <div className="card-body"  >
          <div className='img'> <img src={item.imageUrl1}/></div>
          </div>
            <div className='content'><span>{item.destination}</span><div><span className='mx-1'>{item.rating}</span><img src='https://img.icons8.com/color/48/filled-star--v1.png' className='mb-2'/></div></div>
            <div className='m-2'><span className='span'>{item.additionalInfo}</span></div>
          </div>
           </div>
            ))}
   
  </div>
    </div>
  )
}

export default Cards
