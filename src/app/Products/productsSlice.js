import { createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts } from './productsAction';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    loading: false,
    products: [],
    error: false,
    success: false,
    message: ""
};


export const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.products = []
            }
            else {
                state.products = action.payload
            }


        })
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
           
        })
    },
})


export default productsSlice.reducer;