// 05-05-2023 Athul Vinod



import React, { useEffect, useState } from 'react'

// import mock1 from '../../assets/images/mock/headphone_mock.jpg';
import mock2 from '../../assets/images/mock/headphone_mock2.jpg';
import mock3 from '../../assets/images/mock/headphone_mock3.jpg';
import mock4 from '../../assets/images/mock/headphone_mock4.jpg';
import { Divider, Skeleton } from '@chakra-ui/react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import { FaFacebook, FaHeart, FaInstagram, FaShoppingCart, FaTwitter } from 'react-icons/fa'



function ProductInfo({ product }) {



    const [id, setId] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

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



    return (


        <>

            <div className="row">

                {/* Product gallery*/}
                <div className="col-lg-7 pe-lg-0">
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

                        {product?.offer_price !== 0 ?
                            <div className="h3 fw-normal text-primary mb-3 me-1">
                                <div className="d-flex flex-wrap">
                                    <div className="h3 fw-normal text-primary mb-3 me-1">
                                        ₹{product?.offer_price}
                                    </div>
                                    <span>-</span>
                                    <div className="h3 fw-normal text-muted text-decoration-line-through mb-3 me-2 mx-2">
                                        ₹{product?.unit_price}
                                    </div>
                                </div>

                            </div> :
                            <div className="h3 fw-normal text-primary mb-3 me-1">₹{product?.unit_price}</div>}

                        <div className="fs-sm mb-4">
                            <span className="text-heading fw-medium me-1">Brand:</span>
                            <span className="text-muted" id="colorOption">
                                {product?.brand?.name}
                            </span>
                        </div>

                        <div className="d-flex align-items-center pt-2 pb-4">

                            <button
                                className="btn btn-primary btn-shadow d-block w-100"
                                type="button"
                            >
                                <FaShoppingCart className="ci-cart fs-lg me-2" />
                                Add to Cart
                            </button>
                        </div>
                        <div className="d-flex mb-4">
                            <div className="w-100">
                                <button
                                    className="btn btn-shadow btn-light text-dark border border-1 d-block w-100"
                                    type="button"
                                >
                                    <FaHeart className="ci-heart fs-lg me-2" />
                                    <span className="d-none d-sm-inline">Add to </span>
                                    Wishlist
                                </button>
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
                <div dangerouslySetInnerHTML={{ __html: product?.long_description }}></div>
            </div>
        </>
    )
}

export default ProductInfo