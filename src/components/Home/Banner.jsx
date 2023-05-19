// 29-04-2023 Athul Vinod

import React from 'react';
import {FaArrowRight} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerImage1 from '../../assets/images/banner/banner-bgx.png';
import BannerImage2 from '../../assets/images/banner/geforce-rtx-40.jpg';

import './style.css'
import './banner.css'

// Import Swiper styles
import "swiper/css";



// import required modules
import { Autoplay } from "swiper";
import { Link } from 'wouter';
function Banner() {
    return (
        <Swiper
            spaceBetween={30}
            autoplay={{
                delay: 4500,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className="mySwiper"
        >
            <SwiperSlide className='slide_background' style={{backgroundImage:`url(${BannerImage2})`}}>
            <div className="container d-flex align-items-center h-100">
                    <div>
                        <h1 className='text-white display-4 fw-bold'>Hurry Up Limited Time Offer</h1>
                        <p className='fs-4 text-white'>Bestselling Electronics & Accessories of the Season</p>
                        <div className="d-table scale-up delay-4 mx-auto mx-lg-0">
                            <Link className="btn btn-primary" to="/products">
                                Shop Now
                                <FaArrowRight className="ci-arrow-right ms-2 me-n1" />
                            </Link>
                        </div>

                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide className='slide_background' style={{backgroundImage:`url(${BannerImage1})`}}>
            <div className="container d-flex align-items-center h-100">
                    <div>
                        <h1 className='text-white display-4 fw-bold'>Hurry Up Limited Time Offer</h1>
                        <p className='fs-4 text-white' >Bestselling Electronics & Accessories of the Season</p>
                        <div className="d-table scale-up delay-4 mx-auto mx-lg-0">
                            <Link className="btn btn-primary" to="/products">
                                Shop Now
                                <FaArrowRight className="ci-arrow-right ms-2 me-n1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}

export default Banner