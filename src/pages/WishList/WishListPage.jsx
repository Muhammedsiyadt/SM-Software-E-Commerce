// 06-05-2023 Athul Vinod




import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/WishList/Banner'
import WishList from '../../components/WishList/WishList'
import ProtectedLayout from '../../layouts/ProtectedRoute';

function WishListPage() {
  return (
    <ProtectedLayout>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - WishList</title>
      </Helmet>
      <Banner />

      <div className="mt-5">
      <WishList />
      </div>
      
    </ProtectedLayout>
  )
}

export default WishListPage