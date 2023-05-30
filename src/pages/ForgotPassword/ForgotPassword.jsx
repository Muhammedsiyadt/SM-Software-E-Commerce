import React from 'react'
import ProtectedLayout from '../../layouts/ProtectedRoute';
import DefaultLayout from '../../layouts/DefaultRoute';
import { Helmet } from 'react-helmet';
import { Button, Input } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { passwordSchema } from '../../validation/password';
import { useDispatch, useSelector } from 'react-redux';
import { forgotAction } from '../../app/Password/forgotAction';


function ForgotPassword() {
   const dispatch = useDispatch();
    const { success, error, message, loading } = useSelector(state => state.forgotPassword);

    const initialValues = {
        email: '',
    }
    const handleSubmit = (values, { resetForm }) => {
        dispatch(forgotAction({data:values}));
    };

    return (
        <DefaultLayout>
            <Helmet>
                <title>{process.env.REACT_APP_PRODUCT_NAME} - Forgot Password</title>
            </Helmet>
            <div className="container py-4 py-lg-5 my-4">
                <div className="row justify-content-center">
                    {success ? <>
                        <div className="col-lg-8 col-md-10">
                            <h2 className="h3 mb-2 text-success fw-bold">Verify email</h2>
                            <p className="fs-lg">
                                Please confirm your email address to proceed with password reset.

                            </p>
                        </div>
                    </> : <div className="col-lg-8 col-md-10">
                        <h2 className="h3 mb-4">Forgot your password?</h2>
                        <p className="fs-md">
                            Change your password in three easy steps. This helps to keep your new
                            password secure.
                        </p>
                        <ol className="list-unstyled fs-md">
                            <li>
                                <span className="text-primary me-2">1.</span>Fill in your email
                                address below.
                            </li>
                            <li>
                                <span className="text-primary me-2">2.</span>We'll email you a
                                temporary code.
                            </li>
                            <li>
                                <span className="text-primary me-2">3.</span>Use the code to change
                                your password on our secure website.
                            </li>
                        </ol>
                        <div className="card py-2 mt-4">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={passwordSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched
                                }) => (
                                    <Form className="card-body needs-validation" noValidate="">
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="recover-email">
                                                Enter your email address
                                            </label>
                                            <Field
                                                as={Input}
                                                type="email"
                                                id="recover-email"
                                                focusBorderColor='brand.400'
                                                name='email'
                                                required=""
                                            />
                                            {errors.email && touched.email && <label className='text-danger mt-2 small'>
                                                <ErrorMessage name="email" />
                                            </label>}

                                        </div>
                                        <Button className="btn btn-primary" type="submit" isLoading={loading} >
                                            Send mail
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>}
                </div>
            </div>


        </DefaultLayout>
    )
}

export default ForgotPassword