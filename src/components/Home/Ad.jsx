// 29-04-2023 Athul Vinod

import React from 'react'
import LaptopBanner from '../../assets/images/other/laptop.jpg'
import { Link } from 'wouter'


function Ad() {
    return (
        <div className="container mt-5">

            <h2 className="h3 pb-2 text-black fw-bold fs-4">Great deals your way : Shop Now</h2>
  <hr className='mb-4' />
            <section className="container pb-4 mb-md-3 mt-5">
  <div className="row">
    <div className="col-md-8 mb-4">
      <div className="d-sm-flex justify-content-between align-items-center bg-secondary overflow-hidden rounded-3 ad_1">
        <div className="py-4 my-2 my-md-0 py-md-5 px-4 ms-md-3 text-center text-sm-start">
          <h4 className="fs-lg  mb-2 text-white">Hurry up! Limited time offer</h4>
          <h3 className="mb-4 text-white">Converse All Star on Sale</h3>
          <Link className="btn btn-primary btn-shadow btn-sm" to="/products">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
      <div
        className="d-flex flex-column h-100 border justify-content-center bg-size-cover bg-position-center rounded-3"
      >
        <div className="py-4 my-2 px-4 text-center">
          <div className="py-1">
            <h5 className="mb-2">Have any questions please contacts us</h5>
            <p className="fs-sm text-muted">Hurry up to reserve your spot</p>
            <Link className="btn btn-primary btn-shadow btn-sm" to='/contact'>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



        </div>
    )
}

export default Ad