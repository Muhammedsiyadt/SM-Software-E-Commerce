import React, { useState } from 'react'
import { FaArrowAltCircleLeft, FaBars, FaHeart, FaHome, FaLandmark, FaLocationArrow, FaShoppingBag, FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Link, useRoute } from 'wouter'

const ActiveLink = props => {
    const [isActive] = useRoute(props.href);
    return (
        <Link {...props}>
            <a className={isActive ? "nav-link-style  d-flex align-items-center px-4 py-3 active " : "nav-link-style  d-flex align-items-center px-4 py-3"}>{props.children}</a>
        </Link>
    );
};

function Sidebar() {
    const {user , loading} = useSelector(state => state.user)
    const [show, setShow] = useState(false);

    function handleLogout(){
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <aside className="col-lg-4 pt-4 pt-lg-0 pe-xl-5">
            <div className="bg-white border rounded-3 shadow-lg pt-1 mb-5 mb-lg-0">
                <div className="d-md-flex justify-content-between align-items-center text-center text-md-start p-4">
                    <div className="d-md-flex align-items-center">
                        <div className="ps-md-3">
                            <h3 className="fs-base mb-0">{user?.name}</h3>
                            <span className="text-primary fs-sm">{user?.email}</span>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary d-lg-none mb-2 mt-3 mt-md-0"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        onClick={(e) => { setShow(!show) }}
                    >
                        <FaBars className="ci-menu me-2" />
                        Account menu
                    </button>
                </div>
                <div className={`d-lg-block collapse ${show == true && 'show'}`} id="account-menu">
                    <div className="bg-secondary px-4 py-3">
                        <h3 className="fs-sm mb-0 text-muted">Dashboard</h3>
                    </div>
                    <ul className="list-unstyled mb-0">

                        <li className="border-bottom mb-0">
                            <ActiveLink
                                className="nav-link-style  d-flex align-items-center px-4 py-3"
                                to='/user/dashboard'
                            >
                                <FaHome className="ci-bag opacity-60 me-2" />
                                Dashboard
                            </ActiveLink>
                        </li>

                        <li className="border-bottom mb-0">
                            <Link
                                className="nav-link-style d-flex align-items-center px-4 py-3"
                                to='/user/orders'
                            >
                                <FaShoppingBag className="ci-bag opacity-60 me-2" />
                                Orders
                            </Link>
                        </li>
                        <li className="border-bottom mb-0">
                            <Link
                                className="nav-link-style d-flex align-items-center px-4 py-3"
                                to='/wishlist'
                            >
                                <FaHeart className="ci-heart opacity-60 me-2" />
                                Wishlist
                            </Link>
                        </li>
                    </ul>
                    <div className="bg-secondary px-4 py-3">
                        <h3 className="fs-sm mb-0 text-muted">Account settings</h3>
                    </div>
                    <ul className="list-unstyled mb-0">
                        <li className="border-bottom mb-0">
                            <ActiveLink
                                className="nav-link-style d-flex align-items-center px-4 py-3"
                                to="/user/profile"
                            >
                                <FaUser className="ci-user opacity-60 me-2" />
                                Profile info
                            </ActiveLink>
                        </li>
                        <li className="border-bottom mb-0">
                            <ActiveLink
                                className="nav-link-style d-flex align-items-center px-4 py-3"
                                to="/user/address"
                            >
                                <FaLandmark className="ci-user opacity-60 me-2" />
                                Manage Address
                            </ActiveLink>
                        </li>
                        <li className="border-top mb-0">
                            <a
                                className="nav-link-style d-flex align-items-center px-4 py-3 text-danger"
                                href="#"
                                onClick={handleLogout}
                            >
                                <FaArrowAltCircleLeft className="ci-sign-out opacity-60 me-2" />
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar