import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Feedback = () => {
   const [feedback, setFeedback] = useState({
        description: undefined,
        suggestion: undefined

   })

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      setFeedback(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

  
   const handleClick = async e => {
      e.preventDefault()

      try {
         const res = await fetch(`${BASE_URL}/feedback/`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(feedback)
         })
         const result = await res.json()

         if(!res.ok) alert(result.message)
         else alert("Submitted Successfully")
         
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

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Provide Feedback</h2>

                        <Form onSubmit={handleClick} encType='multipart/form-data'>
                           <FormGroup>
                              <input type="text" placeholder='Description' id='description' onChange={handleChange} required />
                           </FormGroup>
                           

                           <FormGroup>
                              <input type="text" placeholder='Suggestion' id='suggestion' onChange={handleChange} required />
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

export default Feedback;