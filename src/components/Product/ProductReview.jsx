// 05-05-2023 Athul Vinod

import React from 'react';
import {FaSpinner, FaStar} from 'react-icons/fa'

function ProductReview() {
    return (
        <div>
            {/* Reviews tab*/}
            <div>
                <div className="row py-4">
                    {/* Reviews list*/}
                    <div>
                        {/* Review*/}
                        <div className="product-review pb-4 mb-4 border-bottom">
                            <div className="d-flex mb-3">
                                <div className="d-flex align-items-center me-4 pe-2">
                                    <img
                                        className="rounded-circle"
                                        src="https://randomuser.me/api/portraits/women/36.jpg"
                                        width={50}
                                        alt="Daniel Adams"
                                    />
                                    <div className="ps-3">
                                        <h6 className="fs-sm mb-0">Daniel Adams</h6>
                                        <span className="fs-ms text-muted">May 8, 2019</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="star-rating">
                                        <FaStar className="star-rating-icon ci-star-filled active" />
                                        <FaStar className="star-rating-icon ci-star-filled active" />
                                        <FaStar className="star-rating-icon ci-star-filled active" />
                                        <FaStar className="star-rating-icon ci-star" />
                                        <FaStar className="star-rating-icon ci-star" />
                                    </div>
                                </div>
                            </div>
                            <p className="fs-md mb-2">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque
                                ipsa quae ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.
                            </p>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="button">
                                <FaSpinner className="ci-reload me-2" />
                                Load more reviews
                            </button>
                        </div>
                    </div>
                    {/* Leave review form*/}
                    <div className="mt-2 pt-4 mt-md-0 pt-md-0">
                        <div className="bg-secondary py-grid-gutter px-grid-gutter rounded-3">
                            <h3 className="h4 pb-2">Write a review</h3>
                            <form className="needs-validation" method="post" noValidate="">
  
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="review-rating">
                                        Rating<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        required=""
                                        id="review-rating"
                                    >
                                        <option value="">Choose rating</option>
                                        <option value={5}>5 stars</option>
                                        <option value={4}>4 stars</option>
                                        <option value={3}>3 stars</option>
                                        <option value={2}>2 stars</option>
                                        <option value={1}>1 star</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please choose rating!
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="review-cons">
                                        Review
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        placeholder="Your review"
                                        id="review-cons"
                                        defaultValue={""}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-shadow d-block w-100"
                                    type="submit"
                                >
                                    Submit a Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductReview