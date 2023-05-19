// THIS IS CATEGORY AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESSbrand_loading


import { createSlice } from '@reduxjs/toolkit'
import { fetchAllCat } from './catAction';

const initialState = {
    cat_loading: false,
    cat: [],
    cat_error: false,
    success: false,
    cat_message: ""
};


export const catSlice = createSlice({
    name: 'cats',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllCat.pending, (state) => {
            state.cat_loading = true;
        })
        builder.addCase(fetchAllCat.fulfilled, (state, action) => {
            state.cat_loading = false;

            if (action.payload.statusCode == 400) {
                state.cat = null
            }
            else {
                state.cat = action.payload
            }


        })
        builder.addCase(fetchAllCat.rejected, (state, action) => {
            state.cat_loading = false
            state.cat_error = true;
            state.cat_loading = action.payload;
        })
    },
})


export default catSlice.reducer;