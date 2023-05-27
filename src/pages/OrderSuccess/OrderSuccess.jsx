import React from 'react'
import { Link } from 'wouter'
import ProtectedRoute from '../../layouts/ProtectedRoute'
import { Helmet } from 'react-helmet'
import { FaMap } from 'react-icons/fa'

function OrderSuccess({id}) {
    return (
        <ProtectedRoute>
            <Helmet>
            <title> {process.env.REACT_APP_PRODUCT_NAME} - Success</title>
            </Helmet>
            <div className="container pb-5 mb-sm-4">
            <div className="pt-5">
                <div className="card py-3 mt-sm-3">
                    <div className="card-body text-center">
                        <h2 className="h4 pb-3">Thank you for your order!</h2>
                        <p className="fs-sm mb-2">
                            Your order has been placed and will be processed as soon as possible.
                        </p>
                        <p className="fs-sm mb-2">
                            Make sure you make note of your order number, which is{" "}
                            <span className="fw-medium">{id}.</span>
                        </p>
                        <p className="fs-sm">
                            You will be receiving an email shortly with confirmation of your
                            order. <u>You can now:</u>
                        </p>
                        <Link className="btn btn-secondary mt-3 me-3" to="/products">
                            Go back shopping
                        </Link>
                        <Link className="btn btn-primary mt-3" to='/user/orders'>
                               Track order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </ProtectedRoute>

    )
}

export default OrderSuccess