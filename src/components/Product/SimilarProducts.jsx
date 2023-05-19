// 05-05-2023 Athul Vinod



import React, { useEffect } from 'react'
import "react-multi-carousel/lib/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from './ProductCard';
import { Navigation } from 'swiper';

import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSimilarProducts } from '../../app/SimilarProducts/similarProductsAction';
import Loader from '../Loader/Loader';
import { Alert, AlertIcon } from '@chakra-ui/react';


function SimilarProducts({ slug }) {

    const dispatch = useDispatch();
    const { loading, error, products, message } = useSelector(state => state.similarProducts)

    useEffect(() => {
        dispatch(fetchAllSimilarProducts({ slug: slug }));
    }, [])

    return (
        <>

            <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
                <h2 className="h3 pb-2 text-black fw-bold fs-4">Similar Products</h2>
            </div>
            <hr className='mb-4' />

            {loading ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <>

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
                        {Array.isArray(products) === true ? products.map((e, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div style={{ marginBottom: "5rem" }}>
                                        <ProductCard v={e.v} image={`${process.env.REACT_APP_BASE_URL}/media/product/${e.thumbnail}`} id={e.slug} name={e.name} category={e.category.name} original_price={e.unit_price} selling_price={e.offer_price} rating_count={4} />
                                    </div>
                                </SwiperSlide>
                            )


                        }) : <h4 className='text-center h4 mt-5 mb-5'>No Products Found</h4>}
                    </Swiper>
                </>}
            </>}
        </>
    )
}

export default SimilarProducts