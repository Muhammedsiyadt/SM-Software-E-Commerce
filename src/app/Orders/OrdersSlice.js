import { createSlice } from '@reduxjs/toolkit'
import { fetchAllOrders } from './OrdersAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    orders: [],
    error: false,
    success: false,
    message: "",
    empty: false,
};


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.orders = null
            }
            else if (action.payload.status == 404) {
                state.empty = true
            }
            else {
                state.orders = action.payload.orders
                state.empty = false
            }


        })
        builder.addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false;
            state.orders = [];
            state.message = action.payload;
        })
    },
})


export default ordersSlice.reducer;