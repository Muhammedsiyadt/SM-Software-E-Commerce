import { createSlice } from '@reduxjs/toolkit'
import { registerAction } from './registerAction';
import { toast } from 'react-toastify';


const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
    token: null
};


export const registerSlice = createSlice({
    name: 'register',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(registerAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.token = null
                state.error = true;
                state.message = action.payload.errors;
            }
            else {
                state.success = action.payload.status;
                state.token = action.payload.authorisation.token
            }


        })
        builder.addCase(registerAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default registerSlice.reducer;