// 05-05-2023 Athul Vinod

import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'wouter'
import { fetchAllReview } from '../../app/review/reviewAction';
import StarRatingComponent from 'react-star-rating-component';
import { Spinner } from '@chakra-ui/react';

function Banner({ name, loading, error, success, reviews }) {



  const totalRatings = reviews.reduce((total, obj) => {
    const ratingValue = obj.rating;
    return total + ratingValue;
  }, 0);


  const averageRating = totalRatings / reviews.length;


  return (
    <div className="breadcrumb_section bg-dark page-title-mini">
      <div className="container pt-5 pb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="page-title">
              <h1 className='text-white text-truncate text-uppercase'>{name}</h1>



              {loading ? <Spinner size={"xs"} /> : <>
                {error ? <>
                  <StarRatingComponent
                    name={"rating"}
                    value={0}
                  />  <span className="d-inline-block fs-6 ml-2 text-white opacity-70 align-middle mt-1 ms-1">
                    0 Reviews
                  </span>
                </> : <div>
                  <div className="star-rating fs-5" >
                    <StarRatingComponent
                      name={"rating"}
                      value={averageRating}
                    />
                  </div>
                  <span className="d-inline-block fs-6 ml-2 text-white opacity-70 align-middle mt-1 ms-1">
                    {Array.isArray(reviews) ? reviews.length : 0} Reviews
                  </span>
                </div>}
              </>}

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