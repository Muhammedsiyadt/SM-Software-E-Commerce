import { Alert, AlertIcon, Button, IconButton, Input, InputGroup, InputRightElement, Radio, RadioGroup, Select, Stack, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import state from './states'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { addressSchema } from '../../validation/addressSchema';
import { addAddress } from '../../app/Address/addAddressAction';
import { fetchAllAddress, fetchAllStates } from '../../app/Address/addressAction';


function AddressForm() {
    const dispatch = useDispatch();
    const { user, loader, success, error, message } = useSelector(state => state.user);
    const addressState = useSelector(state => state.address)
    const addAddressState = useSelector(state => state.addAddress)
    const removeState = useSelector(state => state.removeAddress)
    const [count, setCount] = useState(1);


    const initialValues = {
        pincode: "",
        locality: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        alternative_phone: "",
        landmark: "",
        name: "",
        address_type: "",
    }

    useEffect(() => {
        dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
        dispatch(fetchAllStates());
    }, [count])

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addAddress({ token: JSON.parse(localStorage.getItem("token")), data: values }))

        if (addAddressState.success) {
            resetForm();

        }
        dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
        setCount((prevCount) => prevCount + 1);
    };

    return (
        <section>

            {loader ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <Formik
                    initialValues={initialValues}
                    validationSchema={addressSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched
                    }) => (
                        <Form>
                            <div className="row gx-4 gy-3">
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-fn">
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-fn"

                                        name="name"
                                    />

                                    {errors.name && touched.name && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="name" />
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

                                        required=""
                                        name="phone"
                                    />
                                    {errors.phone && touched.phone && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="phone" />
                                    </label>}
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-fn">
                                        PinCode <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="number"
                                        id="account-fn"

                                        name="pincode"
                                    />

                                    {errors.pincode && touched.pincode && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="pincode" />
                                    </label>}

                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-phone">
                                        Locality <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-phone"
                                        name="locality"
                                    />
                                    {errors.locality && touched.locality && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="locality" />
                                    </label>}
                                </div>

                                <div className="col-sm-12">
                                    <label className="form-label" htmlFor="account-confirm-pass">
                                        Address (Area and Street) <span className="text-danger">*</span>
                                    </label>
                                    <Field as={Textarea} name="address" focusBorderColor='brand.400' />
                                    {errors.address && touched.address && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="address" /> </label>}
                                </div>


                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-fn">
                                        City/District/Town <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-fn"

                                        name="city"
                                    />

                                    {errors.city && touched.city && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="city" />
                                    </label>}

                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-phone">
                                        State <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                        as={Select}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-phone"
                                        required=""
                                        name="state"
                                    >
                                        <option value="">-- Select --</option>
                                        {addressState.states && addressState.states !== undefined && Array.isArray(addressState.states) && addressState.states.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}

                                    </Field>
                                    {errors.state && touched.state && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="state" />
                                    </label>}
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-fn">
                                        Landmark (Optional)
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-fn"
                                        name="landmark"
                                    />

                                    {errors.landmark && touched.landmark && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="landmark" />
                                    </label>}

                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="account-phone">
                                        Alternative  Phone (Optional)
                                    </label>
                                    <Field
                                        as={Input}
                                        focusBorderColor='brand.400'
                                        className="form-control"
                                        type="text"
                                        id="account-phone"
                                        name="alternative_phone"
                                    />
                                    {errors.alternative_phone && touched.alternative_phone && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="alternative_phone" />
                                    </label>}
                                </div>

                                <div className='mb-2'>
                                    <label className="form-label" htmlFor="account-phone">
                                        Address type <span className="text-danger">*</span>
                                    </label>

                                    <Stack direction='row'>
                                        <label className="form-check">
                                            <Field className="form-check-input" type="radio" name="address_type" value="1" />
                                            Work
                                        </label>
                                        <label className="form-check">
                                            <Field className="form-check-input" type="radio" name="address_type" value="2" />
                                            Home
                                        </label>
                                    </Stack>

                                    {errors.address_type && touched.address_type && <label className='text-danger mt-2 small'>
                                        <ErrorMessage name="address_type" />
                                    </label>}
                                </div>

                                <div className="col-12">
                                    <div className="d-flex flex-wrap justify-content-between align-items-center">

                                    </div>
                                </div>
                            </div>

                            <Button className="btn btn-primary mt-3 mt-sm-0" type="submit" isLoading={addAddressState.loading}>
                                Add Address
                            </Button>


                        </Form>
                    )}
                </Formik>}
            </>}
        </section>

    )
}

export default AddressForm