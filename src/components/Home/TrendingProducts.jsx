// 04-05-2023 Athul Vinod

import React, { useEffect } from 'react'
import { FaArrowRight, FaEye, FaHeart, FaShoppingBasket, FaStar } from 'react-icons/fa'
import ProductCard from '../Product/ProductCard'
import { Link } from 'wouter'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'react-bootstrap-typeahead'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { fetchAllFeaturedProductsHome } from '../../app/featuredProducts/featuredProductsAction'

function TrendingProducts() {

  const dispatch = useDispatch();
  const { loading, error, success, message, products } = useSelector(state => state.featuredProducts);


  useEffect(() => {
    dispatch(fetchAllFeaturedProductsHome());
  },[])

  return (
    <section className="container pt-md-3 pb-5 mb-md-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <h2 className="h3 pb-2 text-black fw-bold fs-4">Featured Products</h2>
        <Link className="btn btn-link text-primary btn-sm" to='/products'>

          More products
          <FaArrowRight className="ci-eye align-middle me-1" />
        </Link>
      </div>
      <hr className='mb-4' />
      <div className="row pt-4 mx-n2">


        {/* Products grid*/}
        <div className="row mx-n2 gy-3">

          {/* Product*/}

          {
            loading ? <Loader /> : <>
              {error ? <Alert variant={"left-accent"} status='error'>
                <AlertIcon />
                {message}
              </Alert> : <>
                {
                  Array.isArray(products) === true && products?.length >= 1 ? products?.map((e) => {
                    return (

                      <div className="col-md-3 col-sm-6 px-2 mb-4" key={e.slug}>
                        <ProductCard v={e.v} image={`${process.env.REACT_APP_BASE_URL}/media/product/${e.thumbnail}`} featured={e.featured} stock={e.stock} id={e.slug} name={e.name} category={e.category.name} original_price={e.unit_price} selling_price={e.offer_price} rating_count={4} />
                        <hr className="d-sm-none" />
                      </div>
                    )
                  }) : <h5 className='text-center mt-5 mb-5'>No Products Found</h5>
                }
              </>}
            </>
          }


        </div>





      </div>
      <div className="text-center pt-3">
        <Link className="btn btn-primary" to='/products'>
          More products
          <FaArrowRight className="ci-arrow-right ms-1" />
        </Link>
      </div>
    </section>

  )
}

export default TrendingProducts