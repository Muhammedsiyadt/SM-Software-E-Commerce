// 29-04-2023 Athul Vinod

import React, { useEffect, useState } from 'react'
import { Link, useRoute } from 'wouter'
import TopBar from './TopBar'
import { FaArrowRight, FaBars, FaShoppingBasket } from 'react-icons/fa'
import './Nav.css';
import BottomNav from './BottomNav';
import Logo from '../../assets/images/icons/sm-online-logo-01.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCart } from '../../app/Cart/cartAction';
import { Loader } from 'react-bootstrap-typeahead';
import { Center } from '@chakra-ui/react';



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
  const { cat_loading, cat_error, cat, success, cat_message } = useSelector(state => state.cat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCart());
  }, [])

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
                        <ul className="widget-list">


                          {cat_loading ? <Center><Loader /></Center> : <>
                            {cat.slice(0 , 10).map(e => {
                              return (

                                <a className="widget-list-link fs-md mt-2" href={`/products?category=${e.slug}`}>
                                  {e.name}
                                </a>

                              )
                            })}
                          </>}


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