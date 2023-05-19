// 06-05-2023 Athul Vinod



import { Input, Textarea } from '@chakra-ui/react'
import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { contactSchema } from '../../validation/checkoutSchema';

function CheckoutForm() {



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
                        {/* Order preview on mobile (screens small than 991px)*/}
                        <div className="widget mb-3 d-lg-none">
                            <h2 className="widget-title">Order summary</h2>
                            <div className="d-flex align-items-center pb-2 border-bottom">
                                <a
                                    className="d-block flex-shrink-0 me-2"
                                    href="marketplace-single.html"
                                >
                                </a>
                                <div className="ps-1">
                                    <h6 className="widget-product-title">
                                        <a href="marketplace-single.html">UI Isometric Devices Pack</a>
                                    </h6>
                                    <div className="widget-product-meta">
                                        <span className="text-accent border-end pe-2 me-2">
                                            $23.<small>99</small>
                                        </span>
                                        <span className="fs-xs text-muted">Standard license</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 border-bottom">
                                <a
                                    className="d-block flex-shrink-0 me-2"
                                    href="marketplace-single.html"
                                >
                                </a>
                                <div className="ps-1">
                                    <h6 className="widget-product-title">
                                        <a href="marketplace-single.html">Project Devices Showcase</a>
                                    </h6>
                                    <div className="widget-product-meta">
                                        <span className="text-accent border-end pe-2 me-2">
                                            $18.<small>99</small>
                                        </span>
                                        <span className="fs-xs text-muted">Standard license</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                {/* Sidebar*/}
                {/* Order preview on desktop (screens larger than 991px)*/}
                <aside className="col-lg-4 d-none d-lg-block ps-xl-5">
                    <hr className="d-lg-none" />
                    <div className="p-4 h-100 ms-auto border-start">
                        <div className="widget px-lg-2 py-2 mb-3">
                            <h2 className="widget-title text-center">Order summary</h2>
                            <div className="d-flex align-items-center pb-2 border-bottom">
                                <a
                                    className="d-block flex-shrink-0 me-2"
                                    href="marketplace-single.html"
                                >

                                </a>
                                <div className="ps-1">
                                    <h6 className="widget-product-title">
                                        <a href="marketplace-single.html">Acer Predator</a>
                                    </h6>
                                    <div className="widget-product-meta">
                                        <span className="text-primary border-end pe-2 me-2">
                                            $23.<small>00</small>
                                        </span>
                                        <span className="fs-xs text-muted">Laptop</span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center py-2 border-bottom">
                                <a
                                    className="d-block flex-shrink-0 me-2"
                                    href="marketplace-single.html"
                                >
                                </a>
                                <div className="ps-1">
                                    <h6 className="widget-product-title">
                                        <a href="marketplace-single.html">CCTV</a>
                                    </h6>
                                    <div className="widget-product-meta">
                                        <span className="text-primary border-end pe-2 me-2">
                                            $18.<small>00</small>
                                        </span>
                                        <span className="fs-xs text-muted">Electronics</span>
                                    </div>
                                </div>
                            </div>
                            <ul className="list-unstyled fs-sm pt-3 pb-2 border-bottom">
                                <li className="d-flex justify-content-between align-items-center">
                                    <span className="me-2">Subtotal:</span>
                                    <span className="text-end">
                                        $56.<small>00</small>
                                    </span>
                                </li>
                            </ul>
                            <h3 className="fw-normal text-center my-4">
                                $65.<small>30</small>
                            </h3>
                        </div>
                    </div>
                </aside>
            </div>
        </div>

    )
}

export default CheckoutForm