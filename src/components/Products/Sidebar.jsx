import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBrands } from '../../app/Brands/brandsAction';
import { fetchAllCat } from '../../app/category/catAction';
import { fetchAllProducts } from '../../app/Products/productsAction';


function Sidebar({ setMin , setMax , setFilter, filter, filter1, setFilter1, accessories, setAccessories, setCategories, setBrand }) {


    const dispatch = useDispatch();
    const { brand_loading, error, message, brands } = useSelector(state => state.brands)
    const { cat_loading, cat_error, cat_message, cat } = useSelector(state => state.cat)
    const [state, setState] = useState("")

    useEffect(() => {
        dispatch(fetchAllBrands());
        dispatch(fetchAllCat());
    }, [])

    const handleClick = (event) => {
        const { name, checked, id } = event.target;

        if (checked) {
            setBrand(prevBrands => [...prevBrands, event.target.value])
            setState(id)

        }
        else {
            setBrand(prevValues => prevValues.filter(item => item !== event.target.value))
        }

    };

    const handleClickCat = (event) => {
        const { name, checked, id } = event.target;

        if (checked) {
            setCategories(prevCat => [...prevCat, event.target.value])
            setState(id)

        }
        else {
            setCategories(prevValues => prevValues.filter(item => item !== event.target.value))
        }

    };


    return (
        <div
            className={`offcanvas offcanvas-collapse bg-white w-100 rounded-3 shadow-lg py-1 border border-1 ${filter && 'show'}`}
            id="shop-sidebar"
            style={{ maxWidth: "22rem" }}
        >
            <div className="offcanvas-header align-items-center shadow-sm">
                <h2 className="h5 mb-0">Filters</h2>
                <button
                    className="btn-close ms-auto"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => { setFilter(!filter) }}
                />
            </div>
            <div className="offcanvas-body py-grid-gutter px-lg-grid-gutter ">
                {/* Categories*/}
                <div className="widget widget-categories mb-4 pb-4 border-bottom">
                    <h3 className="widget-title">Filter</h3>
                    <div className="accordion mt-n1" id="shop-categories">
                        {/* Shoes*/}
                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"

                                    role="button"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"

                                    onClick={() => { setFilter1(!filter1) }}
                                >
                                    Brands
                                </button>
                            </h3>
                            <div
                                className={`accordion-collapse collapse ${filter1 && 'show'}`}
                                data-bs-parent="#shop-categories"
                            >
                                <div className="accordion-body">
                                    <div className="widget widget-links widget-filter">
                                        <ul
                                            className="widget-list widget-filter-list pt-1"

                                            data-simplebar="init"
                                            data-simplebar-auto-hide="false"
                                        >
                                            <div
                                                className="simplebar-wrapper"
                                                style={{ margin: "-4px -16px 0px 0px" }}
                                            >
                                                <div className="simplebar-height-auto-observer-wrapper">
                                                    <div className="simplebar-height-auto-observer" />
                                                </div>
                                                <div className="simplebar-mask">
                                                    <div
                                                        className="simplebar-offset"
                                                        style={{ right: 0, bottom: 0 }}
                                                    >
                                                        <div
                                                            className="simplebar-content-wrapper"
                                                            tabIndex={0}
                                                            role="region"
                                                            aria-label="scrollable content"
                                                            style={{ height: "auto", overflow: "hidden" }}
                                                        >
                                                            <div
                                                                className="simplebar-content"
                                                                style={{ padding: "4px 16px 0px 0px" }}
                                                            >


                                                                {brand_loading ? "Loading...." : <>
                                                                    {Array.isArray(brands) ? brands.map(e => {
                                                                        return (
                                                                            <li className="widget-list-item widget-filter-item" key={e.v}>
                                                                                <a
                                                                                    className="widget-list-link d-flex justify-content-between align-items-center"
                                                                                    href="#"
                                                                                >
                                                                                    <span className="widget-filter-item-text">
                                                                                        {e.name}
                                                                                    </span>
                                                                                    <span className="fs-xs text-muted ms-3">
                                                                                        <input type="checkbox" className='form-check' id={e.v} name={e.name} value={e.slug} onClick={handleClick} />
                                                                                    </span>
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    }) : <span className=' fs-sm fw-bold'>Empty</span>}
                                                                </>}


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="simplebar-placeholder"
                                                    style={{ width: 0, height: 0 }}
                                                />
                                            </div>
                                            <div
                                                className="simplebar-track simplebar-horizontal"
                                                style={{ visibility: "hidden" }}
                                            >
                                                <div
                                                    className="simplebar-scrollbar simplebar-visible"
                                                    style={{ width: 0, display: "none" }}
                                                />
                                            </div>
                                            <div
                                                className="simplebar-track simplebar-vertical"
                                                style={{ visibility: "hidden" }}
                                            >
                                                <div
                                                    className="simplebar-scrollbar simplebar-visible"
                                                    style={{ height: 0, display: "none" }}
                                                />
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="accordion-item">
                            <h3 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    role="button"
                                    data-bs-toggle="collapse"
                                    aria-expanded="false"
                                    aria-controls="accessories"
                                    onClick={() => { setAccessories(!accessories) }}
                                >
                                    Category
                                </button>
                            </h3>
                            <div
                                className={`accordion-collapse collapse ${accessories && 'show'}`}
                                id="accessories"
                                data-bs-parent="#shop-categories"
                            >
                                <div className="accordion-body">
                                    <div className="widget widget-links">

                                        <ul className="widget-list">
                                            {cat_loading ? "Loading...." : <>
                                                {Array.isArray(cat) ? cat.map(e => {
                                                    return (
                                                        <li className="widget-list-item widget-filter-item" key={e.v}>
                                                            <a
                                                                className="widget-list-link d-flex justify-content-between align-items-center"
                                                                href="#"
                                                            >
                                                                <span className="widget-filter-item-text">
                                                                    {e.name}
                                                                </span>
                                                                <span className="fs-xs text-muted ms-3">
                                                                    <input type="checkbox" className='form-check' value={e.slug} onClick={handleClickCat} />
                                                                </span>
                                                            </a>
                                                        </li>
                                                    )
                                                }) : <span className=' fs-sm fw-bold'>Empty</span>}
                                            </>}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter by Brand*/}
                <div className="widget widget-filter ">
                    <h3 className="widget-title">FIlter By Price</h3>
                    <div className="input-group mb-3">
                        <Input type="number" focusBorderColor='brand.400' className="form-control" placeholder="Min" onChange={(e) => {setMin(e.target.value)}} />
                        <Input type="number" focusBorderColor='brand.400' className="form-control" placeholder="Max" onChange={(e) => {setMax(e.target.value)}} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Sidebar