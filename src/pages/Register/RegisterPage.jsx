import React from 'react'
import DefaultLayout from '../../layouts/DefaultRoute';
import { Helmet } from 'react-helmet';
import RegisterForm from '../../components/Register/RegisterForm';

function RegisterPage() {
  return (

    <>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Register </title>
      </Helmet>
      <RegisterForm />

    </>
  )
}

export default RegisterPage