import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from './loginAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
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
                if (typeof action.payload.authorisation !== "undefined" && action.payload.authorisation !== null && action.payload.authorisation !== "") {
                    state.success = true
                    state.token = action.payload.authorisation.token
                }
                else {
                    state.error = true
                    state.message = 'Authorization token is missing or invalid.'
                }
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