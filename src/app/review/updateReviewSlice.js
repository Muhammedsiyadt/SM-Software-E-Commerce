import { createSlice } from '@reduxjs/toolkit'
import { updateReview } from './updateReviewAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
};


export const updateReviewSlice = createSlice({
    name: 'review_update',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.loading = false;



            if (action.payload.statusCode == 400) {
                state.success = false;
                state.error = true;
                state.message = "Something went wrong"
            }
            if (action.payload.status == true) {
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            }
            else {
                state.success = false;
                state.error = true;
                state.message = "Something went wrong"
                toast.error(action.payload.message);
            }


        })
        builder.addCase(updateReview.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false;
            state.message = action.payload;
        })
    },
})


export default updateReviewSlice.reducer;