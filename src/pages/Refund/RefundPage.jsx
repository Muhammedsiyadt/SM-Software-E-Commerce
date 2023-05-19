// 08-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Refund/Banner'
import RefundList from '../../components/Refund/RefundList'
import DefaultLayout from '../../layouts/DefaultRoute';


function RefundPage() {
  return (
    <DefaultLayout>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Return & Refund Policy</title>
      </Helmet>
      <Banner />
      <div className="container mt-5 mb-5">
        <RefundList />
      </div>
    </DefaultLayout>
  )
}

export default RefundPage