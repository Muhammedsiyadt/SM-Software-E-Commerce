import { Spinner } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'wouter'
import {fetchAllCart} from '../../app/Cart/cartAction'

function CartCount() {
    const dispatch = useDispatch();
    const { loading, success, user } = useSelector(state => state.user)
    const cartState = useSelector(state => state.cart);
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('token'))){
            dispatch(fetchAllCart({ token: JSON.parse(localStorage.getItem('token')), id: user.id }))
        }
    },[])
    return (
        <div className="navbar-tool dropdown ms-3">
            <Link
                className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                to="/cart"
            >
                <span className="navbar-tool-label">{cartState.login == true ? <Spinner size={"xs"} /> : cartState && cartState?.items.length}</span>
                <FaCartPlus className="navbar-tool-icon ci-cart" />
            </Link>

        </div>
    )
}

export default CartCount