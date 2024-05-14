import React from 'react'
import { Col } from 'reactstrap'
import { Container, Row } from 'reactstrap'
import motobiking from '../assets/images/mount-biking.jpeg'
import guideImg from '../assets/images/riverrafting.png'
import customizationImg from '../assets/images/motor-biking.jpeg'
import ActivityCard from './ActivityCard'

const activities = [
   {
      imgUrl: motobiking,
      title: `Mountain Biking`,
      desc: `An adventourous Mountain Biking`,
   },
   {
      imgUrl: guideImg,
      title: `River Rafting`,
      desc: `Happily surf through the river `,
   },
   {
      imgUrl: customizationImg,
      title: 'Motor Biking',
      desc: `Experience Motor Biking like never before`,
   },
]

const ActivityList = () => {
   return <>
      <section>
         <Container>
            <Row>
               <Col lg='3'>
                  <h5 className="services__subtitle">Our Activities</h5>
                  <h2 className="services__title">You can participate in these Activities</h2>
               </Col>
               {
         
                  activities.map((item, index) => (
                     <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
                        <ActivityCard item={item} />
                     </Col>))
               }
            </Row>
         </Container>
      </section>
      
   </>

}

export default ActivityList