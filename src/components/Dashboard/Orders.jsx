import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../../app/Orders/OrdersAction';
import Loader from '../Loader/Loader'
import { Alert, AlertIcon, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Link } from 'wouter';
import { cancelOrder } from '../../app/Orders/CencelAction';

function Orders() {
    const [id , setId] = useState(null); 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const { loading, success, empty, error, message, orders } = useSelector(state => state.orders);
    const cancelState = useSelector(state => state.cancelOrder);
    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(fetchAllOrders({ token: JSON.parse(localStorage.getItem('token')) }));
    }, [count , cancelState.loading])


    function handleCancel(id) {
         onOpen();
         setId(id);
    }


    function handleReq(){
        dispatch(cancelOrder({token: JSON.parse(localStorage.getItem('token')) , id: id}));
        dispatch(fetchAllOrders({ token: JSON.parse(localStorage.getItem('token')) }));
        setCount((prevCount) => prevCount + 1);
    }

    function statusFormatter(cell, row) {
        if (cell == "pending") {
            return (
                <span className='text-capitalize badge bg-primary fs-md '>
                    {cell}
                </span>
            );
        }
        else if (cell == "cancelled") {
            return (
                <span className='text-capitalize badge bg-danger fs-md '>
                    {cell}
                </span>
            );
        }
        else if (cell == "processing") {
            return (
                <span className='text-capitalize badge bg-warning fs-md '>
                    {cell}
                </span>
            );
        }
        else if (cell == "completed") {
            return (
                <span className='text-capitalize badge bg-success fs-md '>
                    {cell}
                </span>
            );
        }

        return (
            <span>{cell}</span>
        );
    }


    const columns = [{
        dataField: 'order_number',
        text: 'Order ID',
        sort: true,
    }, {
        dataField: 'order_date',
        text: 'Purchase date',
        sort: true
    }, {
        dataField: 'status',
        text: 'Status',
        sort: true,
        formatter: statusFormatter,

    },

    {
        dataField: 'total_amount',
        text: 'Total amount',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <span>₹{row.total_amount}</span>
            </div>
        ),
    },

    {
        text: 'Actions',
        formatter: (cell, row, rowIndex, extraData) => (
            <div>

                <Button colorScheme='red' size='sm' isDisabled={row.status === 'cancelled' || row.status === 'success'} onClick={() => {handleCancel(row.order_number)}}>
                    Cancel Order
                </Button>
            </div>
        ),
    },


    ];


  
 


    const expandRow = {
        renderer: row => (
            <div>
                <>
                    {row.orderItems.map((e, index) => {
                        return (
                            <div className="d-sm-flex justify-content-between my-4 pb-3 border-bottom" key={index}>
                                <div className="d-sm-flex text-center text-sm-start">
                                    <a
                                        className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                        href="shop-single-v1.html"
                                    >
                                        <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${e?.thumbnail}`} width={160} alt={e?.name} />
                                    </a>
                                    <div className="pt-2">
                                        <div className="d-flex">
                                            <Tooltip label={e?.name} hasArrow>
                                                <Text className="widget-product-title w-50">
                                                    <Link
                                                        className="d-block flex-shrink-0 me-2 text-capitalize"
                                                        to={`/product/${e?.slug}`}
                                                    >{e?.name}</Link>
                                                </Text>
                                            </Tooltip>
                                            <span className="d-block flex-shrink-0 me-2 fw-bold text-primary  text-capitalize" style={{ fontSize: "14px" }}>
                                                x{e?.quantity}
                                            </span>
                                        </div>

                                        <div className="fs-lg text-primary fw-medium pt-2 d-flex gap-1 align-items-center">
                                            ₹{
                                                e?.price
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </>
            </div>
        ),

    };

    return (

        <div>

            {loading ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <>
                    <div className="table-responsive fs-md mb-4">
                        <BootstrapTable
                            keyField='order_number'
                            bootstrap4
                            data={orders}
                            columns={columns}
                            expandRow={expandRow}
                            striped
                            hover
                            filter={filterFactory()}
                        />

                    </div>


                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Danger</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure want to cancel this order?
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='red' mr={3} onClick={onClose}>
                                    No
                                </Button>
                                <Button colorScheme="green" onClick={() => { handleReq() }} isLoading={cancelState.loading}>Yes</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>}


            </>}

        </div>

    )
}

export default Orders