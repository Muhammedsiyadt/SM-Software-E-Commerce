// 29-04-2023 Athul Vinod

import React, { useState } from 'react'
import { Link, useRoute } from 'wouter'
import TopBar from './TopBar'
import { FaBars, FaShoppingBasket } from 'react-icons/fa'
import './Nav.css';
import BottomNav from './BottomNav';
import Logo from '../../assets/images/icons/sm-online-logo-01.png'



const ActiveLink = props => {
  const [isActive] = useRoute(props.href);
  return (
    <Link {...props}>
      <a className={isActive ? "nav-link active " : "nav-link"}>{props.children}</a>
    </Link>
  );
};


function Navbar() {

  const [active, setActive] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(false);

  return (
    <React.Fragment>
      <TopBar />

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <ActiveLink className="navbar-brand d-none d-sm-block flex-shrink-0" to='/'>
            <img src={Logo} alt={process.env.REACT_APP_PRODUCT_NAME} width="80" />
          </ActiveLink>
          <button
            className={`navbar-toggler ${!active && 'collapsed'}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => { setActive(!active) }}
          >
            <FaBars />
          </button>
          <div className={`collapse navbar-collapse justify-content-end ${active && 'show'}`} id="navbarSupportedContent">
            <ul className="navbar-nav my-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <ActiveLink className="nav-link" aria-current="page" href="/">
                  Home
                </ActiveLink>
              </li>


              <li className="nav-item dropdown active">
                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" onClick={() => { setActiveDropDown(!activeDropDown) }}>
                  Categories
                </a>
                <div className={`dropdown-menu ${activeDropDown && 'show'}`}>
                  <div className="d-flex flex-wrap flex-sm-nowrap px-2">
                    <div className="mega-dropdown-column pt-1 pt-lg-4 pb-4 px-2 px-lg-3">
                      <div className="widget widget-links mb-4">
                        <h6 className="fs-base mb-3">Laptops</h6>
                        <ul className="widget-list">
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-grid-ls.html">
                              Lenovo
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-grid-rs.html">
                              Dell
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-grid-ft.html">
                              Acer Predator
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-list-ls.html">
                              Dell Inspiration
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-list-rs.html">
                              AlienWare
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="shop-list-ft.html">
                              Toshiba Saltine
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="widget widget-links mb-4">
                        <h6 className="fs-base mb-3">Mobile</h6>
                        <ul className="widget-list">
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="marketplace-category.html">
                              Mobile
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="marketplace-single.html">
                              RealMe U1
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="marketplace-vendor.html">
                              Oppo F1
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="marketplace-cart.html">
                              Readme
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="marketplace-checkout.html">
                              Samsung
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mega-dropdown-column pt-1 pt-lg-4 pb-4 px-2 px-lg-3">
                      <div className="widget widget-links mb-4">
                        <h6 className="fs-base mb-3">Electronics</h6>
                        <ul className="widget-list">
                          <li className="widget-list-item">
                            <a
                              className="widget-list-link"
                              href="food-delivery-category.html"
                            >
                              Headphone
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="food-delivery-single.html">
                              Pendrive
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="food-delivery-cart.html">
                              Hard Disk
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a
                              className="widget-list-link"
                              href="food-delivery-checkout.html"
                            >
                              SSD
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="widget widget-links">
                        <h6 className="fs-base mb-3">
                          Parts
                        </h6>
                        <ul className="widget-list">
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-catalog-v1.html">
                              Processor
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-catalog-v2.html">
                              Graphics Card
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a
                              className="widget-list-link"
                              href="nft-single-auction-live.html"
                            >
                              Ram
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a
                              className="widget-list-link"
                              href="nft-single-auction-ended.html"
                            >
                              Monitor
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-single-buy.html">
                              Mouse
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-vendor.html">
                              Keyboard
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-connect-wallet.html">
                              Motherboard
                            </a>
                          </li>
                          <li className="widget-list-item">
                            <a className="widget-list-link" href="nft-create-item.html">
                              Cooling Fan
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <ActiveLink className="nav-link" href="/products">
                  Explore
                </ActiveLink>
              </li>


              <li className="nav-item">
                <ActiveLink className="nav-link" href="/contact">
                  Contact
                </ActiveLink>
              </li>



            </ul>
          </div>
        </div>
      </nav>
      <hr />
      <BottomNav />



    </React.Fragment>
  )
}

export default Navbar