// 06-05-2023 Athul Vinod



import React from 'react'
import { FaArrowRight, FaShoppingCart, FaTimes } from 'react-icons/fa'
import DemoProduct from '../../assets/images/mock/headphone_mock.jpg'
import { Link } from 'wouter'
import { Tooltip } from '@chakra-ui/react'

function WishList() {




    return (
        <div className="container pb-5 mb-2 mb-md-4">
            <div className="row">
                {/* List of items*/}
                <section className="col-lg-12">
                    {/* Item*/}
                    <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
                        <div className="d-block d-sm-flex align-items-center text-center text-sm-start">
                            <a
                                className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                href="shop-single-v1.html"
                            >
                                <img src={DemoProduct} width={160} alt="Product" />
                            </a>
                            <div className="pt-2">
                                <h3 className="product-title fs-base mb-2">
                                    <a href="shop-single-v1.html">Leather High-Top Headset</a>
                                </h3>
                                <div className="fs-sm d-none">
                                    <span className="text-muted me-2">Size:</span>8.5
                                </div>
                                <div className="fs-lg text-primary pt-2">
                                    $154.<small>00</small>
                                </div>
                            </div>

                        </div>
                        <div
                            className="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start"
                            style={{ maxWidth: "12rem" }}
                        >
                            <div className='d-none'>
                                <label className="form-label" htmlFor="quantity1">
                                    Quantity
                                </label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="quantity1"
                                    min={1}
                                    defaultValue={1}
                                />
                            </div>

                            <div className='d-flex gap-4'>
                               <div>
                               <Tooltip label="Add To Cart">
                               <button className="btn btn-primary">
                                    <FaShoppingCart className="ci-close-circle" />
                                    {/* <span className="fs-sm">Add To Cart</span> */}
                                </button>
                               </Tooltip>
                               </div>
                                <div>
                                    <button className="btn  btn-danger  " type="button">
                                        <FaTimes className="ci-close-circle " />
                                        {/* <span className="fs-sm">Remove</span> */}
                                    </button>
                                </div>
                            </div>



                        </div>
                    </div>

                    <div className="text-center">
                        <Link
                            className="btn btn-primary btn-shadow  mt-4"
                            to='/products'
                        >
                            <FaShoppingCart className="ci-card fs-lg me-2" />
                            Continue Shopping
                        </Link>
                    </div>




                </section>
            </div >
        </div >
    )
}

export default WishList