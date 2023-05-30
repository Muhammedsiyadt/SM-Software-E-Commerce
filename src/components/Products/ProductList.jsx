import React, { useEffect, useState } from 'react'
import ProductCard from '../Product/ProductCard'
import { FaArrowLeft, FaArrowRight, FaFilter } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../app/Products/productsAction';
import Loader from '../Loader/Loader';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { Alert, AlertIcon } from '@chakra-ui/react';
import EmptyProducts from '../Feedback/EmptyProducts'

function ProductList() {

    const queryParams = new URLSearchParams(window.location.search);


    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("asc");
    const [brand, setBrand] = useState(queryParams.get("brand") ? [queryParams.get("brand")] : []);

    const [categories, setCategories] = useState(queryParams.get("category") ? [queryParams.get("category")] : []);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);


    const dispatch = useDispatch();
    const { error, loading, success, products, message } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts({ page, brand, categories, min, max, sort }));
    }, [page, brand, categories, min, max, sort])


    const [filter1, setFilter1] = useState(false);
    const [accessories, setAccessories] = useState(false);
    const [filter, setFilter] = useState(false);

    return (
        <div className="container pb-5 mb-2 mb-md-4 mt-5">
            <div className="row">
                {/* Sidebar*/}
                <aside className="col-lg-4">
                    {/* Sidebar*/}
                    <Sidebar setMax={setMax} setMin={setMin} setCategories={setCategories} setBrand={setBrand} setFilter={setFilter} filter={filter} setAccessories={setAccessories} accessories={accessories} filter1={filter1} setFilter1={setFilter1} />
                </aside>
                <div className="col-lg-8">
                    {loading ? <Loader /> : <>
                        {error ? <Alert variant={"left-accent"} status='error'>
                            <AlertIcon />
                            {message}
                        </Alert>
                            : <>

                                {/* Content  */}
                                <section>
                                    {/* Toolbar*/}

                                    <div className="d-flex justify-content-center justify-content-sm-between align-items-center pt-2 pb-4 pb-sm-5">
                                        <div className="d-flex flex-wrap">
                                            <div className="d-flex align-items-center flex-nowrap me-3 me-sm-4 pb-3">
                                                <label
                                                    className="opacity-75 text-nowrap fs-sm me-2 d-none d-sm-block"
                                                    htmlFor="sorting"
                                                >
                                                    Sort by:
                                                </label>
                                                <select className="form-select" id="sorting" onChange={(e) => { setSort(e.target.value) }} defaultValue={sort}>
                                                    <option value={"asc"}>A - Z Order</option>
                                                    <option value={"desc"}>Z - A Order</option>
                                                    <option value="featured">Featured</option>
                                                </select>

                                            </div>
                                        </div>

                                        <div className="d-sm-flex pb-3">
                                            <button
                                                className="btn btn-icon nav-link-style bg-light text-dark  opacity-100 me-2 d-block d-sm-block d-lg-none"
                                                onClick={() => { setFilter(!filter) }}
                                            >
                                                <FaFilter className="ci-view-grid" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* Products grid*/}
                                    <div className="row mx-n2 gy-3">


                                        {Array.isArray(products?.data) === true && products?.data.length >= 1 ? products?.data?.map((e) => {
                                            return (

                                                <div className="col-md-4 col-sm-6 px-2 mb-5" key={e.slug}>
                                                    <ProductCard v={e.v} reviews={e.rating} image={`${process.env.REACT_APP_BASE_URL}/media/product/${e.thumbnail}`} featured={e.featured} stock={e.stock} id={e.slug} name={e.name} category={e.category.name} original_price={e.unit_price} selling_price={e.offer_price} rating_count={4} />
                                                    <hr className="d-sm-none" />
                                                </div>
                                            )
                                        }) : <EmptyProducts />}



                                    </div>

                                    <hr className="my-3" />

                                    <ResponsivePagination
                                        current={products?.meta?.pagination?.current_page}
                                        total={products?.meta?.pagination?.total_pages}
                                        onPageChange={(e) => { setPage(e) }}
                                    />

                                </section>
                            </>}
                    </>}
                </div>

            </div>
        </div>

    )
}

export default ProductList