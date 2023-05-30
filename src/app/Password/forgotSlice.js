import { createSlice } from '@reduxjs/toolkit'
import { forgotAction } from './forgotAction';
import { toast } from 'react-toastify';

const initialState = {
    loading:  false,
    error: false,
    success: false,
    message: "",
};


export const forgotPassSlice = createSlice({
    name: 'forgot',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(forgotAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(forgotAction.fulfilled, (state, action) => {
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
        builder.addCase(forgotAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default forgotPassSlice.reducer;