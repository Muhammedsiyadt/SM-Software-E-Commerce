// 06-05-2023 Athul Vinod



import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa'
import { Link } from 'wouter'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import EmptyCart from '../Feedback/EmptyCart'
import { Alert, AlertIcon, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Tooltip } from '@chakra-ui/react'
import CartVerdict from './cartVerdict'
import { fetchOfflineCart } from '../../app/OfflineCart/OfflineCartAction'
import OfflineCartVerdict from './OfflineCartVerdict'
import { toast } from 'react-toastify'
import { increment } from '../../app/count'




function OfflineCartItems() {

    const dispatch = useDispatch();
    const { loading, success, user } = useSelector(state => state.user)
    const cartState = useSelector(state => state.offlineCart);
    const updateCartState = useSelector(state => state.updateCart);

    const [count, setCount] = useState(1)


    useEffect(() => {
        const cartItems = localStorage.getItem("cart_items");
        if (cartItems !== undefined) {
          try {
            dispatch(fetchOfflineCart({ products: JSON.parse(cartItems) }));
          } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
          }
        } else {
          return;
        }
      }, [count, dispatch]);
      



    function deleteCartItem(id) {
        // Retrieve the array from localStorage
        const storedArray = localStorage.getItem('cart_items');

        // Parse the retrieved data into an array
        const array = JSON.parse(storedArray) || [];

        // Specify the item you want to remove
        const itemToRemove = id;

        // Remove the item from the array
        const modifiedArray = array.filter(item => item !== itemToRemove);

        // Store the modified array back in localStorage
        localStorage.setItem('cart_items', JSON.stringify(modifiedArray));

        setCount((prevKey) => prevKey + 1);
        dispatch(fetchOfflineCart({ products: JSON.parse(localStorage.getItem("cart_items") || []) }));
        const storedCartItems = localStorage.getItem('cart_items');
        const cartItemsLength = storedCartItems ? JSON.parse(storedCartItems).length : 0;
    
        dispatch(increment(cartItemsLength))
    
        toast.success("Item removed from cart successfully");
    }




    return (
        <div className="container pb-5 mb-2 mb-md-4">
            {cartState.loading ? <Loader /> : <>
                {cartState.error ? <Alert variant={"left-accent"} status='error'>
                    <AlertIcon />
                    {cartState.message}
                </Alert> : <>
                    {Array.isArray(cartState.items) && cartState.items.length >= 1 ? <div className="row">
                        {/* List of items*/}
                        <section className="col-lg-8">

                            {cartState.items.map((e, index) => {
                                return (
                                    <div key={e?.slug}>
                                        {/* Item*/}
                                        <div className="d-sm-flex justify-content-between align-items-center my-2 pb-3 border-bottom">
                                            <div className="d-block d-sm-flex align-items-center text-sm-start">
                                                <Link
                                                    className="d-inline-block flex-shrink-0 mx-auto me-sm-4"
                                                    to={`/product/${e?.slug}`}
                                                >
                                                    <img src={`${process.env.REACT_APP_BASE_URL}/media/product/${e?.thumbnail}`} width={130} alt="Product" />
                                                </Link>
                                                <div className="pt-2 ">
                                                    <Tooltip label={e.name} hasArrow>
                                                        <Text wordBreak={2} noOfLines={4} maxWidth={600} fontWeight={500} className="product-title fs-base mb-2 text-capitalize ">
                                                            <Link to={`/product/${e?.slug}`}>{e.name}</Link>
                                                        </Text>
                                                    </Tooltip>
                                                    <div className="fs-lg text-primary pt-2">

                                                        {parseFloat(e?.offer_price) !== 0 ?
                                                            <div className="h3 fw-normal text-primary mb-3 me-1">
                                                                <div className="d-flex flex-wrap">
                                                                    <div className="h3 fw-normal text-primary mb-3 me-1">
                                                                        ₹{e?.offer_price}
                                                                    </div>
                                                                </div>

                                                            </div> :
                                                            <div className="h3 fw-normal text-primary mb-3 me-1">₹{
                                                                e?.unit_price
                                                            }</div>}

                                                    </div>
                                                </div>

                                            </div>
                                            <div
                                                className="pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-start"
                                                style={{ maxWidth: "9rem" }}
                                            >

                                                <button className="btn btn-link mt-2 px-0 text-danger" type="button" onClick={() => { deleteCartItem(e?.slug) }}>
                                                    <FaTimes className="ci-close-circle me-2" />
                                                    <span className="fs-sm">Remove</span>
                                                </button>




                                            </div>
                                        </div>
                                    </div>
                                )
                            })}


                        </section>
                        {/* Sidebar*/}
                        <OfflineCartVerdict cartState={cartState} key={count} />
                    </div > : <EmptyCart message={"Your cart is empty"} />}
                </>}
            </>}
        </div >

    )
}

export default OfflineCartItems