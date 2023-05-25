// 03-05-2023 Athul Vinod

import React, { useEffect } from 'react'
import { FaDollarSign, FaHeadset, FaIdCard, FaRocket } from 'react-icons/fa'
import { Link } from 'wouter'
import { fetchAllBrands } from '../../app/Brands/brandsAction';
import { useDispatch, useSelector } from 'react-redux';

function Footer() {


  const { loading, error, success, brands, message } = useSelector(state => state.brands);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [])


  return (
    <footer className="footer bg-dark pt-5">
      <div className="container">
        <div className="row pb-2">
          <div className="col-md-4 col-sm-6">
            <div className="widget widget-links widget-light pb-2 mb-4">
              <h3 className="widget-title text-light">Shop departments</h3>
              <ul className="widget-list">

                {loading ?  <span className="text-white">
                Loading....
                </span> : <>
                {error ? <span className="text-white">
               {message}
                </span> : <>
                
                {Array.isArray(brands) ? brands.slice(0 , 6).map(e => {
                  return (
                    <li className="widget-list-item" key={e.v}>
                  <a className="widget-list-link" href={`/products?brand=${e.slug}`}>
                    {e.name}
                  </a>
                </li>
                  )
                }) : <h6 className='text-white mt-5 mb-5'>
                <strong>No departments found</strong>
              </h6>}
                
                </>}
                </>}

              </ul>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="widget widget-links widget-light pb-2 mb-4">
              <h3 className="widget-title text-light">
                Account &amp; shipping info
              </h3>
              <ul className="widget-list">
                <li className="widget-list-item">
                  <a className="widget-list-link" href="#">
                    Your account
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="#">
                    Refunds &amp; replacements
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="#">
                    Order tracking
                  </a>
                </li>
                <li className="widget-list-item">
                  <a className="widget-list-link" href="#">
                    Delivery info
                  </a>
                </li>
              </ul>
            </div>
            <div className="widget widget-links widget-light pb-2 mb-4">
              <h3 className="widget-title text-light">About us</h3>
              <ul className="widget-list">
                <li className="widget-list-item">
                  <Link className="widget-list-link" to='/about'>
                    About company
                  </Link>
                </li>
                <li className="widget-list-item">
                  <Link className="widget-list-link" to='/contact'>
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="widget pb-2 mb-4">
              <h3 className="widget-title text-light pb-1">Download our app</h3>
              <div className="d-flex flex-wrap">
                <div className="me-2 mb-2">
                  <a className="btn-market btn-apple" href="#" role="button">
                    <span className="btn-market-subtitle">Download on the</span>
                    <span className="btn-market-title">App Store</span>
                  </a>
                </div>
                <div className="mb-2">
                  <a className="btn-market btn-google" href="#" role="button">
                    <span className="btn-market-subtitle">Download on the</span>
                    <span className="btn-market-title">Google Play</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 bg-darker">
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaRocket
                  className="ci-rocket text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-light mb-1">
                    Fast and free delivery
                  </h6>
                  <p className="mb-0 fs-ms text-light opacity-50">
                    Free delivery for all orders over $200
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaDollarSign
                  className="ci-currency-exchange text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-light mb-1">Money back guarantee</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">
                    We return money within 30 days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaHeadset
                  className="ci-support text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-light mb-1">24/7 customer support</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">
                    Friendly 24/7 customer support
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaIdCard
                  className="ci-card text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-light mb-1">Secure online payment</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">
                    We possess SSL / Secure сertificate
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-light mb-5" />
          <div className="pb-4 fs-xs text-white opacity-50 text-center  fs-6 d-flex flex-wrap justify-content-between">
            <div>
            Copyright © {new Date().getFullYear()} {process.env.REACT_APP_PRODUCT_NAME}, All Rights Reserved. Developed by  {" "}
              <a
                className="text-white"
                href="https://www.xeventure.com/"
                target="_blank"
                rel="noopener"
              >
                Xeventure
              </a>
            </div>
            <div>
              <div className="d-flex justify-content-center justify-content-lg-start flex-wrap   align-items-center ">
                <Link className="text-white text-decoration-none" to='/terms-of-use'>
                  Terms Of Use
                </Link>
                <span className="text-white px-2">|</span>
                <Link className="text-white text-decoration-none" to='/refund-policy'>
                  Return & Refund Policy
                </Link>
                <span className="text-white px-2">|</span>
                <Link className="text-white text-decoration-none" to='/privacy-policy'>
                  Privacy Policy
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer