// 06-05-2023 Athul Vinod



import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, Box, Button, Center, Stack, Text, Tooltip } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'wouter';
import { fetchAllAddress } from '../../app/Address/addressAction';
import Loading from '../Loader/Loader'
import { toast } from 'react-toastify';
import { addOrders } from '../../app/Orders/AddOrderAction';


function CheckoutForm() {
    const dispatch = useDispatch();
    const [location, setLocation] = useLocation();
    const cartState = useSelector(state => state.cart);
    const { user, success, loading, error } = useSelector(state => state.user)
    const addressState = useSelector(state => state.address);
    const orderState = useSelector(state => state.addOrder);
    const [id, setID] = useState(null);


    useEffect(() => {
        dispatch(fetchAllAddress({ token: JSON.parse(localStorage.getItem("token")) }));
    }, [])

    useEffect(() => {
        if (orderState.order && orderState.success === true) {
            setLocation(`/success/${orderState.order}`);
        }
    }, [orderState.success])


    const handleOrderCod = async () => {

        if (id == null) {
            toast.error("Please select a address");
        }

        else {

            let total_amount = await cartState && cartState.items.reduce((total = 0.0, cur) => {
                cur.product.forEach((e) => {
                    if (parseFloat(e?.offer_price) !== 0) {
                        total += parseFloat(e?.offer_price) * cur.quantity;
                    } else {
                        total += parseFloat(e?.unit_price) * cur.quantity;
                    }
                });
                return total;
            }, 0.0)

            const payload = {
                total_amount: total_amount,
                total_item:cartState && cartState.items.length,
                address: id,
                payment: "COD",
                items: cartState && cartState.items.map(e => {
                    return {
                        product_id: e.product[0].id,
                        quantity: e.quantity,
                        sub_total: parseFloat(e?.product[0].offer_price) !== 0 ? e?.product[0].offer_price * e?.quantity : e?.product[0].unit_price * e?.quantity
                    };
                })
            };

            dispatch(addOrders({ token: JSON.parse(localStorage.getItem('token')), data: payload }));
        }

    }

    return (
        <div className="border border-1 shadow-lg rounded-3 overflow-hidden">
            <div className="row">
                {/* Content*/}
                <section className="col-lg-8 pt-2 pt-lg-4 pb-4 mb-3">
                    <div className="pt-2 px-4 pe-lg-0 ps-xl-5">
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton _expanded={{ bg: " #0077c5", color: 'white' }}>

                                        <Box as="span" flex='1' textAlign='left'>
                                            <strong>LOGIN</strong>
                                        </Box>

                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {loading ? <Loading /> : <>
                                        {error ? <Alert variant={"left-accent"} status='error'>
                                            <AlertIcon />
                                            {addressState.message}
                                        </Alert> : <>
                                            <h6 className=' fs-md'>Name: <strong>{success && user?.name}</strong></h6>
                                            <h6 className='fs-md'>Phone: <strong>{success && user?.phone}</strong></h6>
                                        </>}
                                    </>}
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton _expanded={{ bg: " #0077c5", color: 'white' }}>

                                        <Box as="span" flex='1' textAlign='left'>
                                            <strong>Delivery Address</strong>
                                        </Box>

                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <>
                                        {addressState.loading ? <Loading /> : <>
                                            {addressState.error ? <Alert variant={"left-accent"} status='error'>
                                                <AlertIcon />
                                                {addressState.message}
                                            </Alert> : <div className=''>
                                                {Array.isArray(addressState.address) && addressState.address.length > 0 ?
                                                    <div>
                                                        {addressState.address && addressState.address.map((e , index) => {
                                                            return <div className='border-1 border-bottom' key={index}>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="form-check">
                                                                        <input className="form-check-input" type="checkbox" value={e.v} id="flexCheckDefault" onChange={(e) => { setID(e.target.value) }} />
                                                                    </div>
                                                                    <div className='p-4'>
                                                                        <label className='badge bg-primary fw-bold'>{e.address_type == 1 ? "Home" : "Work"}</label>
                                                                        <div className="d-flex gap-4 flex-wrap" >
                                                                            <h4 className='mt-2 fs-6'>{success && e.name}</h4>
                                                                            <h4 className='mt-2 fs-6'>
                                                                                {e.phone}
                                                                            </h4>
                                                                        </div>

                                                                        <div className='mt-2'>
                                                                            <p className='fs-5'>
                                                                                {e.address}, {e.locality}, {e.city}, {e.state?.name}
                                                                            </p>
                                                                            <div className='d-flex justify-content-between'>
                                                                                <h6 className='mt-2 fs-6'>
                                                                                    {e.pincode}
                                                                                </h6>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div> : <h6 className='mt-2 fs-6 text-center'>No address available</h6>}
                                            </div>}
                                        </>}



                                    </>
                                </AccordionPanel>

                                <AccordionItem>
                                    <h2>
                                        <AccordionButton _expanded={{ bg: " #0077c5", color: 'white' }}>

                                            <Box as="span" flex='1' textAlign='left'>
                                                <strong>Order Summery</strong>
                                            </Box>

                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {cartState.loading ? <Loading /> : <>
                                            {error ? <Alert variant={"left-accent"} status='error'>
                                                <AlertIcon />
                                                {cartState.message}
                                            </Alert> : <>
                                                {cartState.items.map((e, index) => {
                                                    return (
                                                        <div className="d-sm-flex justify-content-between my-4 pb-3 border-bottom" key={e.v}>
                                                            <div className="d-sm-flex text-center text-sm-start">
                                                                <a
                                                                    className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                                                    href="shop-single-v1.html"
                                                                >
                                                                    <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${e?.product[0].thumbnail}`} width={160} alt={e?.product[0].name} />
                                                                </a>
                                                                <div className="pt-2">
                                                                    <div className="d-flex">
                                                                        <Tooltip label={e?.product[0].name} hasArrow>
                                                                            <Text noOfLines={1} className="widget-product-title">
                                                                                <Link
                                                                                    className="d-block flex-shrink-0 me-2 text-capitalize"
                                                                                    to={`/product/${e?.product[0].slug}`}
                                                                                >{e?.product[0].name}</Link>
                                                                            </Text>
                                                                        </Tooltip>
                                                                        <span className="d-block flex-shrink-0 me-2 fw-bold text-primary  text-capitalize" style={{ fontSize: "14px" }}>
                                                                            x{e?.quantity}
                                                                        </span>
                                                                    </div>

                                                                    <div className="fs-lg text-primary fw-medium pt-2 d-flex gap-1 align-items-center">
                                                                        ₹{
                                                                            cartState.items.reduce((total = 0.0, cur) => {
                                                                                cur.product.forEach((e) => {
                                                                                    if (parseFloat(e?.offer_price) !== 0) {
                                                                                        total += parseFloat(e?.offer_price) * cur.quantity;
                                                                                    } else {
                                                                                        total += parseFloat(e?.unit_price) * cur.quantity;
                                                                                    }
                                                                                });
                                                                                return total;
                                                                            }, 0.0)
                                                                        }
                                                                        <span className="fs-xs text-muted ml-2 mr-2">|</span>
                                                                        <span className="fs-xs text-muted ml-4">{e?.product[0].brand.name}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}


                                            </>}
                                        </>}
                                    </AccordionPanel>
                                </AccordionItem>

                                <AccordionItem>
                                    <h2>
                                        <AccordionButton _expanded={{ bg: " #0077c5", color: 'white' }}>

                                            <Box as="span" flex='1' textAlign='left'>
                                                <strong>Payment Options</strong>
                                            </Box>

                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <Stack direction={"row"}>
                                            <Button className='btn btn-primary'>
                                                Pay with card
                                            </Button>
                                            <Button className='btn btn-primary' onClick={handleOrderCod} isLoading={orderState.loading}>
                                                Cash on delivery
                                            </Button>
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>

                            </AccordionItem>
                        </Accordion>
                    </div>
                </section>
                {/* Sidebar*/}
                <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5 " style={{ borderRadius: 0 }}>
                    <div className="bg-white   p-4 h-100 checkout_form" >
                        {cartState.loading ? <Center mt={"24"}>
                            <Loading />
                        </Center> : <>
                            {cartState.error ? <Alert variant={"left-accent"} status='error'>
                                <AlertIcon />
                                {cartState.message}
                            </Alert> : <>
                                <div className="py-2 px-xl-2">
                                    <div className=" mb-4 pb-3 ">
                                        <h2 className="h6 mb-3 pb-1">Total Items ({cartState && cartState?.items.length})</h2>
                                        <h3 className="fw-bold text-primary">

                                            <div className=" ml-0 mb-3">
                                                {Array.isArray(cartState.items) && cartState.items.length >= 1 && cartState.items.map((e, index) => {
                                                    return (
                                                        <div className="d-flex mt-2 mb-2 align-items-center pb-2 border-bottom" key={e.v}>
                                                            <Link
                                                                className="d-block flex-shrink-0 me-2"
                                                                to={`/product/${e?.product[0].slug}`}
                                                            >

                                                            </Link>
                                                            <div className="ps-1">
                                                                <div className="d-flex">
                                                                    <Tooltip label={e?.product[0].name} hasArrow>
                                                                        <Text noOfLines={1} className="widget-product-title">
                                                                            <Link
                                                                                className="d-block flex-shrink-0 me-2 text-capitalize"
                                                                                to={`/product/${e?.product[0].slug}`}
                                                                            >{e?.product[0].name}</Link>
                                                                        </Text>
                                                                    </Tooltip>
                                                                    <span className="d-block flex-shrink-0 me-2  text-capitalize" style={{ fontSize: "14px" }}>
                                                                        x{e?.quantity}
                                                                    </span>
                                                                </div>
                                                                <div className="widget-product-meta">
                                                                    <span className="text-primary border-end pe-2 me-2">
                                                                        ₹
                                                                        {parseFloat(e?.product[0].offer_price) !== 0 ?

                                                                            <span>
                                                                                {e?.product[0].offer_price * e?.quantity}
                                                                            </span>
                                                                            :
                                                                            <span>{
                                                                                e?.product[0].unit_price * e?.quantity
                                                                            }</span>}
                                                                    </span>

                                                                    <span className="fs-xs text-muted">{e?.product[0].brand.name}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}

                                                <ul className="list-unstyled fs-sm pt-3 pb-2 border-bottom">
                                                    <li className="d-flex justify-content-between align-items-center">
                                                        <span className="me-2">Subtotal:</span>
                                                        <span className="text-end">
                                                            ₹{
                                                                cartState.items.reduce((total = 0.0, cur) => {
                                                                    cur.product.forEach((e) => {
                                                                        if (parseFloat(e?.offer_price) !== 0) {
                                                                            total += parseFloat(e?.offer_price) * cur.quantity;
                                                                        } else {
                                                                            total += parseFloat(e?.unit_price) * cur.quantity;
                                                                        }
                                                                    });
                                                                    return total;
                                                                }, 0.0)
                                                            }
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </h3>
                                    </div>
                                </div>
                            </>}
                        </>}
                    </div>
                </aside>
            </div>
        </div>

    )
}

export default CheckoutForm