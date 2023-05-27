// 29-04-2023 Athul Vinod
// Components
import Navbar from '../components/Navigation/Navbar';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader'
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter'
import { Fade } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { userAction } from '../app/auth/userAction';


function ProtectedRoute({ children }) {
   const dispatch = useDispatch();
   const { loading, error, success, message } = useSelector(state => state.user)
   const [location, setLocation] = useLocation();
   const updateState = useSelector(state => state.updateProfile)

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [location])

   useEffect(() => {
     const checkToken = async () => {
      if (localStorage.getItem('token') == undefined || localStorage.getItem('token') === null) {
         setLocation('/login');
      }
      else {
         dispatch(userAction({ token: JSON.parse(localStorage.getItem('token')) }))


         if (loading == false) {
            if (success == true) {
               return;
            }
            else {
               if(success == false){
                  window.location.href = "/login";
               }
               window.location.href = "/login";
            }
         }


      }
     }
     checkToken()
   }, [dispatch , success , updateState.loading])


   return (
      <React.Fragment>
         <Navbar />
         <Fade in>
            <>{loading ? <Loader /> : <>
               {children}
            </>}</>
         </Fade>
         <Footer />
      </React.Fragment>
   )
}

export default ProtectedRoute