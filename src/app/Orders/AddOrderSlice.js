

import { createSlice } from '@reduxjs/toolkit'
import { addOrders } from './AddOrderAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
    order: ""
};


export const addOrderSlice = createSlice({
    name: 'order_add',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addOrders.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addOrders.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == true) {
                state.success = true;
                state.message = action.payload.message
                state.order = action.payload.order
                toast.success(action.payload.message)


            }
            else {
                state.success = false;
                state.error = true;
                state.message = action.payload.message

                toast.info(action.payload.message)
            }


        })
        builder.addCase(addOrders.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })
    },
})


export default addOrderSlice.reducer;