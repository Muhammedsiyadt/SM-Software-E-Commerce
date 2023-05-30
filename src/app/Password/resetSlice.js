import { createSlice } from '@reduxjs/toolkit'
import { resetAction } from './resetAction';
import { toast } from 'react-toastify';

const initialState = {
    loading:  false,
    error: false,
    success: false,
    message: "",
};


export const resetSlice = createSlice({
    name: 'reset',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(resetAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(resetAction.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.success = false;
                state.error = true;
                state.message = action.payload.message
                toast.error(action.payload.message)
            }
            else {

                state.success = true
                state.message = action.payload.message
                state.loading = false
                toast.success(action.payload.message)
            }

        })
        builder.addCase(resetAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default resetSlice.reducer;