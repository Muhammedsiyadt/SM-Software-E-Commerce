import { createSlice } from '@reduxjs/toolkit'
import { fetchAllFeaturedProductsHome } from './featuredProductsAction';

const initialState = {
    loading: false,
    products: [],
    error: false,
    success: false,
    message: ""
};


export const featuredProductsHomeSlice = createSlice({
    name: 'featured_products_home',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllFeaturedProductsHome.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllFeaturedProductsHome.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.loading = false
                state.error = true;
                state.message = action.payload.message;
            }
            else {
                state.success = true;
                state.products = action.payload
            }




        })
        builder.addCase(fetchAllFeaturedProductsHome.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default featuredProductsHomeSlice.reducer;