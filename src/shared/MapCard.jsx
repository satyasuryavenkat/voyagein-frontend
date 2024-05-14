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

const MapCard = ({ mapInfo }) => {


   const {address_line1, city,categories, distance, address_line2 } = mapInfo;
   const user = getUserFromLocalStorage();

   return (
      <div className='tour__card'>
         <Card>
            <div className="tour__img">
               {/* <img src={photo} alt="tour-img" /> */}
               
            </div>

            <CardBody>
               <div className="card__top d-flex align-items-center justify-content-between">
                  <span className="tour__location d-flex align-items-center gap-1">
                     <i class='ri-map-pin-line'></i> {address_line1}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1">
                     {distance} meters

                  </span>
               </div>
             

               <h5 className='tour__title'>{address_line2}</h5>
               <h2>{city}</h2>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5>Category: {categories[0]}</h5>

            
                 

               </div>
            
            
            </CardBody>
         </Card>
      </div>
   )
}

export default MapCard