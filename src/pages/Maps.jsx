import React, { useEffect, useState } from "react"
import MapCard from "../shared/MapCard";
import { Col, Container, Row } from 'reactstrap'
import { addLatandLongToLocalStorage, getLatandLongFromLocalStorage } from "../utils/localStorage";
const Maps = () => {

    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [places, setPlaces] = useState([]);
    const getNearByLocations =  (pos)=> {
        // e.preventDefault()
        console.log(pos);
       
        if(pos.latitude == null){
            const posi = getLatandLongFromLocalStorage();
            console.log(posi)
            try {
                fetch(`https://api.geoapify.com/v2/places?categories=healthcare.hospital,catering.restaurant,service.police&filter=circle:${posi.longitude},${posi.latitude},5000&bias=proximity:${posi.longitude},${posi.latitude}&limit=20&apiKey=fa6ddb29e3e9499da799f7acd2c60a53`, {
                   method:'get',
                   headers: {
                      'content-type':'application/json'
                   },
                 
                }).then(response => response.json())
                .then(result => {
                     // console.log(result)
                     setPlaces(result.features)
                 })
                .catch(error => console.log('error', error));
       
             //    if(!res.ok) {setPlaces(result.features)}
             //    else alert("Submitted Successfully")
                
             } catch(err) {
                console.log(err)
                alert(err.message)
             }
        }
        else {
            try{
            fetch(`https://api.geoapify.com/v2/places?categories=healthcare.hospital,catering.restaurant,service.police&filter=circle:${pos.longitude},${pos.latitude},5000&bias=proximity:${pos.longitude},${pos.latitude}&limit=20&apiKey=fa6ddb29e3e9499da799f7acd2c60a53`, {
                   method:'get',
                   headers: {
                      'content-type':'application/json'
                   },
                 
                }).then(response => response.json())
                .then(result => {
                     // console.log(result)
                     setPlaces(result.features)
                 })
                .catch(error => console.log('error', error));
       
             //    if(!res.ok) {setPlaces(result.features)}
             //    else alert("Submitted Successfully")
                
             } catch(err) {
                console.log(err)
                alert(err.message)
             }
        }
        
     }

    

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      
    //   console.log(position);
    if(position.latitude != null)
    addLatandLongToLocalStorage(position);
      getNearByLocations(position);
     
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

    return(
        <section className='pt-0'>
        <Container>
         
           {
              
              <Row>
                 {
                   places?.map(p => (<Col lg='3' md='6' sm='6' className='mb-4'> <MapCard mapInfo={p.properties} /> </Col>))
                 }
                 {/* <Col lg='12'>
                    <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                       {[...Array(pageCount).keys()].map(number => (
                          <span key={number} onClick={() => setPage(number)}
                             className={page === number ? 'active__page' : ''}
                          >
                             {number + 1}
                          </span>
                       ))}
                    </div>
                 </Col> */}
              </Row>
           }
        </Container>
     </section>
    )
}

export default Maps;