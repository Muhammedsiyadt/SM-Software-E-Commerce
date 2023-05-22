// 05-05-2023 Athul Vinod

import React, { useEffect } from 'react';
import { FaSpinner, FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReview } from '../../app/review/reviewAction';
import Loader from '../Loader/Loader';
import Empty from '../Feedback/EmptyReview'
import { Alert, AlertIcon, Button, Select, Textarea } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { reviewSchema } from '../../validation/reviewSchema';

function ProductReview({ id }) {

    const dispatch = useDispatch();
    const { loading, review, error, success, message } = useSelector(state => state.review);
    const userState = useSelector(state => state.user);


    useEffect(() => {
        dispatch(fetchAllReview({ id: id }));
    }, [])

    const initialValues = {
        rating: 1,
        comment: ""
    }

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <div>
            {/* Reviews tab*/}
            <div>
                <div className="row py-4">
                    {/* Reviews list*/}
                    <div>
                        {loading ? <Loader /> : <>
                            {error ? <div className='mb-4'>
                                <Alert variant={"left-accent"} status='error'>
                                    <AlertIcon />
                                    {message}
                                </Alert>
                            </div> : Array.isArray(review) && review.length >= 0 ? <div>
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
                            </div> : <Empty message={"No reviews found"} />}</>}
                        {success == true && <div className="text-center mb-4">
                            <button className="btn btn-primary d-none" type="button">
                                <FaSpinner className="ci-reload me-2" />
                                Load more reviews
                            </button>
                        </div>}
                    </div>
                    {/* Leave review form*/}
                    {userState.success &&

                        <Formik
                            initialValues={initialValues}
                            validationSchema={reviewSchema}
                            onSubmit={handleSubmit}
                        >

                            {({
                                values,
                                errors,
                                touched
                            }) => (
                                <Form className="needs-validation" noValidate="">
                                    <div className="mt-2 pt-4 mt-md-0 pt-md-0">
                                        <div className="bg-secondary border border-1 py-grid-gutter px-grid-gutter rounded-3">
                                            <h3 className="h4 pb-2">Write a review</h3>


                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="review-rating">
                                                        Rating<span className="text-danger">*</span>
                                                    </label>
                                                    <Field
                                                       as={Select}
                                                        className="form-select"
                                                        name="rating"
                                                        id="review-rating"
                                                    >
                                                        <option value={5}>5 stars</option>
                                                        <option value={4}>4 stars</option>
                                                        <option value={3}>3 stars</option>
                                                        <option value={2}>2 stars</option>
                                                        <option value={1}>1 star</option>
                                                    </Field>
                                                    {errors.rating && touched.rating && <label className='text-danger mt-2 small'>
                                                        <ErrorMessage name="rating" />
                                                    </label>}
                                                    <div className="mb-4 mt-4">
                                                        <label className="form-label" htmlFor="review-cons">
                                                            Review<span className="text-danger">*</span>
                                                        </label>
                                                        <Field
                                                            as={Textarea}
                                                            name="comment"
                                                            className="form-control"
                                                            rows={2}
                                                            placeholder="Your review"
                                                            id="review-cons"
                                                            defaultValue={""}
                                                        />
                                                        {errors.comment && touched.comment && <label className='text-danger mt-2 small'>
                                                            <ErrorMessage name="comment" />
                                                        </label>}
                                                    </div>
                                                    <Button
                                                        className="btn btn-primary btn-shadow d-block w-100"
                                                        type="submit"
                                                    >
                                                        Submit a Review
                                                    </Button>
                                           
                                        </div>
                                    </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductReview