import { Text, Tooltip } from '@chakra-ui/react';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'wouter';


function OfflineCartVerdict({ cartState }) {

    

    return (
        <>
            <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5 ">
                <div className="bg-white rounded-3 shadow-lg p-4 border border-">
                    <div className="py-2 px-xl-2">
                        <div className=" mb-4 pb-3 ">
                            <h2 className="h6 mb-3 pb-1">Total Items ({cartState && cartState?.items.length})</h2>
                            <h3 className="fw-bold text-primary">

                                <div className=" ml-0 mb-3">
                                    {cartState.items.map((e, index) => {
                                        return (
                                            <div className="d-flex mt-2 mb-2 align-items-center pb-2 border-bottom" key={e.v}>
                                                <Link
                                                    className="d-block flex-shrink-0 me-2"
                                                    to={`/product/${e?.slug}`}
                                                >

                                                </Link>
                                                <div className="ps-1">
                                                    <div className="d-flex">
                                                        <Tooltip label={e?.name} hasArrow>
                                                            <Text noOfLines={1} className="widget-product-title">
                                                                <Link
                                                                    className="d-block flex-shrink-0 me-2 text-capitalize"
                                                                    to={`/product/${e?.slug}`}
                                                                >{e?.name}</Link>
                                                            </Text>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="widget-product-meta">
                                                        <span className="text-primary border-end pe-2 me-2">
                                                            ₹
                                                            {parseFloat(e?.offer_price) !== 0 ?

                                                                <span>
                                                                    {e?.offer_price}
                                                                </span>
                                                                :
                                                                <span>{
                                                                    e?.unit_price
                                                                }</span>}
                                                        </span>
                                                        <span className="fs-xs text-muted">{e?.brand.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    <ul className="list-unstyled fs-sm pt-3 pb-2 border-bottom">
                                        <li className="d-flex justify-content-between align-items-center">
                                            <span className="me-2">Subtotal:</span>
                                            <span className="text-end">
                                                ₹{
                                                    cartState.items.reduce((total = 0.0, cur) => {
                                                
                                                            if (parseFloat(cur?.offer_price) !== 0) {
                                                                total += parseFloat(cur?.offer_price);
                                                            } else {
                                                                total += parseFloat(cur?.unit_price);
                                                            }
                                                        
                                                        return total;
                                                    }, 0.0)
                                                }
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </h3>
                        </div>

                        <Link
                            className="btn btn-primary btn-shadow d-block w-100 mt-4"
                            to='/login'
                        >
                            <FaArrowRight className="ci-card fs-lg me-2" />
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </aside>

        </>
    )
}

export default OfflineCartVerdict