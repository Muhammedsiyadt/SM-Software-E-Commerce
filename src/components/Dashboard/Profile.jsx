import { Button, IconButton, Input, InputGroup, InputRightElement, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { profileSchema } from '../../validation/profileSchema';


function Profile() {
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);


    const initialValues = {
        name: "",
        email: "",
        phone: "",
        passwordConfirmation: "",
        password: "",
        address: ""
    }

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <section>

            <Formik
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
                                    defaultValue="Susan"
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
                                    defaultValue="s.gardner@example.com"
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
                                    defaultValue="+7 (805) 348 95 72"
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
                            <div className="col-sm-12">
                                <label className="form-label" htmlFor="account-confirm-pass">
                                    Address <span className="text-danger">*</span>
                                </label>
                                <Field as={Textarea} name="address" focusBorderColor='brand.400' />
                                {errors.address && touched.address && <label className='text-danger mt-2 small'>
                                    <ErrorMessage name="address" /> </label>}
                            </div>
                            <div className="col-12">
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    <Button className="btn btn-primary mt-3 mt-sm-0" type="submit" >
                                        Update profile
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>

    )
}

export default Profile