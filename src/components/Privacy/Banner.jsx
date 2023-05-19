// 08-05-2023 Athul Vinod

import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'wouter'

function Banner() {
  return (
    <div className="breadcrumb_section bg-dark page-title-mini">
      <div className="container pt-5 pb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="page-title">
              <h1 className='text-white'>Privacy Policy</h1>
            </div>
          </div>
          <div className="col-md-6">
            <ol className="breadcrumb justify-content-md-end">
              <li className="breadcrumb-item">
                <Link to="/" className='text-muted'>Home</Link>
              </li>
              <li className="breadcrumb-item text-white active">Privacy Policy</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Banner