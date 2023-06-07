

import { createSlice } from '@reduxjs/toolkit'
import { fetchOfflineCart } from './OfflineCartAction';


const initialState = {
    loading: false,
    items: [],
    error: false,
    success: false,
    message: ""
};



export const offlineCartSlice = createSlice({
    name: 'offline_cart',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchOfflineCart.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchOfflineCart.fulfilled, (state, action) => {
            state.loading = false;
                    
            if (action.payload.status == false) {
                state.items = []
                state.message = action.payload.message
                state.success = false
                state.error = false;

            }
            else {
                state.items = action.payload.data
                state.success = true;
                state.error = false;
            }


        })
        builder.addCase(fetchOfflineCart.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default offlineCartSlice.reducer;