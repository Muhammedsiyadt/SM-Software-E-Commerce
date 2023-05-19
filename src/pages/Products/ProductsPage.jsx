import React from 'react'
import Banner from '../../components/Products/Banner'
import { Helmet } from 'react-helmet'
import ProductList from '../../components/Products/ProductList'
import DefaultLayout from '../../layouts/DefaultRoute';

function ProductsPage() {
  return (
    <DefaultLayout>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Products</title>
      </Helmet>
      <Banner />
       <ProductList />
    </DefaultLayout>
  )
}

export default ProductsPage