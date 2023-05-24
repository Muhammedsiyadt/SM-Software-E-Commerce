import { createSlice } from '@reduxjs/toolkit'
import { fetchAllRecommendProductsHome } from './recommentProductsAction';

const initialState = {
    loading: false,
    products: [],
    error: false,
    success: false,
    message: ""
};


export const recommentProductsHomeSlice = createSlice({
    name: 'recomment_products_home',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllRecommendProductsHome.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllRecommendProductsHome.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.loading = false
                state.error = true;
                state.message = action.payload.message;
            }
            else {
                state.success = true;
                state.products = action.payload.data
            }




        })
        builder.addCase(fetchAllRecommendProductsHome.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = "Something went wrong";
        })
    },
})


export default recommentProductsHomeSlice.reducer;