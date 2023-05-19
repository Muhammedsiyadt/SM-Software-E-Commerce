import React from 'react'
import ProtectedPage from '../../layouts/ProtectedRoute';
import SidebarLayout from '../../layouts/SidebarLayout';
import { Helmet } from 'react-helmet';
import Orders from '../../components/Dashboard/Orders';
import Profile from '../../components/Dashboard/Profile';

function UserOrdersPage() {
    return (

        <ProtectedPage>
            <Helmet>
                <title> {process.env.REACT_APP_PRODUCT_NAME} - My Profile </title>
            </Helmet>
            <SidebarLayout>
                <h3 className='mb-4'>Your Profile</h3>
                <Profile />
            </SidebarLayout>
        </ProtectedPage>


    )
}

export default UserOrdersPage