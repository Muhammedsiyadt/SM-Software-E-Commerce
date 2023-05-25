// 08-05-2023 Athul Vinod




import React from 'react'
import { Helmet } from 'react-helmet'
import Banner from '../../components/Privacy/Banner'
import PrivacyList from '../../components/Privacy/PrivacyList'
import DefaultLayout from '../../layouts/DefaultRoute';
import StaticRoute from '../../layouts/StaticRoute';

function PrivacyPage() {
    return (
        <StaticRoute>
            <Helmet>
                <title> {process.env.REACT_APP_PRODUCT_NAME} - Privacy Policy</title>
            </Helmet>
            <Banner />


            <div className='container mt-5 mb-5'>
                <PrivacyList />
            </div>

        </StaticRoute>
    )
}

export default PrivacyPage