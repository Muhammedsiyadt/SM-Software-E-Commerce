// 04-05-2023 Athul Vinod

import React from 'react'
import {FaHome} from 'react-icons/fa'
import { Link } from 'wouter'

function Banner() {
  return (
    <div className="breadcrumb_section bg-dark page-title-mini">
  <div className="container pt-5 pb-5">
    {/* STRART CONTAINER */}
    <div className="row align-items-center">
      <div className="col-md-6">
        <div className="page-title">
          <h1 className='text-white'>Products</h1>
        </div>
      </div>
      <div className="col-md-6">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link to="/" className='text-muted'>Home</Link>
          </li>
          <li className="breadcrumb-item text-white active">Products</li>
        </ol>
      </div>
    </div>
  </div>
  {/* END CONTAINER*/}
</div>


  )
}

export default Banner