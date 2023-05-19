// 06-05-2023 Athul Vinod



import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import DemoProduct from '../../assets/images/mock/headphone_mock.jpg'
import { Link } from 'wouter'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCart } from '../../app/Cart/cartAction'
import Loader from '../Loader/Loader'
import EmptyCart from '../Feedback/EmptyCart'
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from '@chakra-ui/react'
import { addAllCart } from '../../app/Cart/addCartAction'



function CartItems() {

    const dispatch = useDispatch();
    const { loading, success, user } = useSelector(state => state.user)
    const cartState = useSelector(state => state.cart);
    const addCartState = useSelector(state => state.addCart);

    useEffect(() => {
        if (!loading && success == true) {
            dispatch(fetchAllCart({ token: JSON.parse(localStorage.getItem('token')), id: user.id }))
        }
    }, [])

    function incrementQuantity(e, id) {
        dispatch(addAllCart({ token: JSON.parse(localStorage.getItem("token")), quantity: e, product: id }))
    }




    return (
        <div className="container pb-5 mb-2 mb-md-4">
            {cartState.loading ? <Loader /> : <>
                {cartState.error ? null : <>
                    {Array.isArray(cartState.items) && cartState.items.length >= 1 ? <div className="row">
                        {/* List of items*/}
                        <section className="col-lg-8">

                            {cartState.items.map((e) => {
                                return (
                                    <div key={e.id}>
                                        {/* Item*/}
                                        <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
                                            <div className="d-block d-sm-flex align-items-center text-center text-sm-start">
                                                <Link
                                                    className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                                    to={`/product/${e?.product[0]?.slug}`}
                                                >
                                                    <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${e?.product[0]?.thumbnail}`} width={130} alt="Product" />
                                                </Link>
                                                <div className="pt-2 ">
                                                    <Text noOfLines={1} className="product-title fs-base mb-2 ">
                                                        <Link to={`/product/${e?.product[0]?.slug}`}>{e.product[0].name}</Link>
                                                    </Text>
                                                    <div className="fs-lg text-primary pt-2">

                                                        {e?.product[0].offer_price !== 0 ?
                                                            <div className="h3 fw-normal text-primary mb-3 me-1">
                                                                <div className="d-flex flex-wrap">
                                                                    <div className="h3 fw-normal text-primary mb-3 me-1">
                                                                        ₹{e?.product[0].offer_price}
                                                                    </div>
                                                                </div>

                                                            </div> :
                                                            <div className="h3 fw-normal text-primary mb-3 me-1">₹{e?.product[0].unit_price}</div>}

                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start"
                                                style={{ maxWidth: "9rem" }}
                                            >
                                                <div>
                                                    <label className="form-label" htmlFor="quantity1">
                                                        Quantity
                                                    </label>

                                                    <NumberInput isDisabled={addCartState.loading} onChange={(l) => { incrementQuantity(l, e?.v) }} defaultValue={e?.quantity} min={1} max={e?.product[0]?.stock} >
                                                        <NumberInputField readOnly />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper
                                                                children={"+"}
                                                            />
                                                            <NumberDecrementStepper
                                                                children={"-"}
                                                            />

                                                        </NumberInputStepper>
                                                    </NumberInput>

                                                </div>
                                                <button className="btn btn-link mt-2 px-0 text-danger" type="button">
                                                    <FaTimes className="ci-close-circle me-2" />
                                                    <span className="fs-sm">Remove</span>
                                                </button>




                                            </div>
                                        </div>
                                    </div>
                                )
                            })}


                        </section>
                        {/* Sidebar*/}
                        <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5 ">
                            <div className="bg-white rounded-3 shadow-lg p-4 border border-">
                                <div className="py-2 px-xl-2">
                                    <div className=" mb-4 pb-3 border-bottom">
                                        <h2 className="h6 mb-3 pb-1">Subtotal ({cartState && cartState?.items.length})</h2>
                                        <h3 className="fw-bold text-primary">
                                            $154.<small>00</small>
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
                    </div > : <EmptyCart message={"Your cart is empty"} />}
                </>}
            </>}
        </div >

    )
}

export default CartItems