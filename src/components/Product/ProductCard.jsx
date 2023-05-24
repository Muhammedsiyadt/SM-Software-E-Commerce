// 04-05-2023 Athul Vinod

import { Button, Skeleton, Tooltip, useToast } from '@chakra-ui/react'
import React from 'react'
import { FaCheck, FaEye, FaHeart, FaShoppingBasket, FaStar, FaStarAndCrescent } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'wouter'
import { addAllCart } from '../../app/Cart/addCartAction'
import { addWishlist } from '../../app/Wishlist/addListAction'


function ProductCard({ name, category, original_price, selling_price, image, id, stock, v, featured }) {

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)



  function addToCart() {
    dispatch(addAllCart({ token: JSON.parse(localStorage.getItem("token")), quantity: 1, product: v }))
  }

  function addToWishList() {
    dispatch(addWishlist({ token: JSON.parse(localStorage.getItem("token")), product: v }))
  }

  return (
    <div className="card product-card">
      {featured == 0 ? null : <Tooltip label="Featured Item" hasArrow>
        <span className="badge float-right fs-6 bg-success">

          <FaStar />
        </span>
      </Tooltip>}
      <div className='card_icons  d-flex flex-column'>
        <Tooltip label="Add to wishlist" hasArrow>
          {userState.success == true ? <button
            className="btn-wishlist btn-sm"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            aria-label="Add to wishlist"
            data-bs-original-title="Add to wishlist"
            onClick={addToWishList}
          >


            <FaHeart className="ci-heart" />

          </button> : <button
            className="btn-wishlist btn-sm mt-3"
          >
            <Link to='/login'>
              <FaHeart className="ci-heart" />
            </Link>
          </button>}

        </Tooltip>
        <Tooltip label="Add to cart" hasArrow>


          {
            stock <= 0 ? <button
              className="btn-wishlist btn-sm mt-3 disabled"
              type="button"
              disabled

            >
              <FaShoppingBasket className="ci-cart fs-sm " />
            </button> :
              userState.success == true ?
                <button
                  className="btn-wishlist btn-sm mt-3"
                  type="button"
                  onClick={addToCart}

                >
                  <FaShoppingBasket className="ci-cart fs-sm" />

                </button> :
                <button
                  className="btn-wishlist btn-sm mt-3"
                >
                  <Link to='/login'>
                    <FaShoppingBasket className="ci-cart fs-sm" />
                  </Link>
                </button>
          }

        </Tooltip>

        <Tooltip label="View item" hasArrow>
          <button
            className="btn-wishlist btn-sm mt-3"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            aria-label="Add to wishlist"
            data-bs-original-title="Add to wishlist"
          >
            <Link to={`/product/${id}`}>
            <FaEye className="ci-heart" />
            </Link>
          </button>
        </Tooltip>

      </div>

      <Link
        className="card-img-top d-block overflow-hidden"
        to={`/product/${id}`}
      >
        {image !== null && image !== "" ?
          <figure className="snip1205">
            <img src={image} alt={name} />
          </figure>
          : <Skeleton height='100' />}
      </Link>
      <div className="card-body p-0">

        {
          stock <= 0 ? <Button
            className="btn btn-primary btn-sm d-block w-100 border_less disabled"
            type="button"
            disabled
            size={"sm"}
          >
            Out Of Stock
          </Button> : userState.success == true ? <Button
            className="btn btn-primary btn-sm d-block w-100 border_less"
            type="button"
            onClick={addToCart}
            size={"sm"}
          >
            <FaShoppingBasket className="ci-cart fs-sm me-1" />
            Add to Cart
          </Button> : <Link
            className="btn btn-primary btn-sm d-block w-100 border_less"
            to='/login'
            size={"sm"}
          >
            <FaShoppingBasket className="ci-cart fs-sm me-1" />
            Add to Cart
          </Link>
        }

        <div className="p-3 card_footer_background_color product_card_footer">



          <a className="product-meta d-block fs-xs pb-1" href="#">
            {category}
          </a>
          <Tooltip label={name} hasArrow>
            <h3 className="product-title fs-sm fw-bolder text-truncate text-capitalize">
              <Link to={`/product/${id}`} >
                {name}
              </Link>
            </h3>
          </Tooltip>

          <div className="d-flex justify-content-between">
            <div className="product-price">


              {selling_price !== 0 ? <>
                <span className="text-muted text-decoration-line-through fw-semibold">
                  <>₹{original_price}</>
                </span>
                {" "}
                <span className="text-primary fw-semibold">
                  ₹{selling_price}
                </span>
              </>
                : <span className="text-primary fw-semibold">₹{original_price}</span>}

            </div>

            <div className="star-rating">
              <FaStar className="star-rating-icon ci-star-filled active" />
              <FaStar className="star-rating-icon ci-star-filled active" />
              <FaStar className="star-rating-icon ci-star-filled active" />
              <FaStar className="star-rating-icon ci-star-filled active" />
              <FaStar className="star-rating-icon ci-star" />
            </div>

            <button className='btn p-0 btn-primary d-none'>
              Buy Now
            </button>


          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard