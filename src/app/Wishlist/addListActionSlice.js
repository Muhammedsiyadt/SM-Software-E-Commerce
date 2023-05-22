

import { createSlice } from '@reduxjs/toolkit'
import { addWishlist } from './addListAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const addWishlistSlice = createSlice({
    name: 'wishlist_add',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addWishlist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addWishlist.fulfilled, (state, action) => {
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
        builder.addCase(addWishlist.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default addWishlistSlice.reducer;