import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import { getTourFromLocalStorage } from '../utils/localStorage'

const EditTour = () => {
    const t = getTourFromLocalStorage();
    const id = t._id;
   const [tour, setTour] = useState({
        title: t.title,
        city: t.city,
        address: t.address,
        distance: t.distance,
        photo: t.photo,
        desc: t.desc,
        price:t.price,
        maxGroupSize: t.maxGroupSize,
        featured: t.featured

   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setTour(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const uploadImage = (e) => {
      e.preventDefault();

      const data = new FormData();
      data.append("file",e.target.files[0]);
      data.append("upload_preset","workout-videos");
      data.append("cloud_name","cnq");
      fetch("https://api.cloudinary.com/v1_1/wellness-tracking-system/image/upload",{
          method:"post",
          body:data
      })
      .then(res=>res.json())
      .then(data=>{
          if(data.url)
          {
          setTour({...tour, photo: data.url})


          }
          
         console.log(data);
      })
      .catch(err=>{
          console.log(err)
      })
  }
   const handleClick = async e => {
      e.preventDefault()

      try {
         const res = await fetch(`${BASE_URL}/tours/${id}`, {
            method:'put',
            headers: {
               'content-type':'application/json'
            },
            
            body: JSON.stringify(tour)
         })
         const result = await res.json()

         if(!res.ok) alert(result.message)
         else alert("Updated Successfully")
         
      } catch(err) {
         console.log(err)
         alert(err.message)
      }
   }

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Upload Tour</h2>

                        <Form onSubmit={handleClick} encType='multipart/form-data'>
                           <FormGroup>
                              <input type="text" value={tour.title} placeholder='Title' id='title' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="text" value={tour.city} placeholder='City' id='city' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="text" value={tour.address} placeholder='Address' id='address' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="number" value={tour.distance} placeholder='Distance' id='distance' onChange={handleChange} required />
                           </FormGroup>
                           
                           <FormGroup>
                              <input type="file" placeholder='Photo' id='photo' onChange={uploadImage} required />
                           </FormGroup>
                           <FormGroup>
                              <textarea type="text" value={tour.desc} placeholder='Description' id='desc' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="number" value={tour.price} placeholder='Price' id='price' onChange={handleChange} required />
                           </FormGroup>

                           <FormGroup>
                              <input type="number" value={tour.maxGroupSize} placeholder='Max Group Size' id='maxGroupSize' onChange={handleChange} required />
                           </FormGroup>

                           <FormGroup>
                              <select id="featured" value={tour.featured} onChange={handleChange} required>
                              <option value="">Select Featured</option>
                              <option value="true">True</option>
                              <option value="false">False</option>
                              </select>
                           </FormGroup>

                           <Button className='btn secondary__btn auth__btn' type='submit'>Submit</Button>
                        </Form>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default EditTour;
