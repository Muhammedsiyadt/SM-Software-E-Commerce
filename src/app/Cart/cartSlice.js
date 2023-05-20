

import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCart } from './cartAction';
import { act } from 'react-dom/test-utils';

const initialState = {
    loading: false,
    items: [],
    error: false,
    success: false,
    message: ""
};


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllCart.fulfilled, (state, action) => {
            state.loading = false;
            
            if (action.payload.statusCode == 400) {
                state.items = null
            }
            if (action.payload.status == false){
                state.items = []
                state.message = action.payload.message

            }
            else {
                state.items = action.payload.data
                state.success = true;
            }


        })
        builder.addCase(fetchAllCart.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default cartSlice.reducer;