// 29-04-2023 Athul Vinod

import React from 'react'
import LaptopImage from '../../assets/images/other/laptop.jpg';
import PhoneImage from '../../assets/images/other/phone.jpg';
import ElectronicsImage from '../../assets/images/other/headphone.jpg';
import CCTVImage from '../../assets/images/other/cctv.png';
import PrinterImage from '../../assets/images/other/printer.jpg';
import { Divider, Stack } from '@chakra-ui/react';
import { Link } from 'wouter';


function BannerCategory() {
  return (
    <section
      className="container position-relative pt-3 pt-lg-0 pb-5 mt-lg-n10 mb-0 "
      style={{ zIndex: 10 }}
    >
      <div className="row  mt-5">
        <div className="col-xl-12 col-lg-7">
          <div className="card border-0 shadow-lg">
            <div className="card-body px-3 pt-grid-gutter pb-0">
              <div className="row  ps-1 justify-content-around">
                <div className="col-sm-2 px-2 mb-grid-gutter">

                  <Stack direction={"row"} h="100%">
                    <Link
                      className="d-block text-center text-decoration-none me-1"
                      to="/products?category=laptop"
                    >
                      <img
                        className="d-block rounded mb-3"
                        src={LaptopImage}
                        alt="laptop"
                      />
                      <h3 className="fs-base pt-1 mb-0">Laptops</h3>

                    </Link>
                    <Divider orientation="vertical" className='d-sm-none d-lg-block d-xl-block d-md-none' />
                  </Stack>

                </div>
                <div className="col-sm-2 px-2 mb-grid-gutter">
                  <Stack direction={"row"} h="100%">
                    <Link
                      className="d-block text-center text-decoration-none me-1"
                      to="/products?category=phone"
                    >
                      <img
                        className="d-block rounded mb-3"
                        src={PhoneImage}
                        alt="phone"
                      />
                      <h3 className="fs-base pt-1 mb-0">Mobile Phones</h3>
                    </Link>
                    <Divider orientation="vertical" className='d-sm-none d-lg-block d-xl-block d-md-none' />
                  </Stack>
                </div>

                <div className="col-sm-2 px-2 mb-grid-gutter">
                  
                  <Stack direction={"row"} h="100%">
                    <Link
                      className="d-block text-center text-decoration-none me-1"
                      to="/products?category=cctv"
                      
                    >
                      <img
                        className="d-block rounded mb-3"
                        src={CCTVImage}
                        alt="electronics"
                      />
                      <h3 className="fs-base pt-1 mb-0">CCTV</h3>
                    </Link>
                    <Divider orientation="vertical" className='d-sm-none d-lg-block d-xl-block d-md-none' />
                  </Stack>

                </div>

                <div className="col-sm-2 px-2 mb-grid-gutter">
                  <Stack direction={"row"} h="100%">
                    <Link
                      className="d-block text-center text-decoration-none me-1"
                      to="/products?category=printer"
                    >
                      <img
                        className="d-block rounded mb-3"
                        src={PrinterImage}
                        alt="printer"
                      />
                      <h3 className="fs-base pt-1 mb-0">Printer</h3>
                    </Link>
                    <Divider orientation="vertical" className='d-sm-none d-lg-block d-xl-block d-md-none' />
                  </Stack>
                </div>


                <div className="col-sm-2 px-2 mb-grid-gutter">
                  <Link
                    className="d-block text-center text-decoration-none me-1"
                    to="/products?category=electronics"
                  >
                    <img
                      className="d-block rounded mb-3"
                      src={ElectronicsImage}
                      alt="electronics"
                    />
                    <h3 className="fs-base pt-1 mb-0">Other Electronics</h3>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerCategory