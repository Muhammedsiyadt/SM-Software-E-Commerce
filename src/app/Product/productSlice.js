import { createSlice } from '@reduxjs/toolkit'
import { fetchSingleProduct } from './productAction';

const initialState = {
    loading: false,
    product: {},
    error: false,
    success: false,
    message: ""
};


export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSingleProduct.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.product = null
            }
            else {
                state.product = action.payload
            }


        })
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default productSlice.reducer;