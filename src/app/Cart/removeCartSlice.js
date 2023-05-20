

import { createSlice } from '@reduxjs/toolkit'
import { removeCart } from './removeCartAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    message: ""
};


export const removeCartSlice = createSlice({
    name: 'delete_cart',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(removeCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeCart.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == false) {
                state.message = action.payload.message
                toast.error(action.payload.message)

            }
            else {
                toast.success(action.payload.message)
            }


        })
        builder.addCase(removeCart.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })


    },
})




export default removeCartSlice.reducer;