// 05-05-2023 Athul Vinod

import React, { useEffect, useState } from 'react';
import { FaPen, FaSpinner, FaStar, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllReview } from '../../app/review/reviewAction';
import Loader from '../Loader/Loader';
import Empty from '../Feedback/EmptyReview'
import { Alert, AlertIcon, Button, Select, Textarea, useDisclosure } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { addReview } from '../../app/review/addReviewAction';
import StarRatingComponent from 'react-star-rating-component';
import { format } from 'timeago.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { deleteReview } from '../../app/review/deleteReviewAction';
import { fetchSingleReview } from '../../app/review/singleReviewAction';
import { editReviewSchema } from '../../validation/editReviewSchema';
import { reviewSchema } from '../../validation/reviewSchema';
import { updateReview } from '../../app/review/updateReviewAction';
import { Link } from 'wouter';



function ProductReview({ id, reviewState }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [openEdit, setOpenEdit] = useState(false);
    const { loading, success } = useSelector(state => state.removeReview)
    const dispatch = useDispatch();
    const addState = useSelector(state => state.addReview);
    const userState = useSelector(state => state.user);
    const singleReviewState = useSelector(state => state.singleReview);
    const updateState = useSelector(state => state.updateReview)
    const [count, setCount] = useState(1);


    useEffect(() => {
        if (addState.loading == false) {
            dispatch(fetchAllReview({ id: id }));
        }
    }, [count, dispatch, id, loading, addState.loading, updateState.loading]);

    const initialValues = {
        rating: 1,
        comment: "",
        product: id,
    };
    const initialValues2 = {
        rating: singleReviewState.success ? singleReviewState.review.rating : "",
        comment: singleReviewState.success ? singleReviewState.review.comment : "",
        product: id,
    };
    const handleSubmit = (values) => {
        dispatch(addReview({ token: JSON.parse(localStorage.getItem('token')), data: values }));
        dispatch(fetchAllReview({ id: id }));
        setCount((prevCount) => prevCount + 1);
    };

    function handleDelete() {
        dispatch(deleteReview({ token: JSON.parse(localStorage.getItem('token')), product: id }));
        dispatch(fetchAllReview({ id: id }));
        setCount((prevCount) => prevCount + 1);
    }

    function fetchSingleReviewAction() {
        dispatch(fetchSingleReview({ token: JSON.parse(localStorage.getItem('token')), product: id }));
    }

    const handleUpdate = (values) => {
        dispatch(updateReview({ token: JSON.parse(localStorage.getItem('token')), data: values }));
        dispatch(fetchAllReview({ id: id }));
        setCount((prevCount) => prevCount + 1);
    };


    return (
        <div>
            {/* Reviews tab*/}
            <div>
                <div className="row py-4">
                    {/* Reviews list*/}
                    <div>
                        {reviewState.loading ? <Loader /> : <>
                            {reviewState.error ? <div className='mb-4'>
                                <Alert variant={"left-accent"} status='error'>
                                    <AlertIcon />
                                    {reviewState.message}
                                </Alert>
                            </div> : Array.isArray(reviewState.reviews) && reviewState.reviews.length >= 1 ? <div>
                                {/* Review*/}
                                {reviewState.reviews.map(e => {

                                    return (
                                        <div className="product-review pb-4 mb-4 border-bottom container" key={e.id}>
                                            <div className="d-flex mb-3">
                                                <div className="d-flex align-items-center me-4 pe-2">

                                                    <div>
                                                        <h6 className="fs-sm mb-0 text-capitalize">{e?.user?.name}</h6>
                                                        <span className="fs-ms text-muted">{format(e?.created_at)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="star-rating">
                                                        <StarRatingComponent
                                                            name={"rating"}
                                                            value={e?.rating}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between flex-wrap">
                                                <div>
                                                    <p className="fs-md mb-2">
                                                        {e.comment}
                                                    </p>
                                                </div>
                                                <div>
                                                    {userState.success && userState.user !== undefined && userState.user !== null && userState.user.id == e.user_id &&
                                                        <Button leftIcon={<FaPen />} colorScheme="yellow" variant={"solid"} size={"xs"} onClick={() => { setOpenEdit(true); fetchSingleReviewAction() }} mr={"4"} isLoading={singleReviewState.loading}>
                                                            Edit Review
                                                        </Button>
                                                    }
                                                    {userState.success && userState.user !== undefined && userState.user !== null && userState.user.id == e.user_id &&
                                                        <Button leftIcon={<FaTrash />} colorScheme="red" variant={"solid"} size={"xs"} onClick={onOpen}>
                                                            Delete Review
                                                        </Button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> : <Empty message={"No reviews found"} />}</>}
                    </div>
                    {/* Leave review form*/}
                    {userState.success ?

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
                                                    className="btn btn-primary btn-shadow text-center d-block"
                                                    type="submit"
                                                    isLoading={addState.loading}
                                                >
                                                    Submit a Review
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik> : <h2 className='text-center fs-5 fw-bold'>Please <Link to='/login' className='text-primary text-decoration-underline'>Login</Link> to add review</h2>
                    }
                </div>
            </div>


            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Danger</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure want to delete this review?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleDelete} isLoading={loading}>Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={openEdit} onClose={() => { setOpenEdit(!openEdit) }} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit review</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues2}
                            validationSchema={editReviewSchema}
                            onSubmit={handleUpdate}
                        >
                            {({
                                values,
                                errors,
                                touched
                            }) => (
                                <Form className="needs-validation" noValidate="">
                                    <div>
                                        <div className="rounded-3">

                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="review-rating">
                                                    Rating<span className="text-danger">*</span>
                                                </label>
                                                <Field
                                                    as={Select}
                                                    className="form-select"
                                                    name="rating"
                                                    id="review-rating"
                                                    defaultValue={singleReviewState.review.rating}
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
                                                        defaultValue={singleReviewState.review.comment}
                                                    />
                                                    {errors.comment && touched.comment && <label className='text-danger mt-2 small'>
                                                        <ErrorMessage name="comment" />
                                                    </label>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <ModalFooter>
                                        <Button colorScheme='red' mr={3} onClick={() => { setOpenEdit(!openEdit) }}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme="green" type="submit" isLoading={updateState.loading}>Update review</Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </div>
    )
}

export default ProductReview