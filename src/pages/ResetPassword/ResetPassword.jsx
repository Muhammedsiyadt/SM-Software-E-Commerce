import React, { useEffect } from 'react'
import ProtectedLayout from '../../layouts/ProtectedRoute';
import DefaultLayout from '../../layouts/DefaultRoute';
import { Helmet } from 'react-helmet';
import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { passwordSchema } from '../../validation/password';
import { useDispatch, useSelector } from 'react-redux';
import { forgotAction } from '../../app/Password/forgotAction';
import { resetSchema } from '../../validation/resetPassword';
import { tokenAction } from '../../app/Password/verifyTokenAction';
import Loader from '../../components/Loader/Loader';
import { resetAction } from '../../app/Password/resetAction';
import { useLocation } from 'wouter';


function ResetPassword() {

    const [location , setLocation] = useLocation();
    // Get the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);


    // Check if a specific query parameter exists
    const hasQueryParameter = queryParams.has('token');

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');

    const dispatch = useDispatch();
    const { success, error, message, loading } = useSelector(state => state.forgotPassword);
    const tokenState = useSelector(state => state.token);
    const resetState = useSelector(state => state.reset);

    const initialValues = {
        password: '',
    }
    const handleSubmit = (values, { resetForm }) => {
        const data = {
            password: values.password,
            email: tokenState.email
        }
        dispatch(resetAction({ data: data }));
    };

    useEffect(() => {
        if (hasQueryParameter && token) {
            dispatch(tokenAction({ token: token  }))
        }
    }, [success])

    useEffect(() => {
        if (hasQueryParameter && token && resetState.success) {
            setLocation('/login')
        }
    }, [resetState.success])

    return (
        <DefaultLayout>
            <Helmet>
                <title>{process.env.REACT_APP_PRODUCT_NAME} - Forgot Password</title>
            </Helmet>
            <div className="container py-4 py-lg-5 my-4">
                <div className="row justify-content-center">
                    {!hasQueryParameter ? <>
                        <div className="col-lg-8 col-md-10">
                            <h2 className="h3 mb-2 text-danger fw-bold">Error</h2>
                            <p className="fs-lg">
                                Please provide your token to reset your password.
                            </p>
                        </div>
                    </> :
                        <>{tokenState.loading ? <Loader /> : <>
                            {tokenState.error && <Alert variant={"left-accent"} status='error'>
                                <AlertIcon />
                                {tokenState.message}
                            </Alert>}
                            {tokenState.success &&
                                <div className="col-lg-8 col-md-10">
                                    <h2 className="h3 mb-4">New password</h2>
                                    <p className="fs-md">
                                        Enter your new password below
                                    </p>
                                    <div className="card py-2 mt-4">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={resetSchema}
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
                                                            Enter your new password
                                                        </label>
                                                        <Field
                                                            as={Input}
                                                            type="password"
                                                            id="recover-email"
                                                            focusBorderColor='brand.400'
                                                            name='password'
                                                            required=""
                                                        />
                                                        {errors.password && touched.password && <label className='text-danger mt-2 small'>
                                                            <ErrorMessage name="password" />
                                                        </label>}

                                                    </div>
                                                    <Button className="btn btn-primary" type="submit" isLoading={loading} >
                                                        Reset Password
                                                    </Button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>}
                        </>} </>

                    }
                </div>
            </div>


        </DefaultLayout>
    )
}

export default ResetPassword