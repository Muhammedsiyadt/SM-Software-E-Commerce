// 06-05-2023 Athul Vinod


import React from 'react';
import CheckoutForm from '../../components/Checkout/CheckoutForm';
import { Helmet } from 'react-helmet';
import Banner from '../../components/Checkout/Banner';
import ProtectedLayout from '../../layouts/ProtectedRoute';

function CheckOutPage() {
    return (
        <ProtectedLayout>
            <Helmet>
                <title>{process.env.REACT_APP_PRODUCT_NAME} - Checkout</title>
            </Helmet>
           <Banner />
            <div className="mt-5 mb-5 container">
                <CheckoutForm />
            </div>
        </ProtectedLayout>
    )
}

export default CheckOutPage