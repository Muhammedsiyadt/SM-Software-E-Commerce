// 29-04-2023 Athul Vinod

import { Button, Flex, Input, InputGroup, InputLeftAddon, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Select, Spinner, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FaArrowCircleDown, FaCartPlus, FaHeart, FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'wouter'
import CartCount from './CartCount'
import { Typeahead , AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { toast } from 'react-toastify'
import axiosInstance from '../../utils/axiosInstance'


const CACHE = {};
const PER_PAGE = 50;



async function makeAndHandleRequest(query, page = 1) {
 
  try {
    const res = await axiosInstance.get(`/products?q=${query}&page=${page}`)
    const options = res.data.data.map((i) => ({
      id: i.v,
      login: i.name,
      slug: i.slug
    }));
    return { options, total_count:res?.data?.pagination?.total_pages };
  } catch (error) {
    toast.error(error.message)
  }

}


function BottomNav() {

  const { loading, success, user } = useSelector(state => state.user)
  const cartState = useSelector(state => state.cart)
  const addState = useSelector(state => state.addCart)
  const [count, setCount] = useState(1)

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (addState.success) {
      setCount((prevKey) => prevKey + 1);
    }
  }, [addState])


  function handleLogout() {
    localStorage.clear();
    window.location.href = "/login";
  }



  const handleInputChange = (q) => {
    setQuery(q);
  };

  const handlePagination = (e, shownResults) => {
    const cachedQuery = CACHE[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    setIsLoading(true);

    const page = cachedQuery.page + 1;

    makeAndHandleRequest(query, page).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      CACHE[query] = { ...cachedQuery, options, page };

      setIsLoading(false);
      setOptions(options);
    });
  };

  // `handleInputChange` updates state and triggers a re-render, so
  // use `useCallback` to prevent the debounced search handler from
  // being cancelled.
  const handleSearch = useCallback((q) => {
    if (CACHE[q]) {
      setOptions(CACHE[q].options);
      return;
    }

    setIsLoading(true);
    makeAndHandleRequest(q).then((resp) => {
      CACHE[q] = { ...resp, page: 1 };

      setIsLoading(false);
      setOptions(resp.options);
    });
  }, []);





  return (
    <div className="navbar pt-0 navbar-expand-lg mt-2 navbar-light navbar_dotted_bottom">
      <div className="container">
        <div className="d-lg-flex bottom_nav_input">
        <div className="input-group mt-2">
        <span className="input-group-text">
          <FaSearch />
        </span>

            <AsyncTypeahead
              id="async-pagination-example"
              isLoading={isLoading}
              labelKey="login"
              maxResults={PER_PAGE - 1}
              minLength={2}
              onInputChange={handleInputChange}
              onPaginate={handlePagination}
              onSearch={handleSearch}
              options={options ? options  : []}
              paginate
              placeholder="Search for products...."
              renderMenuItemChildren={(option) => (
                <div key={option.id}>
                  <Link to={`/product/${option.slug}`}>{option.login}</Link>
                </div>
              )}
              useCache={false}
            />
          </div>
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
            href={`${success ? '#' : '/login'}`}
          >
            <div className="navbar-tool-icon-box mr-2">
              <FaUser className="navbar-tool-icon ci-user" />
            </div>

            <div className="ms-n2 fw-semibold">
              {loading == true ? <Spinner size={"xs"} /> : success == true ? <Menu>
                <MenuButton as={Button} variant={"unstyled"} color={"gray.600"}>
                  {user.name}
                </MenuButton>
                <MenuList>
                  <Link to='/user/dashboard'><MenuItem>
                    Dashboard
                  </MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogout} color={"red.400"}>Logout</MenuItem>
                </MenuList>
              </Menu> : <Text as={"span"} color={"gray.600"}>My Account</Text>}
            </div>
          </Link>
          <CartCount cartState={cartState} key={count} />
        </div>
      </div>
    </div>


  )
}

export default BottomNav