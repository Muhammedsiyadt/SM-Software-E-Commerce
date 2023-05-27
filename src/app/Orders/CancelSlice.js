

import { createSlice } from '@reduxjs/toolkit'
import { cancelOrder } from './CencelAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    message: "",
    success: false,
};


export const cancelOrderSlice = createSlice({
    name: 'cancel_order',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(cancelOrder.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == false) {
                state.message = action.payload.message
                toast.error(action.payload.message)

            }
            else {
                state.success = true
                toast.success(action.payload.message)
            }


        })
        builder.addCase(cancelOrder.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload)
        })


    },
})




export default cancelOrderSlice.reducer;