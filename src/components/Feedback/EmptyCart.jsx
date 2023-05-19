import React from 'react'
import { Link } from 'wouter'
import cartIllustration from '../../assets/images/other/cart.jpg'

function EmptyCart({message}) {
  return (
    <div className="container-fluid  mt-100">
  <div className="row">
    <div className="col-md-12">
      <div className='d-flex justify-content-center'>
        <div className="cart">
          <div className="col-sm-12 empty-cart-cls text-center">
            <img
              src={cartIllustration}
              width={330}
              height={330}
              className="img-fluid mb-4 mr-3 text-center"
            />
            <h3>
              <strong>{message}</strong>
            </h3>
                        <Link
              to='/products'
              className="btn btn-primary cart-btn-transform m-3"
              data-abc="true"
            >
              continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default EmptyCart