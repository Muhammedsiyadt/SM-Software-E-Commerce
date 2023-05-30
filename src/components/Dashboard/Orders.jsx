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
    const [id, setId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const { loading, success, empty, error, message, orders } = useSelector(state => state.orders);
    const cancelState = useSelector(state => state.cancelOrder);
    const [count, setCount] = useState(1);

    useEffect(() => {
        dispatch(fetchAllOrders({ token: JSON.parse(localStorage.getItem('token')) }));
    }, [count, cancelState.loading])


    function handleCancel(id) {
        onOpen();
        setId(id);
    }


    function handleReq() {
        dispatch(cancelOrder({ token: JSON.parse(localStorage.getItem('token')), id: id }));
        dispatch(fetchAllOrders({ token: JSON.parse(localStorage.getItem('token')) }));
        setCount((prevCount) => prevCount + 1);
        onClose();
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


    function thumbnail(cell, row) {
        return (
            <div>
                <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${row.thumbnail}`} width={130} alt={row?.name} />
            </div>
        )
    }

    function nameFormatter(cell , row){
        return (
               <Tooltip label={row.name} hasArrow>
                <Text noOfLines={1}>{row.name}</Text>
               </Tooltip>
        )
    }


    const columns = [{
        dataField: 'thumbnail',
        text: 'Thumbnail',
        sort: true,
        formatter: thumbnail
    }, {
        dataField: 'name',
        text: 'Name',
        sort: true,
        formatter: nameFormatter
    }, {
        dataField: 'delivery_status',
        text: 'Status',
        sort: true,
        formatter: statusFormatter,

    },

    {
        dataField: 'price',
        text: 'Total amount',
        sort: true,
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <span>₹{row.price}</span>
            </div>
        ),
    },

    {
        text: 'Actions',
        formatter: (cell, row, rowIndex, extraData) => (
            <div>
                <Button colorScheme='red' size='sm' isDisabled={row.delivery_status === 'cancelled' || row.delivery_status === 'completed'} onClick={() => { handleCancel(row.v) }}>
                    Cancel Order
                </Button>
            </div>
        ),
    },


    ];



    return (

        <div>

            { success && loading ? <Loader /> : <>
                {error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {message}
                </Alert> : <>
                    <div className="table-responsive fs-md mb-4">
                        {Array.isArray(orders) &&  orders.length >= 0 ? (
                            <BootstrapTable
                                keyField='order_number'
                                bootstrap4
                                data={orders.flatMap(order => order.orderItems)}
                                columns={columns}
                                striped
                                hover
                                filter={filterFactory()}
                                noDataIndication="Orders is Empty"
                            />
                        ) : (
                            <p className=' fs-6 text-center'>No order items available</p>
                        )}

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