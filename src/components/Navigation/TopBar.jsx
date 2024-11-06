// 29-04-2023 Athul Vinod

import React from 'react'
import { FaHeadset, FaFacebook, FaInstagram, FaTwitter, FaPhone } from "react-icons/fa";
import { Link } from 'wouter';

function TopBar() {
    return (
        <div className='bg-primary'>
            <div className="container">
                <div className="row py-2  justify-content-lg-between justify-content-md-center">
                    <div className="col-lg-8 ">
                        <div className="d-flex justify-content-center justify-content-lg-start   align-items-center ">
                            <Link className="text-white text-decoration-none" to='/terms-of-use'>
                               Terms Of Use
                            </Link>
                            <span className="text-white px-2">|</span>
                            <Link to='/about' className="text-white text-decoration-none" href="">
                                About
                            </Link>
                            <span className="text-white px-2">|</span>
                            <a className="text-white text-decoration-none" href="">
                                Download App
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <a className="text-white px-2" href="">
                                <FaFacebook />
                            </a>
                            <a className="text-white px-2" href="">
                                <FaTwitter />
                            </a>
                            <a className="text-white px-2" href="">
                                <FaInstagram />
                            </a>
                            <a className="text-white px-2" href="">
                                <FaPhone />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default TopBar