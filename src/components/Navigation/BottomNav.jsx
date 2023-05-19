// 29-04-2023 Athul Vinod

import { Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaCartPlus, FaHeart, FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'wouter'
import CartCount from './CartCount'

function BottomNav() {

  const { loading, success, user } = useSelector(state => state.user)
  const cartState = useSelector(state => state.cart)
  const addState = useSelector(state => state.addCart)
  const [count , setCount] = useState(1)


  useEffect(() => {
    if(addState.success){
      setCount((prevKey) => prevKey + 1);
    }
  },[addState])


  return (
    <div className="navbar pt-0 navbar-expand-lg mt-2 navbar-light navbar_dotted_bottom">
      <div className="container">
        <div className="d-lg-flex bottom_nav_input">
          <InputGroup>
            <InputLeftAddon className='d-none d-lg-flex d-xl-flex' children={<Select variant={"unstyled"}>
              <option value={"all"}>All</option>
              <option value="laptop">Laptop</option>
              <option value="computer">Computers</option>
              <option value="phone">Mobile Phone</option>
              <option value="processor">Processor</option>
            </Select>} />
            <Input type='text' placeholder='Search Products' focusBorderColor='brand.400' />
            <InputRightAddon children={<Button variant={"unstyled"}>Search</Button>} />
          </InputGroup>
        </div>

        <div className="navbar-toolbar d-flex flex-shrink-0 align-items-center">
          <Link className="navbar-tool d-lg-flex" to='/wishlist'>
            <span className="navbar-tool-tooltip">Wishlist</span>
            <div className="navbar-tool-icon-box">
              <FaHeart className="navbar-tool-icon ci-heart" />
            </div>
          </Link>
          <Link
            className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2"
            to='/user/dashboard'
            data-bs-toggle="modal"
          >
            <div className="navbar-tool-icon-box">
              <FaUser className="navbar-tool-icon ci-user" />
            </div>
            <div className="navbar-tool-text ms-n3 fw-semibold">
              {loading == true ? <Spinner size={"xs"} /> : success == true ? <Link to='/user/dashboard/'>{user.name}</Link> : "My Account"}
            </div>
          </Link>
          <CartCount cartState={cartState} key={count} />
        </div>
      </div>
    </div>


  )
}

export default BottomNav