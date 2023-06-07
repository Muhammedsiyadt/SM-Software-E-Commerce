import React, { useEffect } from 'react';
import Logo from '../../assets/images/icons/sm-online-logo-01.png'
import { Button, Input, useToast } from '@chakra-ui/react';
import { Link } from 'wouter';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { registerSchema } from '../../validation/registerSchema';
import ImageBanner from '../../assets/images/other/banner.png'
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../app/auth/registerAction';
import { v4 as uuidv4 } from 'uuid';


function RegisterForm() {

    const toast = useToast();

    const dispatch = useDispatch();
    const { loading, success, token, error, message } = useSelector(state => state.register);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        phone: '',
        confirm_password: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");

        if (cartItems.length > 0) {
            values.cart_items = cartItems.map(item => ({ item, quantity: 1 }))
            values.offline = true;
        }
        dispatch(registerAction(values))


    };

    useEffect(() => {
        if (error == true) {
            toast({
                title: 'Error',
                description: message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
        }
    }, [error])

    useEffect(() => {
        if (success == true && token !== null && token !== undefined && token !== "") {
            localStorage.setItem("token", JSON.stringify(token))
            localStorage.removeItem("cart_items")
            window.location.href = "/cart"
        }
    }, [success, loading])

    return (
        <section className="vh-100" style={{ backgroundColor: "#e5f5ff" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src={ImageBanner}
                                        alt="login form"
                                        className="img-fluid h-100"
                                        style={{ borderRadius: "1rem 0 0 1rem" }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={registerSchema}
                                            onSubmit={handleSubmit}
                                        >
                                            {({
                                                values,
                                                errors,
                                                touched
                                            }) => (
                                                <Form>
                                                    <div className="d-flex align-items-center mb-3 pb-1">
                                                        <i
                                                            className="fas fa-cubes fa-2x me-3"
                                                            style={{ color: "#ff6219" }}
                                                        />

                                                        <img src={Logo} alt="logo" width="80" />

                                                    </div>
                                                    <h5
                                                        className="fw-normal mb-3 pb-3"
                                                        style={{ letterSpacing: 1 }}
                                                    >
                                                        Create a new account
                                                    </h5>
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" >
                                                            Name <span className="text-danger">*</span>
                                                        </label>
                                                        <Field
                                                            as={Input}
                                                            focusBorderColor='brand.400'
                                                            type="text"
                                                            name='name'
                                                            id='name'
                                                            className="form-control form-control-lg"
                                                        />
                                                        {errors.name && touched.name && <label className='text-danger mt-2 small'>
                                                            <ErrorMessage name="name" />
                                                        </label>}
                                                    </div>
                                                    <div className="form-outline mb-4">

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <label className="form-label" >
                                                                    Email address <span className="text-danger">*</span>
                                                                </label>
                                                                <Field
                                                                    as={Input}
                                                                    focusBorderColor='brand.400'
                                                                    type="email"
                                                                    name='email'
                                                                    id='email'
                                                                    className="form-control form-control-lg"
                                                                />
                                                                {errors.email && touched.email && <label className='text-danger mt-2 small'>
                                                                    <ErrorMessage name="email" />
                                                                </label>}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label className="form-label" >
                                                                    Phone number <span className="text-danger">*</span>
                                                                </label>
                                                                <Field
                                                                    as={Input}
                                                                    focusBorderColor='brand.400'
                                                                    type="text"
                                                                    name='phone'
                                                                    id='phone'
                                                                    className="form-control form-control-lg"
                                                                />
                                                                {errors.phone && touched.phone && <label className='text-danger mt-2 small'>
                                                                    <ErrorMessage name="phone" />
                                                                </label>}
                                                            </div>
                                                        </div>


                                                    </div>
                                                    <div className="form-outline mb-4">

                                                        <label className="form-label">
                                                            Password <span className="text-danger">*</span>
                                                        </label>


                                                        <Field
                                                            as={Input}
                                                            focusBorderColor='brand.400'
                                                            type="password"
                                                            name='password'
                                                            id='password'
                                                            className="form-control form-control-lg"
                                                        />
                                                        {errors.password && touched.password && <label className='text-danger mt-2 small'>
                                                            <ErrorMessage name="password" />
                                                        </label>}

                                                    </div>

                                                    <div className="form-outline mb-4">

                                                        <label className="form-label">
                                                            Password confirmation <span className="text-danger">*</span>
                                                        </label>


                                                        <Field
                                                            as={Input}
                                                            focusBorderColor='brand.400'
                                                            type="password"
                                                            name='confirm_password'
                                                            className="form-control form-control-lg"
                                                        />
                                                        {errors.confirm_password && touched.confirm_password && <label className='text-danger mt-2 small'>
                                                            <ErrorMessage name="confirm_password" />
                                                        </label>}

                                                    </div>


                                                    <div className="pt-1 mb-4">
                                                        <Button
                                                            className="btn btn-primary btn-lg btn-block"
                                                            type="submit"
                                                            isLoading={loading}
                                                        >
                                                            Register
                                                        </Button>
                                                    </div>

                                                    <p className="mb-2 mt-2 pb-lg-2" style={{ color: "#393f81" }}>
                                                        Already have an account?{" "}
                                                        <Link to='/login' className='text-primary'>
                                                            Login here
                                                        </Link>
                                                    </p>
                                                    <Link to="/terms-of-use" className="small text-muted">
                                                        Terms of use.
                                                    </Link>
                                                    <Link to="/privacy-policy" className="small text-muted">
                                                        Privacy policy
                                                    </Link>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default RegisterForm