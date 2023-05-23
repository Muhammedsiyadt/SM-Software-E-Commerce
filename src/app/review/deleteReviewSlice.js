

import { createSlice } from '@reduxjs/toolkit'
import { deleteReview } from './deleteReviewAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    message: "",
    success:false,
};


export const removeReviewSlice = createSlice({
    name: 'delete_review',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(deleteReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
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
        builder.addCase(deleteReview.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })


    },
})




export default removeReviewSlice.reducer;