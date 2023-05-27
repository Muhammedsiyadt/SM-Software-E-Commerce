import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllAddress, fetchAllStates } from '../../app/Address/addressAction';
import Loading from '../Loader/Loader'
import { Alert, AlertIcon, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Textarea, useDisclosure } from '@chakra-ui/react';
import { removeAddress } from '../../app/Address/removeAction';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Loader from '../Loader/Loader';
import { addressSchema } from '../../validation/addressSchema'
import { fetchSingleAddress } from '../../app/Address/singleAddressAction';
import { updateAddress } from '../../app/Address/updateAddressAction';



function AddressList() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();

  const { address, loading, error, message, success } = useSelector(state => state.address);
  const addressStateSingle = useSelector(state => state.singleAddress);
  const addressState = useSelector(state => state.address);
  const userState = useSelector(state => state.user)
  const removeState = useSelector(state => state.user);
  const updateAddressState = useSelector(state => state.updateAddress)
  const singleAddress = useSelector(state => state.singleAddress);
  const [id , setId] = useState(null)
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
    dispatch(fetchAllStates());
  }, [count])

  function handleDelete() {
    dispatch(removeAddress({ token: JSON.parse(localStorage.getItem('token')), id: id }));
    dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
    setCount((prevCount) => prevCount + 1);
  }

  function fetchSingleAddressctions(id) {
    dispatch(fetchSingleAddress({ token: JSON.parse(localStorage.getItem('token')), id: id }));
  }


  const handleSubmit = (values) => {
    dispatch(updateAddress({ token: JSON.parse(localStorage.getItem("token")), data: values }))
    dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
    setCount((prevCount) => prevCount + 1);
  };


  const initialValues = {
    id: singleAddress.success ? singleAddress.address.v : "",
    pincode: singleAddress.success ? singleAddress.address.pincode : "",
    locality: singleAddress.success ? singleAddress.address.locality : "",
    address: singleAddress.success ? singleAddress.address.address : "",
    city: singleAddress.success ? singleAddress.address.city : "",
    state: singleAddress.success ? singleAddress.address.state.v : "",
    phone: singleAddress.success ? singleAddress.address.phone : "",
    alternative_phone: singleAddress.success ? singleAddress.address.alternative_phone : "",
    landmark: singleAddress.success ? singleAddress.address.landmark : "",
    name: singleAddress.success ? singleAddress.address.name : "",
    address_type: singleAddress.success ? singleAddress.address.address_type : "",
  }

  function handleId(id){
    onOpen();
    setId(id)
  }


  return (
    <>
      {loading ? <Loading /> : <>
        {error ? <Alert variant={"left-accent"} status='error'>
          <AlertIcon />
          {message}
        </Alert> : <div className='border'>
          {Array.isArray(address) && address.length > 0 ?
            <div>
              {address && address.filter((e) => e.status == 1).map(e => {
                return <div className='border-1 border-bottom' key={e.v}>
                
                  <div className='p-4'>
                    <label className='badge bg-primary fw-bold'>{e.address_type == 1 ? "Home" : "Work"}</label>
                    <div className="d-flex gap-4 flex-wrap" >
                      <h4 className='mt-2 fs-6'>{userState.success && e.name}</h4>
                      <h4 className='mt-2 fs-6'>
                        {e.phone}
                      </h4>
                    </div>

                    <div className='mt-2'>
                      <p className='fs-5'>
                        {e.address}, {e.locality}, {e.city}, {e.state?.name}
                      </p>
                      <div className='d-flex justify-content-between'>
                        <h6 className='mt-2 fs-6'>
                          {e.pincode}
                        </h6>

                        <Stack direction={['column', 'row']} spacing={3}>
                          <Button leftIcon={<FaTrash />} colorScheme="red" variant={"solid"} size={"xs"} onClick={() => {handleId(e.v)}}>
                            Delete
                          </Button>
                          <Button leftIcon={<FaPen />} colorScheme="yellow" variant={"solid"} size={"xs"} onClick={() => { setOpenEdit(true); fetchSingleAddressctions(e.v) }}>
                            Edit Address
                          </Button>
                        </Stack>
                      </div>
                    </div>

                  </div>


                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Danger</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Are you sure want to delete this address?
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onClose}>
                          Cancel
                        </Button>
                        <Button colorScheme="green" onClick={() => { handleDelete() }} isLoading={removeState.loading}>Delete</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                  <Modal isOpen={openEdit} onClose={() => { setOpenEdit(!openEdit) }} size={"lg"} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Edit address</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {addressStateSingle.loading ? <Loader /> : <>
                          {error ? <Alert variant={"left-accent"} status='error'>
                            <AlertIcon />
                            {addressStateSingle.message}
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
                                      defaultValue={singleAddress?.address?.state.v}
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
                                        <Field className="form-check-input" type="radio" name="address_type" value="1" checked={singleAddress?.address?.address_type == 1} />
                                        Work
                                      </label>
                                      <label className="form-check">
                                        <Field className="form-check-input" type="radio" name="address_type" value="2" checked={singleAddress?.address?.address_type == 2} />
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

                                <Button className="btn mb-4 btn-primary mt-3 mt-sm-0" type="submit" isLoading={updateAddressState.loading}>
                                  Save
                                </Button>


                              </Form>
                            )}
                          </Formik>}
                        </>}
                      </ModalBody>

                    </ModalContent>
                  </Modal>


                </div>
              })}
            </div> : <h6 className='mt-2 fs-6 text-center'>No address available</h6>}
        </div>}
      </>}



    </>
  )
}

export default AddressList