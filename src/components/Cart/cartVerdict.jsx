import { Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'wouter';
import { fetchAllCart } from '../../app/Cart/cartAction';


function CartVerdict({cartState}) {

   

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
                                                    to={`/product/${e?.product[0].slug}`}
                                                >

                                                </Link>
                                                <div className="ps-1">
                                                    <div className="d-flex">
                                                        <Tooltip label={e?.product[0].name}>
                                                            <Text noOfLines={1} className="widget-product-title">
                                                                <Link
                                                                    className="d-block flex-shrink-0 me-2 text-capitalize"
                                                                    to={`/product/${e?.product[0].slug}`}
                                                                >{e?.product[0].name}</Link>
                                                            </Text>
                                                        </Tooltip>
                                                        <span className="d-block flex-shrink-0 me-2  text-capitalize" style={{ fontSize: "14px" }}>
                                                            x{e?.quantity}
                                                        </span>
                                                    </div>
                                                    <div className="widget-product-meta">
                                                        <span className="text-primary border-end pe-2 me-2">
                                                            ₹
                                                            {e?.product[0].offer_price !== 0 ?

                                                                <span>
                                                                    {e?.product[0].offer_price * e?.quantity}
                                                                </span>


                                                                :
                                                                <span>{
                                                                    e?.product[0].unit_price * e?.quantity
                                                                }</span>}
                                                        </span>
                                                        <span className="fs-xs text-muted">{e?.product[0].brand.name}</span>
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
                                                        cur.product.forEach((e) => {
                                                            if (e?.offer_price !== 0) {
                                                                total += parseFloat(e?.offer_price) * cur.quantity;
                                                            } else {
                                                                total += parseFloat(e?.unit_price) * cur.quantity;
                                                            }
                                                        });
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
                            to='/checkout'
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

export default CartVerdict