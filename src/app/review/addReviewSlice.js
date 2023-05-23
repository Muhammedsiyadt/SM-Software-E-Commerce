

import { createSlice } from '@reduxjs/toolkit'
import { addReview} from './addReviewAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const addReviewSlice = createSlice({
    name: 'review_add',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addReview.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
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
        builder.addCase(addReview.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload.message)
        })
    },
})


export default addReviewSlice.reducer;