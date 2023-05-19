// 29-04-2023 Athul Vinod

import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import DefaultLayout from '../../layouts/DefaultRoute';
import { Helmet } from 'react-helmet';
import LoginForm from '../../components/Login/LoginForm';


function LoginPage() {



  return (

    <>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Login </title>
      </Helmet>
      <LoginForm />
    </>

  )
}

export default LoginPage