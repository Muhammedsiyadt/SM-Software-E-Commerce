// 08-05-2023 Athul Vinod


import React from 'react'
import NotFoundImage from '../assets/images/other/404.jpg'
import { Link } from 'wouter'
import { Helmet } from 'react-helmet'


function NotFound() {
  return (
    <div className='container mt-5 mb-5'>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Page Not Found</title>
      </Helmet>

      <div className="container py-5 mb-lg-3">
        <div className="row justify-content-center pt-lg-4 text-center">
          <div className="col-lg-7 col-md-7 col-sm-9">
            <img
              className="d-block mx-auto mb-5"
              src={NotFoundImage}
              width={340}
              alt="404 Error"
            />
            <h1 className="h3">404 error</h1>
            <h3 className="h5 fw-normal mb-4">
              We can't seem to find the page you are looking for.
            </h3>

            <Link to='/' className='btn btn-primary btn-shadow'>Go Back</Link>

          </div>
        </div>
      </div>










    </div>
  )
}

export default NotFound