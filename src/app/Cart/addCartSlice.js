

import { createSlice } from '@reduxjs/toolkit'
import { addAllCart } from './addCartAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const addCartSlice = createSlice({
    name: 'cart_add',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addAllCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addAllCart.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == true){
                state.success = true;
                state.message = action.payload.message
                toast.success(action.payload.message)

            }
            else {
                state.success =false;
                state.error = true;
                state.message = action.payload.message
                toast.info(action.payload.message)
            }


        })
        builder.addCase(addAllCart.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.success(action.payload.message)
        })
    },
})


export default addCartSlice.reducer;