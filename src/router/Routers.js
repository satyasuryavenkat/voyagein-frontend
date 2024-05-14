import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import Admin from '../pages/Admin'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import EditTour from '../pages/EditTour'
import Feedback from '../pages/Feedback'
import Maps from '../pages/Maps'
import ActivityList from '../activities/ActivityList'

const Routers = () => {
   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/admin' element={<Admin/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/maps' element={<Maps/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/feedback' element={<Feedback/>} />
         <Route path='/activities' element={<ActivityList/>} />
         <Route path='/gallery' element={<MasonryImagesGallery/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/edit-tour' element={<EditTour/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
      </Routes>
   )
}

export default Routers