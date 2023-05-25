// 08-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/About/Banner'
import AboutContent from '../../components/About/AboutContent'
import AboutTimeLine from '../../components/About/TimeLine';
import StaticRoute from '../../layouts/StaticRoute';
import { Box } from '@chakra-ui/react';


function AboutPage() {
  return (
    <StaticRoute>
      <div>
        <Helmet>
            <title>{process.env.REACT_APP_PRODUCT_NAME} - About</title>
        </Helmet>

        <Banner />

        <div className='mt-5 mb-5 container'>
            <AboutContent />
            <Box mt="28" mb="24">
              <h1 className='text-center mb-0'>Our History</h1>
            <AboutTimeLine />
            </Box>
        </div>
    </div>
    </StaticRoute>
  )
}

export default AboutPage