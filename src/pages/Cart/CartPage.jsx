// 06-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Cart/Banner'
import CartItems from '../../components/Cart/CartItems'
import ProtectedLayout from '../../layouts/ProtectedRoute';

function CartPage() {
  return (
    <ProtectedLayout>

      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Cart</title>
      </Helmet>
      <Banner />
      <div className="mt-5">
        <CartItems />
      </div>

    </ProtectedLayout>
  )
}

export default CartPage