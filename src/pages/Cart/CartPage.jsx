// 06-05-2023 Athul Vinod



import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Cart/Banner'
import CartItems from '../../components/Cart/CartItems'
import DefaultLayout from '../../layouts/DefaultRoute';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import OfflineCartItems from '../../components/Cart/OfflineList';

function CartPage() {

  const { loading, success, user } = useSelector(state => state.user)

  return (
    <DefaultLayout>

      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Cart</title>
      </Helmet>
      <Banner />
      <div className="mt-5">
        {loading ? <Loader /> : <>
        {success ? <CartItems /> : <OfflineCartItems /> }
        </>}
      </div>

    </DefaultLayout>
  )
}

export default CartPage