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



function LoginForm() {
    const toast = useToast()
    const dispatch = useDispatch();
    const { loading, success, token, error, message } = useSelector(state => state.login);

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
            })
            console.log(response);
        } catch (error) {
            toast({
                title: 'Error',
                description:error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position:"top-right"
              })
        }
    }

    const onError = (err) => {
        toast({
            title: 'Error',
            description:err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position:"top-right"
          })
    }

    const responseGoogle = useGoogleLogin({ onSuccess, onError, clintId })

    const initialValues = {
        email: '',
        password: '',
    }

    const handleSubmit = (values, { resetForm }) => {
        dispatch(loginAction(values))
    };

    
    useEffect(() => {
        if(error == true){
            console.log(message);
            toast({
                title: 'Error',
                description:message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position:"top-right"
              })
        }
    },[error])

    useEffect(() => {
        if (success && token !== null && token !== undefined) {
            localStorage.setItem("token", JSON.stringify(token))
            window.location.href = "/cart"
        }
    },[success])

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
                                                            <a className="small text-muted mb-2 d-block" href="#!">
                                                                Forgot password?
                                                            </a>
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
                                        <div className="d-flex gap-2 mb-4 flex-wrap">
                                            <button onClick={() => responseGoogle()} className='btn btn-google-auth'>Login with google </button>
                                            <FacebookLogin
                                                appId="1088597931155576"
                                                fields="name,email,picture"

                                                callback={responseFacebook}
                                                render={renderProps => (
                                                    <button onClick={renderProps.onClick} className='btn btn-facebook-auth'>Login with facebook</button>
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