// 08-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/About/Banner'
import AboutContent from '../../components/About/AboutContent'
import AboutTimeLine from '../../components/About/TimeLine';
import DefaultLayout from '../../layouts/DefaultRoute';
import { Divider } from '@chakra-ui/react';


function AboutPage() {
  return (
    <DefaultLayout>
      <div>
        <Helmet>
            <title>{process.env.REACT_APP_PRODUCT_NAME} - About</title>
        </Helmet>

        <Banner />

        <div className='mt-5 mb-5 container'>
            <AboutContent />
            <div className="mt-5 mb-5">
              <h1 className='text-center mb-0'>Our History</h1>
            <AboutTimeLine />
            </div>
        </div>
    </div>
    </DefaultLayout>
  )
}

export default AboutPage