import { createSlice } from '@reduxjs/toolkit'
import { tokenAction } from './verifyTokenAction';
import { toast } from 'react-toastify';

const initialState = {
    loading:  false,
    error: false,
    success: false,
    message: "",
    email: ""
};


export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(tokenAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(tokenAction.fulfilled, (state, action) => {
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
                state.email = action.payload[0].email
                toast.success(action.payload.message)
            }

        })
        builder.addCase(tokenAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default tokenSlice.reducer;