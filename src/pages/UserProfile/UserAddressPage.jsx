import React, { useState } from 'react'
import ProtectedPage from '../../layouts/ProtectedRoute';
import SidebarLayout from '../../layouts/SidebarLayout';
import { Helmet } from 'react-helmet';
import AddressList from '../../components/Dashboard/AddressList';
import { Button, Divider } from '@chakra-ui/react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import AddressForm from '../../components/Dashboard/AddressForm';

function UserAddressPage() {

    const [show , setShow] = useState(false);

    return (

        <ProtectedPage>
            <Helmet>
                <title> {process.env.REACT_APP_PRODUCT_NAME} - My Profile </title>
            </Helmet>
            <SidebarLayout>
            
            <div className="d-flex justify-content-between flex-wrap">
                <div>
                <h3 className='mb-4'>Manage Address</h3>
                </div>
                <div>
                    {show ? <Button onClick={() => {setShow(!show)}} color="red" variant={"link"}  rightIcon={<FaMinus />}>
                     Cancel
                    </Button>: <Button onClick={() => {setShow(!show)}} color="brand.400" variant={"link"}  rightIcon={<FaPlus />}>
                      Add Address
                    </Button>}
                </div>
            </div>


            {show ? <AddressForm /> : null}
          
          <Divider mt="4" mb="4" />
          <AddressList />
            </SidebarLayout>
        </ProtectedPage>


    )
}

export default UserAddressPage