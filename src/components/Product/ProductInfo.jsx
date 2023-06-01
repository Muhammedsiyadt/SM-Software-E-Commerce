// 05-05-2023 Athul Vinod



import React, { useEffect, useState } from 'react'

import { Skeleton } from '@chakra-ui/react';
import { FaFacebook, FaHeart, FaInstagram, FaShoppingCart, FaTwitter } from 'react-icons/fa'
import { addAllCart } from '../../app/Cart/addCartAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'wouter';
import './details.css'
import { addWishlist } from '../../app/Wishlist/addListAction';
import { increment } from '../../app/count';
import { toast } from 'react-toastify';



function ProductInfo({ product }) {


    const [id, setId] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const dispatch = useDispatch();
    const userState = useSelector(state => state.user)

    useEffect(() => {

        if (product?.gallery !== undefined && product?.gallery.length >= 1 && product?.gallery !== undefined) {
            setId(product?.gallery[0].id);
            if (id !== null) {
                const image = product?.gallery.find(e => e.id === id);
                setCurrentImage(image);
            }
        }

    }, [])

    useEffect(() => {
        if (id !== null) {
            const image = product?.gallery.find(e => e.id === id);
            setCurrentImage(image);
        }
    }, [id]);


    function addToCart() {
        dispatch(addAllCart({ token: JSON.parse(localStorage.getItem("token")), quantity: 1, product: product.v }))
    }

    function addToWishList() {
        dispatch(addWishlist({ token: JSON.parse(localStorage.getItem("token")), product: product.v }))
    }

    function addToLocalStorage(id) {
        // Retrieve existing data from localStorage
        var existingItems = localStorage.getItem('cart_items');
        var itemsArray = existingItems ? JSON.parse(existingItems) : [];

        // Check if the new value already exists in the array
        if (!itemsArray.includes(id)) {
            // Add the new value to the array
            toast.success("Item successfully added to cart");
            itemsArray.push(id);
        }
        else {
            toast.info("Item already in the cart");
        }

        // Store the updated array back into localStorage
        localStorage.setItem('cart_items', JSON.stringify(itemsArray));

        const storedCartItems = localStorage.getItem('cart_items');
        const cartItemsLength = storedCartItems ? JSON.parse(storedCartItems).length : 0;

        dispatch(increment(cartItemsLength))

    }
    return (


        <>
            <div className="row">

                {/* Product gallery*/}
                <div className="col-lg-6 pe-lg-0">
                    <div className="product-gallery">
                        <div className="product-gallery-preview order-sm-2">
                            <div
                                id="imageMagnifier"
                            >
                                {currentImage !== null && currentImage !== undefined ?
                                    <>
                                        <img src={`${process.env.REACT_APP_BASE_URL}/media/products/${currentImage.image_path}`} alt="Product Image" className='image-zoom' />
                                    </> : <Skeleton height={100} />
                                }

                            </div>
                        </div>
                        <div className="product-gallery-thumblist order-sm-1">
                            {product?.gallery !== undefined && product?.gallery !== undefined && product?.gallery.map((e, index) => {
                                return (
                                    <a
                                        className={`product-gallery-thumblist-item  ${id == e.id ? 'active' : ''}`}
                                        onClick={() => { setId(e.id) }}
                                        key={index}
                                    >
                                        <img
                                            src={`${process.env.REACT_APP_BASE_URL}/media/products/${e.image_path}`}
                                            alt={e.image_path}
                                        />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Product details*/}
                <div className="col-lg-5 pt-4 pt-lg-0">

                    <div className="product-details ms-auto pb-3">
                        <h5 className='mb-4 text-capitalize'>
                            {product?.name}
                        </h5>
                        {product?.offer_price !== 0 ?
                            <div className="h3 fw-normal text-primary mb-3 me-1">
                                <div className="d-flex  gap-2 align-items-end">
                                    <div className="h5 fw-normal text-danger mb-3 me-1">
                                        {product?.discount_type == 0 ? "Flat" : <>-20%</>}
                                    </div>
                                    <div className="d-flex flex-wrap">

                                        <div className="h3 fw-normal text-primary mb-3 me-1">
                                            ₹{product?.offer_price}
                                        </div>
                                        <span>-</span>
                                        <div className="h3 fw-normal text-muted text-decoration-line-through mb-3 me-2 mx-2">
                                            ₹{product?.unit_price}
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <div className="h3 fw-normal text-primary mb-3 me-1">₹{product?.unit_price}</div>}

                        <div className="fs-sm mb-2">
                            <span className="text-heading fw-medium me-1">Brand:</span>
                            <span className="text-muted" id="colorOption">
                                <Link to={`/products?brand=${product?.brand?.name}`} >{product?.brand?.name}</Link>
                            </span>
                        </div>

                        <div className="fs-sm mb-2">
                            <span className="text-heading fw-medium me-1">Category:</span>
                            <span className="text-muted" id="colorOption">
                                {product && product?.category !== undefined && product.category.map((e, index) => {
                                    return <span key={index}><Link to={`/products?category=${e.slug}`} >{e.name}</Link>, </span>
                                })}
                            </span>
                        </div>



                        <div className="d-flex align-items-center pt-2 pb-4">

                            {
                                product?.stock <= 0 ?
                                    <button
                                        className="btn btn-primary btn-shadow d-block w-100 disabled"
                                        type="button"
                                        disabled
                                    >
                                        Out Of Stock
                                    </button> : userState.success == true ?
                                        <button
                                            className="btn btn-primary btn-shadow d-block w-100"
                                            type="button"
                                            onClick={addToCart}
                                        >
                                            <FaShoppingCart className="ci-cart fs-lg me-2" />
                                            Add to Cart
                                        </button> : <button onClick={() => {addToLocalStorage(product?.slug)}} className="btn btn-primary btn-shadow d-block w-100">
                                            <FaShoppingCart className="ci-cart fs-lg me-2" />
                                            Add to Cart
                                        </button>
                            }


                        </div>
                        <div className="d-flex mb-4">
                            <div className="w-100">
                                {
                                    product?.stock <= 0 ? <button
                                        className="btn btn-shadow btn-light text-dark border border-1 d-block w-100 disabled"
                                        type="button"
                                        disabled
                                    >
                                        Out of stock
                                    </button> : userState.success == true ?
                                        <button
                                            className="btn btn-shadow btn-light text-dark border border-1 d-block w-100"
                                            type="button"
                                            onClick={addToWishList}
                                        >
                                            <FaHeart className="ci-heart fs-lg me-2" />
                                            <span className="d-none d-sm-inline">Add to </span>
                                            Wishlist
                                        </button> : <Link
                                            className="btn btn-shadow btn-light text-dark border border-1 d-block w-100"
                                            to='/login'
                                        >
                                            <FaHeart className="ci-heart fs-lg me-2" />
                                            <span className="d-none d-sm-inline">Add to </span>
                                            Wishlist
                                        </Link>
                                }

                            </div>
                        </div>

                        <div className="my-2 me-3">
                            <p>
                                {product?.short_description}
                            </p>

                        </div>

                        {/* Sharing*/}
                        <label className="form-label d-inline-block align-middle my-2 me-3">
                            Share:
                        </label>
                        <a className="btn-share btn-twitter me-2 my-2" href="#">
                            <FaTwitter className="ci-twitter" />
                            Twitter
                        </a>
                        <a className="btn-share btn-instagram me-2 my-2" href="#">
                            <FaInstagram className="ci-instagram" />
                            Instagram
                        </a>
                        <a className="btn-share btn-facebook my-2" href="#">
                            <FaFacebook className="ci-facebook" />
                            Facebook
                        </a>
                    </div>

                </div>



            </div>

            <div className="container-fluid mt-5 mb-5">
                <div className='long_desc' dangerouslySetInnerHTML={{ __html: product?.long_description }}></div>
            </div>
        </>
    )
}

export default ProductInfo