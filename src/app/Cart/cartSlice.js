

import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCart } from './cartAction';


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

            if (action.payload.status == false) {
                state.items = []
                state.message = action.payload.message
                state.success = false

            }
            else {
                state.items = action.payload.data
                state.success = true;
                state.error = false;
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