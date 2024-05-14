import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import calculateAvgRating from '../utils/avgRating'
import { addTourToLocalStorage, getUserFromLocalStorage } from '../utils/localStorage'
import { BASE_URL } from '../utils/config'
import { useState } from 'react'
import { useEffect } from 'react'
import Axios from 'axios';

const TourCard = ({ tour }) => {

   const { _id, title, city,location, photo, price, featured, reviews } = tour

   const id = _id;

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   const navigate = useNavigate();

   const handleClick = () => {
      addTourToLocalStorage(tour);
      navigate('edit-tour');
   }

      const handleDelete = async e => {
         e.preventDefault()
   
         try {
            const res = await fetch(`${BASE_URL}/tours/${id}`, {
               method:'delete',
               headers: {
                  'content-type':'application/json'
               },
               credentials: 'include'
            })
            const result = await res.json()
   
            if(!res.ok) alert(result.message)
            else alert("Deleted Successfully")
            navigate('/tours');
         } catch(err) {
            console.log(err)
            alert(err.message)
         }
      }
      
      const [info, setInfo] = useState([]);
    const input = price;
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);
 
    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);
 
    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])
 
    // Function to convert the currency
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }
 
    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    const googleMap = () => {
      window.open(location, "_blank")
    }

   

   const user = getUserFromLocalStorage();
   const isAdmin = (user && user.role === 'admin') ? true : false;

   return (
      <div className='tour__card'>
         <Card>
            <div className="tour__img">
               <img src={photo} alt="tour-img" />
               {featured && <span>Featured</span>}
            </div>

            <CardBody>
               <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                     <i class='ri-map-pin-line'></i> {city}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1">
                     <i class='ri-star-fill'></i> {avgRating === 0 ? null : avgRating}
                     {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}

                  </span>
               </div>

               <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>
               <button className=' booking__btn' onClick={googleMap}>Location</button>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>Rs {price} <span> /per person</span></h5>

            
                  {isAdmin ?
                  
                     <button onClick={handleClick} className=' booking__btn'>Edit</button>
                  : ''}
                  &nbsp;

                  {isAdmin ?
                  
                  <button onClick={handleDelete} className=' booking__btn'>Delete</button>
               : ''}&nbsp;
                  <Link to={`/tours/${_id}`}>
                     <button className=' booking__btn'>Book Now</button>
                  </Link>

               </div>
            
            
            </CardBody>
         </Card>
      </div>
   )
}

export default TourCard