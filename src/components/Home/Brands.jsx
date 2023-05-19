// 03-05-2023 Athul Vinod

import React, { useEffect } from 'react'
import Intel from '../../assets/images/brands/intel.png'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import { Alert, AlertIcon } from '@chakra-ui/react'
import { fetchAllBrands } from '../../app/Brands/brandsAction'
import { Link } from 'wouter'



function Brands() {


  const { loading, error, success, brands, message } = useSelector(state => state.brands);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBrands());
  }, [])

  return (
    <section className="container py-lg-4 mb-4">
      <h2 className="h3 pb-2 text-black fw-bold fs-4">Shop by brand</h2>
      <hr className='mb-4' />
      {loading ? <Loader /> : <>
        {error ? <Alert variant={"left-accent"} status='error'>
          <AlertIcon />
          {message}
        </Alert> : <>
          <div className="row ">

            {Array.isArray(brands) ? <>
              {brands.map(e => {
                return <div className="col-md-3 col-sm-4 col-6 justify-content-center align-items-center" key={e.v}>
                  <Link
                    to={`/products?brand=${e.slug}`}
                  >
                    <div className="d-flex bg-white brand_card shadow-sm rounded-3 py-3 py-sm-4 mb-grid-gutter align-items-center">
                      <img
                        className="d-block mx-auto"
                        src={`${process.env.REACT_APP_BASE_URL}/media/brand/${e.logo}`}
                        style={{ width: 150 }}
                        alt={e.slug}
                      />
                    </div>
                  </Link>
                </div>
              })}
            </> : null}

          </div>
        </>}
      </>}
    </section>

  )
}

export default Brands