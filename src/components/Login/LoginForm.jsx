import React, { useEffect } from 'react';
import Logo from '../../assets/images/icons/sm-online-logo-01.png'
import { Button, Input, useToast } from '@chakra-ui/react';
import { Link } from 'wouter';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { loginSchema } from '../../validation/loginSchema';
import ImageBanner from '../../assets/images/other/banner.png'
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../app/auth/loginAction';
import { socialAction } from '../../app/auth/socialAuthAction';
import { FaGoogle, FaFacebook } from 'react-icons/fa'


function LoginForm() {
    const toast = useToast()
    const dispatch = useDispatch();
    const { loading, success, token, error, message } = useSelector(state => state.login);
    const socialState = useSelector(state => state.socialAuth);

    // Facebook Login

    const responseFacebook = (response) => {
        console.log(response);
    }

    const clintId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    // Google Login

    const onSuccess = async (res) => {
        const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
        const params = {
            access_token: res.access_token,
        };

        try {
            const response = await axios.get(googleApiUrl + '?' + new URLSearchParams(params), {
                headers: {
                    'Authorization': 'Bearer ' + res.access_token
                }
            });

            // Process the response data and prepare payload
            const payload = {
                email: response.data.email,
                name: response.data.given_name + " " + response.data.family_name,
                password: response.data.email + response.data.given_name + response.data.family_name,
                type: "social"
            };

            const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");

            if (cartItems.length > 0) {
                payload.cart_items = cartItems.map(item => ({ item, quantity: 1 }));
                payload.offline = true;
            }
         
            // Dispatch the action with the payload
            dispatch(socialAction({ data: payload }));
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            });
        }
    };


    const onError = (err) => {
        toast({
            title: 'Error',
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top-right"
        })
    }

    const responseGoogle = useGoogleLogin({ onSuccess, onError, clintId })

    const initialValues = {
        email: '',
        password: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");

        if (cartItems.length > 0) {
            values.cart_items = cartItems.map(item => ({ item, quantity: 1 }))
            values.offline = true;
        }

        dispatch(loginAction(values));
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



    useEffect(() => {
        if (socialState.error == true) {
            toast({
                title: 'Error',
                description: socialState.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
        }
    }, [socialState.error])

    useEffect(() => {
        if (socialState.success && socialState.token !== null && socialState.token !== undefined && socialState.token !== "") {
            localStorage.setItem("token", JSON.stringify(socialState.token))
            localStorage.removeItem("cart_items")
            window.location.href = "/cart"
        }
    }, [socialState.success , socialState.loading])


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
                                            validationSchema={loginSchema}
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
                                                        Sign into your account
                                                    </h5>
                                                    <div className="form-outline mb-4">
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
                                                    <div className="form-outline mb-4">
                                                        <div className='d-flex justify-content-between'>
                                                            <label className="form-label">
                                                                Password <span className="text-danger">*</span>
                                                            </label>
                                                            <Link className="small text-muted mb-2 d-block" to='/forgot-password'>
                                                                Forgot password?
                                                            </Link>
                                                        </div>
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
                                                    <div className="pt-1 mb-4">
                                                        <Button
                                                            className="btn btn-primary btn-lg btn-block"
                                                            type="submit"
                                                            isLoading={loading}
                                                        >
                                                            Login
                                                        </Button>


                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        <div className="d-flex gap-2 mb-4 flex-wrap align-items-center">
                                            <Button onClick={() => responseGoogle()} colorScheme="red">
                                                <FaGoogle />
                                            </Button>
                                            <FacebookLogin
                                                appId={process.env.REACT_APP_FACEBOOK_ID}
                                                fields="name,email"
                                                redirectUri='http://localhost:3000/cart'
                                                callback={responseFacebook}
                                                render={renderProps => (
                                                    <Button onClick={renderProps.onClick} colorScheme="facebook" >
                                                        <FaFacebook />
                                                    </Button>
                                                )}
                                            />

                                        </div>

                                        <p className="mb-2 mt-2 pb-lg-2" style={{ color: "#393f81" }}>
                                            Don't have an account?{" "}
                                            <Link to='/register' className='text-primary'>
                                                Register here
                                            </Link>
                                        </p>
                                        <Link to="/terms-of-use" className="small text-muted">
                                            Terms of use.
                                        </Link>
                                        <Link to="/privacy-policy" className="small text-muted">
                                            Privacy policy
                                        </Link>
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

export default LoginForm