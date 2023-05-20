

import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from './updateCartAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const updateCartSlice = createSlice({
    name: 'update_cart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateCart.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == false) {
                state.message = action.payload.message
                toast.error(action.payload.message)

            }
            else {
                state.success = true;
                toast.success(action.payload.message)
            }


        })
        builder.addCase(updateCart.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })



    },
})




export default updateCartSlice.reducer;