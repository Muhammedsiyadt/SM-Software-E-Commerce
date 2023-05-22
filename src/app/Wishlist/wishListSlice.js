

import { createSlice } from '@reduxjs/toolkit'
import { fetchAllWishList } from './wishListAction';


const initialState = {
    loading: false,
    items: [],
    error: false,
    success: false,
    message: ""
};


export const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllWishList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllWishList.fulfilled, (state, action) => {
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
        builder.addCase(fetchAllWishList.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default wishListSlice.reducer;