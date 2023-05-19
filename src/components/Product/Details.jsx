// 05-05-2023 Athul Vinod

import { Alert, AlertIcon, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import ProductInfo from './ProductInfo'
import ProductReview from './ProductReview'
import SimilarProducts from './SimilarProducts'
import Loader from '../Loader/Loader'


function Details({ loading, error, message, product }) {



    return (
        <div className="container mt-5 mb-5">
            {loading ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <>
                    <div className="border shadow-lg rounded-3">
                        {/* Tabs*/}

                        <Tabs size={"lg"} isFitted>
                            <TabList color={"brand.500"} >
                                <Tab className='fw-semibold'>General Info</Tab>
                                <Tab className='fw-semibold' >Reviews</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <ProductInfo product={product} />
                                </TabPanel>
                                <TabPanel>
                                    <ProductReview />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                    <SimilarProducts slug={product.category !== undefined && product.category.length >= 1 && product.category[0].slug} />
                </>}
            </>}
        </div>

    )
}

export default Details