import React from 'react'
import './activities.css'

const ActivityCard = ({ item }) => {
   const { imgUrl, title, desc } = item

   const alertNow = (e) => {
       alert('Booked Successfully');
   }

   return (
      <div className='service__item'>
         <div className="serviceimg">
            <img src={imgUrl} alt="" />
         </div>
         <h6>{title}</h6>
         <p>{desc}</p>
         <button onClick={(e)=>alertNow(e)} className='booking__btn'>Book</button>
      </div>
   )
}

export default ActivityCard