import React from 'react'
import ProtectedPage from '../../layouts/ProtectedRoute';
import SidebarLayout from '../../layouts/SidebarLayout';
import { Helmet } from 'react-helmet';
import Orders from '../../components/Dashboard/Orders';

function UserOrdersPage() {
    return (

        <ProtectedPage>
            <Helmet>
                <title> {process.env.REACT_APP_PRODUCT_NAME} - Orders </title>
            </Helmet>
            <SidebarLayout>
                <h3 className='mb-4'>Your Orders</h3>
                <Orders />
            </SidebarLayout>
        </ProtectedPage>


    )
}

export default UserOrdersPage