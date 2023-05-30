import { createSlice } from '@reduxjs/toolkit'
import { userAction } from './userAction';




const initialState = {
    loading:localStorage.getItem('token') !== null ? true : false,
    error: false,
    success: false,
    message: "",
    user:null,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(userAction.fulfilled, (state, action) => {
            state.loading = false;
            state.error = false;
            state.success = true;
            state.user = action.payload.user;
        })
        builder.addCase(userAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.user = null;
            state.message = action.payload;
        })
    },
})


export default userSlice.reducer;