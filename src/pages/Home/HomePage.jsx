// 29-04-2023 Athul Vinod
import React from 'react'
import Banner from '../../components/Home/Banner'
import TrendingProducts from '../../components/Home/TrendingProducts'
import Ad from '../../components/Home/Ad'
import Brands from '../../components/Home/Brands'
import { FaClock, FaDollarSign, FaHeadset, FaIdCard, FaReply, FaRocket, FaTag, FaTruck } from 'react-icons/fa'
import RecommendedPProducts from '../../components/Home/RecommendedPProducts'
import { Helmet } from 'react-helmet'
import BannerCategory from '../../components/Home/BannerCategory'
import DefaultLayout from '../../layouts/DefaultRoute';


function HomePage() {

  return (
    <DefaultLayout>

      {/* Head */}
      <Helmet>
        <title>{process.env.REACT_APP_PRODUCT_NAME} - Home</title>
      </Helmet>

      <Banner />
      <BannerCategory />

      <div className="bg-light p-1 pb-0">
        <div className="container mt-5 mb-5">
          <div className="row pb-3">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaRocket
                  className="ci-rocket text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-dark mb-1">
                    Fast and free delivery
                  </h6>
                  <p className="mb-0 fs-ms text-dark opacity-50">
                    Free delivery for all orders over $200
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaDollarSign
                  className="ci-currency-exchange text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-dark mb-1">Money back guarantee</h6>
                  <p className="mb-0 fs-ms text-dark opacity-50">
                    We return money within 30 days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaHeadset
                  className="ci-support text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-dark mb-1">24/7 customer support</h6>
                  <p className="mb-0 fs-ms text-dark opacity-50">
                    Friendly 24/7 customer support
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="d-flex">
                <FaIdCard
                  className="ci-card text-primary"
                  style={{ fontSize: "2.25rem" }}
                />
                <div className="ps-3">
                  <h6 className="fs-base text-dark mb-1">Secure online payment</h6>
                  <p className="mb-0 fs-ms text-dark opacity-50">
                    We possess SSL / Secure сertificate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <TrendingProducts />
      <RecommendedPProducts />
      <Ad />
      <Brands />

    </DefaultLayout>
  )
}

export default HomePage