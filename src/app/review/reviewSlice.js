import { createSlice } from '@reduxjs/toolkit'
import { fetchAllReview } from './reviewAction';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    reviews: [],
    error: false,
    success: false,
    message: ""
};


export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllReview.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.reviews = []
            }
            else {
                state.success = action.payload.status
                state.reviews = action.payload.data
            }


        })
        builder.addCase(fetchAllReview.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
           
        })
    },
})


export default reviewSlice.reducer;