import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from './loginAction';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
    token:""
};


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.brand_loading = true;
        })
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.brand_loading = false;

            if (action.payload.statusCode == 400) {
                state.brands = []
            }
            else {
                state.brands = action.payload
            }


        })
        builder.addCase(loginAction.rejected, (state, action) => {
            state.brand_loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default loginSlice.reducer;