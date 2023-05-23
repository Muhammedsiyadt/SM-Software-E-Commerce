import { createSlice } from '@reduxjs/toolkit'
import { fetchSingleReview } from './singleReviewAction';

const initialState = {
    loading: false,
    review: {},
    error: false,
    success: false,
    message: "",
    empty: false,
};


export const reviewSingleSlice = createSlice({
    name: 'review_single',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSingleReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSingleReview.fulfilled, (state, action) => {
            state.loading = false;
            
            

            if (action.payload.statusCode == 400) {
                state.product = null
            }
            else if(action.payload.status == 404){
                state.empty = true
            }
            else {
                state.review = action.payload.data
                state.empty = false
            }


        })
        builder.addCase(fetchSingleReview.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false;
            state.message = action.payload;
        })
    },
})


export default reviewSingleSlice.reducer;