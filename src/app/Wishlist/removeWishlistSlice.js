

import { createSlice } from '@reduxjs/toolkit'
import { removeWishList } from './removeWishListAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    message: "",
    success: false,
};


export const removeWishListSlice = createSlice({
    name: 'delete_wishlist',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(removeWishList.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeWishList.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == false) {
                state.message = action.payload.message
                toast.error(action.payload.message)

            }
            else {

                toast.success(action.payload.message)
            }


        })
        builder.addCase(removeWishList.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })


    },
})




export default removeWishListSlice.reducer;