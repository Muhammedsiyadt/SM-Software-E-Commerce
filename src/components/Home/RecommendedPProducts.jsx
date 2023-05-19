// 03-05-2023 Athul Vinod

import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react";

import './style.css';


import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";




import { Navigation } from 'swiper';
import ProductCard from '../Product/ProductCard';
import { Link } from 'wouter';

function RecommendedPProducts() {
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

          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://www.aptronixindia.com/pub/media/catalog/product/s/o/sony_wh-xb700_wireless_bluetooth_on_ear_headphone_with_mic_black_3_1.png" id={2} name="Leather High-Top Headset" category="Headset" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://smsoft.co.in/wp-content/uploads/2021/05/lenovo-na-laptop-original-imafuzt8r5jqppfn.jpeg" id={2} name="Lenovo ideapad Slim 3 7YIN I5" category="Laptop" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>


          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://smsoft.co.in/wp-content/uploads/2020/05/419.png" id={2} name="HP Ink Tank Wireless 419 Printer" category="Printer" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>



          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://smsoft.co.in/wp-content/uploads/2020/01/desktop_g_series_g5_5090_pdp_mod_7_in-375x450.jpg" id={2} name="Dell G5 5090 Gaming Desktop" category="Desktop" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://smsoft.co.in/wp-content/uploads/2021/05/5848214.png" id={2} name="LENOVO IP SLIM 3 81WE01-5UIN" category="Laptop" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>


          <SwiperSlide>
            <div style={{ marginBottom: "5rem" }}>
              <ProductCard image="https://smsoft.co.in/wp-content/uploads/2021/05/lenovo-original-imagyfw5fkyjrhmb.jpeg" id={2} name="Lenovo Flex 5 82HS009HIN 2 in 1 Laptop" category="Laptop" original_price={250} selling_price={210} rating_count={4} />
            </div>
          </SwiperSlide>


        </Swiper>
      </div>
    </section>
  )
}

export default RecommendedPProducts