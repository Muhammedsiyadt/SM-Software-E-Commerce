import { createSlice } from '@reduxjs/toolkit'
import { fetchAllSimilarProducts } from './similarProductsAction';

const initialState = {
    loading: false,
    products: [],
    error: false,
    success: false,
    message: ""
};


export const similarProductsSlice = createSlice({
    name: 'similar_products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllSimilarProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllSimilarProducts.fulfilled, (state, action) => {
            state.loading = false;


            state.products = action.payload



        })
        builder.addCase(fetchAllSimilarProducts.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default similarProductsSlice.reducer;