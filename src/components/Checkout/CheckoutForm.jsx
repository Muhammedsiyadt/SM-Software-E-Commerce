// 06-05-2023 Athul Vinod



import { Alert, AlertIcon, Button, Center, Input, Text, Textarea, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { contactSchema } from '../../validation/checkoutSchema';
import { useSelector } from 'react-redux';
import { Link } from 'wouter';
import { FaArrowRight } from 'react-icons/fa';
import { Loader } from 'react-bootstrap-typeahead';


function CheckoutForm() {

    const cartState = useSelector(state => state.cart);


    const initialValues = {
        name: "",
        email: "",
        phone: "",
        address: "",
    }

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <div className="border border-1 shadow-lg rounded-3 overflow-hidden">
            <div className="row">
                {/* Content*/}
                <section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
                    <div className="pt-2 px-4 pe-lg-0 ps-xl-5">
                        {/* Title*/}
                        <h2 className="h6 border-bottom pb-3 mb-3">Billing details</h2>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={contactSchema}
                            onSubmit={handleSubmit}

                        >
                            {/* Billing detail*/}

                            {({
                                values,
                                errors,
                                touched
                            }) => (

                                <Form className="row pb-4 gx-4 gy-3">
                                    <div className="col-sm-6">
                                        <label className="form-label" htmlFor="mc-fn">
                                            First name <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as={Input}
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            defaultValue=""
                                            id="mc-fn"
                                            focusBorderColor={"brand.400"}
                                        />

                                        {errors.name && touched.name && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="name" />
                                        </label>}

                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label" htmlFor="mc-ln">
                                            Phone number <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as={Input}
                                            className="form-control"
                                            type="text"
                                            defaultValue=""
                                            id="mc-ln"
                                            name="phone"
                                            focusBorderColor={"brand.400"}
                                        />

                                        {errors.phone && touched.phone && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="phone" />
                                        </label>}


                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="mc-email">
                                            Email address <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as={Input}
                                            className="form-control"
                                            type="email"
                                            defaultValue=""
                                            name="email"
                                            id="mc-email"
                                            focusBorderColor={"brand.400"}
                                        />

                                        {errors.email && touched.email && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="email" />
                                        </label>}

                                    </div>
                                    <div className="col-sm-12">
                                        <label className="form-label" htmlFor="mc-company">
                                            Address  <span className="text-danger">*</span>
                                        </label>
                                        <Field
                                            as={Textarea}
                                            focusBorderColor={"brand.400"}
                                            type="text"
                                            defaultValue=""
                                            name="address"

                                        />

                                        {errors.address && touched.address && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="address" />
                                        </label>}

                                    </div>

                                    <button className="btn btn-primary">
                                        Pay With Card
                                    </button>

                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
                {/* Sidebar*/}
                <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5 " style={{ borderRadius: 0 }}>
                    <div className="bg-white   p-4 h-100 checkout_form" >
                        {cartState.loading ? <Center mt={"24"}>
                            <Loader />
                        </Center> : <>
                            {cartState.error ? <Alert variant={"left-accent"} status='error'>
                                <AlertIcon />
                                {cartState.message}
                            </Alert> : <>
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
                                                                    <Tooltip label={e?.product[0].name} hasArrow>
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
                                                                        {parseFloat(e?.product[0].offer_price) !== 0 ?

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
                                                                        if (parseFloat(e?.offer_price) !== 0) {
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
                                </div>
                            </>}
                        </>}
                    </div>
                </aside>
            </div>
        </div>

    )
}

export default CheckoutForm