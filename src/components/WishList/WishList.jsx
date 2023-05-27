// 06-05-2023 Athul Vinod



import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { Link } from 'wouter'
import { Alert, AlertIcon, Text, Tooltip } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllWishList } from '../../app/Wishlist/wishListAction'
import Loader from '../Loader/Loader'
import Empty from '../Feedback/EmptyCart'
import { addAllCart } from '../../app/Cart/addCartAction'
import { removeWishList } from '../../app/Wishlist/removeWishListAction'

function WishList() {

    const [count, setCount] = useState(1)
    const dispatch = useDispatch(state => state.wishList);
    const { loading, error, items, success  , message} = useSelector(state => state.wishList)


    useEffect(() => {
        dispatch(fetchAllWishList({ token: JSON.parse(localStorage.getItem('token')) }));
    }, [count]);

    function addToCart(product) {
        dispatch(addAllCart({ token: JSON.parse(localStorage.getItem("token")), quantity: 1, product: product }))
        dispatch(fetchAllWishList({ token: JSON.parse(localStorage.getItem('token')) }));
    }

    function removeWishListFunc(product) {

        dispatch(removeWishList({ token: JSON.parse(localStorage.getItem("token")), product: product }))
        dispatch(fetchAllWishList({ token: JSON.parse(localStorage.getItem('token')) }));
        setCount((prevKey) => prevKey + 1);
    }


    return (
        <div className="container pb-5 mb-2 mb-md-4">
            <div className="row">
                {/* List of items*/}
                <section className="col-lg-12">
                    {/* Item*/}

                    {loading ? <Loader /> : <>
                        {error ? <Alert variant={"left-accent"} status='error'>
                            <AlertIcon />
                            {message}
                        </Alert> : <>
                            {Array.isArray(items) && items.length >= 1 ? items.map(e => {
                                return (
                                    <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom" key={e.id}>
                                        <div className="d-block d-sm-flex align-items-center text-center text-sm-start">
                                            <Link
                                                className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                                to={`/product/${e?.product?.slug}`}
                                            >
                                                <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${e?.product?.thumbnail}`} width={160} alt="Product" />
                                            </Link>
                                            <div className="pt-2">
                                               <Tooltip label={e?.product?.name} hasArrow>
                                               <Text wordBreak={2} maxWidth={600}>
                                                    <h3 className="product-title fs-base mb-2 text-capitalize">

                                                        <Link to={`/product/${e?.product?.slug}`}>{e?.product?.name}</Link>

                                                    </h3>
                                                </Text>
                                               </Tooltip>
                                                <div className="fs-lg text-primary pt-2">

                                                    {parseFloat(e?.product.offer_price) !== 0 ?
                                                        <div className="h3 fw-normal text-primary mb-3 me-1">
                                                            <div className="d-flex flex-wrap">
                                                                <div className="h3 fw-normal text-primary mb-3 me-1">
                                                                    ₹{e?.product.offer_price}
                                                                </div>
                                                            </div>

                                                        </div> :
                                                        <div className="h3 fw-normal text-primary mb-3 me-1">₹{
                                                            e?.product.unit_price
                                                        }</div>}

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
                                                    <Tooltip label="Add To Cart" hasArrow>
                                                        <button className="btn btn-primary" onClick={() => { addToCart(e?.product?.id) }}>
                                                            <FaShoppingCart className="ci-close-circle" />
                                                            {/* <span className="fs-sm">Add To Cart</span> */}
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                <Tooltip label="Remove item" hasArrow>
                                                    <button className="btn  btn-danger  " type="button" onClick={() => {removeWishListFunc(e?.product?.id)}}>
                                                        <FaTimes className="ci-close-circle " />
                                                        {/* <span className="fs-sm">Remove</span> */}
                                                    </button>
                                                    </Tooltip>
                                                </div>
                                            </div>



                                        </div>
                                    </div>

                                )
                            }) : <Empty message={"Your wishlist is empty"} />}
                        </>}
                    </>}
                    



                </section>
            </div >
        </div >
    )
}

export default WishList