import { Alert, AlertIcon, Button, IconButton, Input, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { profileSchema } from '../../validation/profileSchema';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import profileUpdateSlice from '../../app/Profile/profileUpdateSlice';
import { updateProfile } from '../../app/Profile/profileUpdateAction';
import { userAction } from '../../app/auth/userAction';


function Profile() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const { user, loader, success, error, message } = useSelector(state => state.user);
    const updateState = useSelector(state => state.updateProfile)

    const initialValues = {
        name: success ? user.name : "",
        email: success ? user.email : "",
        phone: success ? user.phone : "",
        passwordConfirmation: "",
        password: "",
    }

    const handleSubmit = (values, { resetForm }) => {
        const payload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
            password_confirmation: values.passwordConfirmation,
            password: values.password
        }
        dispatch(updateProfile({ token: JSON.parse(localStorage.getItem("token")), data: payload }));
    };



    return (
        <section>

            {loader ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched
                    }) => (
                        <Form>

                            <div className="row gx-4 gy-3">
                                <div className="col-sm-12">
                                    <label className="form-label" htmlFor="account-fn">
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-fn"
                                        defaultValue={user?.name}
                                        name="name"
                                    />

                                    {errors.name && touched.name && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="name" />
                                    </label>}

                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-email">
                                        Email Address <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="email"
                                        id="account-email"
                                        defaultValue={user?.email}
                                        name="email"
                                    />
                                    {errors.email && touched.email && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="email" />
                                    </label>}
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-phone">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-phone"
                                        defaultValue={user?.phone}
                                        required=""
                                        name="phone"
                                    />
                                    {errors.phone && touched.phone && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="phone" />
                                    </label>}
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-pass">
                                        New Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="password-toggle">
                                        <InputGroup>
                                            <Field as={Input} name="password" focusBorderColor='brand.400' className="form-control" type={`${password ? 'text' : 'password'}`} id="account-pass" />
                                            <InputRightElement children={<IconButton onClick={(e) => { setPassword(!password) }}>
                                                {password ? <FaEye /> : <FaEyeSlash />}
                                            </IconButton>} />
                                        </InputGroup>

                                        {errors.password && touched.password && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="password" /> </label>}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-confirm-pass">
                                        Confirm Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="password-toggle">
                                        <InputGroup>
                                            <Field as={Input} name="passwordConfirmation" focusBorderColor='brand.400' className="form-control" type={`${confirmPassword ? 'text' : 'password'}`} id="account-pass" />
                                            <InputRightElement children={<IconButton onClick={(e) => { setConfirmPassword(!confirmPassword) }}>
                                                {confirmPassword ? <FaEye /> : <FaEyeSlash />}
                                            </IconButton>} />
                                        </InputGroup>
                                        {errors.passwordConfirmation && touched.passwordConfirmation && <label className='text-danger mt-2 small'>
                                            <ErrorMessage name="passwordConfirmation" /> </label>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                                        <Button className="btn btn-primary mt-3 mt-sm-0" type="submit" isLoading={updateState.loading} >
                                            Update profile
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>}
            </>}
        </section>

    )
}

export default Profile