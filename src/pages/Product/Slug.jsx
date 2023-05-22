// 05-05-2023 Athul Vinod


import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import Banner from '../../components/Product/Banner';
import Details from '../../components/Product/Details';
import DefaultLayout from '../../layouts/DefaultRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProduct } from '../../app/Product/productAction';
import Loader from '../../components/Loader/Loader';
import { Alert, AlertIcon } from '@chakra-ui/react';

function Slug({ id }) {
  const dispatch = useDispatch();
  const { loading, error, product, message , empty } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchSingleProduct({ slug: id }));
  }, [id])

  return (
    <DefaultLayout>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - {`${product?.meta_title ? product?.meta_title : null }`} </title>
        <meta name="keywords" content={product?.meta_keyword} />
        <meta name="description" content={product?.meta_description} />
      </Helmet>
      <>
        {loading ? <Loader /> : <>
          {error ? <Alert variant={"left-accent"} status='error'>
            <AlertIcon />
            {message}
          </Alert> : <>
            {!empty && <Banner name={product?.name} />}
            <Details loading={loading} error={error} product={product} message={message} empty={empty} />
          </>}
        </>}
      </>
    </DefaultLayout>
  )
}

export default Slug