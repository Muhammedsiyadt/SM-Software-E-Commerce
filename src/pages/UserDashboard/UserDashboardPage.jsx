import React from 'react'
import ProtectedPage from '../../layouts/ProtectedRoute';
import SidebarLayout from '../../layouts/SidebarLayout';
import { Helmet } from 'react-helmet';
import ShopOpenIllustratorImage from '../../assets/images/other/shop.jpg';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

function UserDashboardPage() {
  const cartState = useSelector(state => state.cart)
  const wishlistState = useSelector(state => state.wishList)
  return (
    <ProtectedPage>
      <Helmet>
        <title> {process.env.REACT_APP_PRODUCT_NAME} - Dashboard </title>
      </Helmet>
      <SidebarLayout>


        <div className="row">
          <div className="col-xl-4  col-sm-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{wishlistState.loading ? <Loader /> : wishlistState.items.length}</h3>
                      <span>Wishlist Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-sm-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>{cartState.loading ? <Loader /> : cartState.items.length}</h3>
                      <span>Cart Items</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-sm-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="media d-flex">
                    <div className="align-self-center">
                      <i className="icon-pencil primary font-large-2 float-left" />
                    </div>
                    <div className="media-body text-right">
                      <h3>0</h3>
                      <span>Purchases</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>


        <div className="row justify-content-center d-none d-xl-flex d-lg-flex">
          <div className="col-md-6">
            <img src={ShopOpenIllustratorImage} alt="image" className='img-fluid' />
          </div>
        </div>



      </SidebarLayout>
    </ProtectedPage>
  )
}

export default UserDashboardPage