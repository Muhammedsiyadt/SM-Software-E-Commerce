// 08-05-2023 Athul Vinod


import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Terms/Banner'
import TermsList from '../../components/Terms/TermsList'
import DefaultLayout from '../../layouts/DefaultRoute';


function TermsPage() {
  return (
    <DefaultLayout>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Terms Of Use</title>
      </Helmet>
      <Banner />

      <div className='container mt-5 mb-5'>
        <TermsList />
      </div>

    </DefaultLayout>
  )
}

export default TermsPage