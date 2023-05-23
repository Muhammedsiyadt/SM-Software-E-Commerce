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
import { fetchAllReview } from '../../app/review/reviewAction';

function Slug({ id }) {
  const dispatch = useDispatch();
  const { loading, error, product, message, empty } = useSelector((state) => state.product);

  const addState = useSelector(state => state.addReview);

  const reviewState = useSelector(state => state.review);

  useEffect(() => {
    dispatch(fetchSingleProduct({ slug: id }));
  }, [id])

  useEffect(() => {
    if (addState.loading == false) {
      dispatch(fetchAllReview({ id: id }));
    }
  }, [addState.loading]);

  return (
    <DefaultLayout>
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - {`${product?.meta_title ? product?.meta_title : null}`} </title>
        <meta name="keywords" content={product?.meta_keyword} />
        <meta name="description" content={product?.meta_description} />
      </Helmet>
      <>
        {loading ? <Loader /> : <>
          {error ? <div className='container mt-5 mb-5'>
            <Alert variant={"left-accent"} status='error'>
              <AlertIcon />
              {message}
            </Alert>
          </div> : <>
            {!empty && <Banner name={product?.name} id={product?.id} loading={reviewState.loading} success={reviewState.success} reviews={reviewState.reviews} error={reviewState.error} />}
            <Details loading={loading} error={error} product={product} message={message} empty={empty} reviewState={reviewState} />
          </>}
        </>}
      </>
    </DefaultLayout>
  )
}

export default Slug