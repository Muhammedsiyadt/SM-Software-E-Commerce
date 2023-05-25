// 08-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Refund/Banner'
import RefundList from '../../components/Refund/RefundList'
import StaticRoute from '../../layouts/StaticRoute';


function RefundPage() {
  return (
    <StaticRoute>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Return & Refund Policy</title>
      </Helmet>
      <Banner />
      <div className="container mt-5 mb-5">
        <RefundList />
      </div>
    </StaticRoute>
  )
}

export default RefundPage