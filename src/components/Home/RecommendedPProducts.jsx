// 03-05-2023 Athul Vinod

import React, { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";

import './style.css';


import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";


import { Navigation } from 'swiper';
import ProductCard from '../Product/ProductCard';
import { Link } from 'wouter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecommendProductsHome } from '../../app/recommentProducts/recommentProductsAction';
import { Loader } from 'react-bootstrap-typeahead';
import { Alert, AlertIcon } from '@chakra-ui/react';

function RecommendedPProducts() {


  const dispatch = useDispatch();
  const { loading, error, success, message, products } = useSelector(state => state.recommentProduct);

  useEffect(() => {
    dispatch(fetchAllRecommendProductsHome());;
  }, [])

  return (
    <section className="container pt-md-3 pb-5 mb-md-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <h2 className="h3 pb-2 text-black fw-bold fs-4"> Recommended Products</h2>
        <Link className="btn btn-link text-primary btn-sm" to="/products">

          More products
          <FaArrowRight className="ci-eye align-middle me-1" />
        </Link>
      </div>
      <hr className='mb-4' />


      {
        loading ? <Loader /> : <>
          {error ? <Alert variant={"left-accent"} status='error'>
            <AlertIcon />
            {message}
          </Alert> : <>
            <div>
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                grabCursor={true}
                cssMode={true}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Navigation]}
                className='recommended_product_slider'
              >
                {
                  Array.isArray(products) === true && products?.length >= 1 ? products?.map((e) => {
                    return (
                      <SwiperSlide key={e.v}>
                        <div style={{ marginBottom: "5rem" }}>
                          <ProductCard v={e.v} image={`${process.env.REACT_APP_BASE_URL}/media/product/${e.thumbnail}`} featured={e.featured} stock={e.stock} id={e.slug} name={e.name} category={e.category.name} original_price={e.unit_price} selling_price={e.offer_price} rating_count={4} />
                        </div>
                      </SwiperSlide>
                    )
                  }) : <h5 className='text-center mt-5 mb-5'>No Products Found</h5>
                }

              </Swiper>
            </div>


          </>}

        </>

      }




    </section>
  )
}

export default RecommendedPProducts