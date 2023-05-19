// 05-05-2023 Athul Vinod

import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'wouter'

function Banner({ name }) {
  return (
    <div className="breadcrumb_section bg-dark page-title-mini">
      <div className="container pt-5 pb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="page-title">
              <h1 className='text-white text-truncate text-uppercase'>{name}</h1>

              <div>
                <div className="star-rating">
                  <FaStar className="star-rating-icon ci-star-filled active" />
                  <FaStar className="star-rating-icon ci-star-filled active" />
                  <FaStar className="star-rating-icon ci-star-filled active" />
                  <FaStar className="star-rating-icon ci-star-filled active" />
                  <FaStar className="star-rating-icon ci-star" />
                </div>
                <span className="d-inline-block fs-sm text-white opacity-70 align-middle mt-1 ms-1">
                  74 Reviews
                </span>
              </div>



            </div>
          </div>
          <div className="col-md-6">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link to="/" className='text-muted'>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/products" className='text-muted'>Products</Link>
              </li>
              <li className="breadcrumb-item text-white active text-truncate w-25 text-uppercase">{name}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Banner