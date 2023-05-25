import React, { useEffect } from 'react'
import Navbar from '../components/Navigation/Navbar'
import Footer from '../components/Footer/Footer'
import { useLocation } from 'wouter';

function StaticRoute({ children }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
 }, [location])



  return (
    <React.Fragment>
      <Navbar />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default StaticRoute