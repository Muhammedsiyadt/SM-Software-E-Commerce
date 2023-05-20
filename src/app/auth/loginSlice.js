import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from './loginAction';

const initialState = {
    loading:  false,
    error: false,
    success: false,
    message: "",
    token: ""
};


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.success = false;
                state.error = true;
                state.message = action.payload.message
            }
            else {
                state.success = true
            }

        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.message = action.payload;
        })
    },
})


export default loginSlice.reducer;