// 08-05-2023 Athul Vinod



import { Alert, AlertIcon, Button, Divider, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { contactSchema } from '../../validation/contactSchema';
import { useDispatch, useSelector } from 'react-redux';
import { contactAction } from '../../app/Contact/contactAction';



function ContactForm() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const { loading, message, error, success } = useSelector(state => state.contact)

    const initialValues = {
        name: user?.name ? user.name : '',
        email: user?.email ? user.email : '',
        phone: user?.phone ? user.phone : '',
        subject: "",
        message: "",
    }

    const handleSubmit = (values, { resetForm }) => {
        if (success) {
            resetForm();
        }
        dispatch(contactAction({ data: values }))
    };

    return (
        <div>
      
              {success &&  <Alert status='success'>
                        <AlertIcon />
                        {message}
                    </Alert>}


            <section className="container-fluid pt-grid-gutter">


                <div className="row justify-content-center">

                    <div className="col-xl-3 col-sm-6 mb-grid-gutter">
                   
                        <div className="card h-100">

                            
                            <div className="card-body text-center">
                                <FaPhone className="ci-phone h3 mt-2 mb-4 text-primary" />
                                <h3 className="h6 mb-3">Phone numbers</h3>
                                <ul className="list-unstyled fs-sm mb-0">
                                    <li>
                                        <span className="text-muted me-1">For customers:</span>
                                        <a className="nav-link-style" href="tel:+04936225967">
                                            +04936-225967
                                        </a>
                                    </li>
                                    <li className="mb-0">
                                        <span className="text-muted me-1">Tech support:</span>
                                        <a className="nav-link-style" href="tel:+9447004343">
                                            +9447004343
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 mb-grid-gutter">
                        <div className="card h-100">
                            <div className="card-body text-center">
                                <FaEnvelope className="ci-mail h3 mt-2 mb-4 text-primary" />
                                <h3 className="h6 mb-3">Email addresses</h3>
                                <ul className="list-unstyled fs-sm mb-0">
                                    <li>
                                        <span className="text-muted me-1">For customers:</span>
                                        <a className="nav-link-style" href="mailto:+cc@smsoft.co.in">
                                            cc@smsoft.co.in
                                        </a>
                                    </li>
                                    <li className="mb-0">
                                        <span className="text-muted me-1">Tech support:</span>
                                        <a className="nav-link-style" href="mailto:+info@smsoft.co.in">
                                            info@smsoft.co.in
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-fluid">
                <div className="row g-0 justify-content-center">
                    <div className="col-lg-6 px-4 px-xl-5 py-5 shadow mb-5 mt-5">
                        <h2 className="h4 mb-4">Drop us a line</h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={contactSchema}
                            onSubmit={handleSubmit}
                        >

                            {({
                                values,
                                errors,
                                touched
                            }) => (
                                <Form className="needs-validation mb-3" noValidate="">
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label className="form-label" htmlFor="cf-name">
                                                Your name:&nbsp;<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as={Input}
                                                className="form-control"
                                                type="text"
                                                id="cf-name"
                                                placeholder="John Doe"
                                                focusBorderColor='brand.400'
                                                name="name"
                                                required=""
                                            />

                                            {errors.name && touched.name && <label className='text-danger mt-2 small'>
                                                <ErrorMessage name="name" />
                                            </label>}
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label" htmlFor="cf-email">
                                                Email address:&nbsp;<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as={Input}
                                                className="form-control"
                                                type="email"
                                                id="cf-email"
                                                placeholder="johndoe@email.com"
                                                focusBorderColor='brand.400'
                                                name="email"
                                                required=""
                                            />

                                            {errors.email && touched.email && <label className='text-danger mt-2 small'>
                                                <ErrorMessage name="email" />
                                            </label>}
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label" htmlFor="cf-phone">
                                                Your phone:&nbsp;<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as={Input}
                                                className="form-control"
                                                type="text"
                                                id="cf-phone"
                                                placeholder="+1 (212) 00 000 000"
                                                focusBorderColor='brand.400'
                                                required=""
                                                name="phone"
                                            />

                                            {errors.phone && touched.phone && <label className='text-danger mt-2 small'>
                                                <ErrorMessage name="phone" />
                                            </label>}
                                        </div>
                                        <div className="col-sm-6">
                                            <label className="form-label" htmlFor="cf-subject">
                                                Subject:  <span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as={Input}
                                                className="form-control"
                                                type="text"
                                                id="cf-subject"
                                                focusBorderColor='brand.400'
                                                name="subject"
                                                placeholder="Provide short title of your request"
                                            />


                                            {errors.subject && touched.subject && <label className='text-danger mt-2 small'>
                                                <ErrorMessage name="subject" />
                                            </label>}

                                        </div>
                                        <div className="col-12">
                                            <label className="form-label" htmlFor="cf-message">
                                                Message:&nbsp;<span className="text-danger">*</span>
                                            </label>
                                            <Field
                                                as={Textarea}
                                                className="form-control"
                                                id="cf-message"
                                                rows={6}
                                                placeholder="Please describe in detail your request"
                                                required=""
                                                focusBorderColor='brand.400'
                                                name="message"

                                            />
                                            {errors.message && touched.message && <label className='text-danger mt-2 small d-block'>
                                                <ErrorMessage name="message" />
                                            </label>}
                                            <Button className="btn btn-primary mt-4" type="submit" isLoading={loading}>
                                                Send message
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContactForm