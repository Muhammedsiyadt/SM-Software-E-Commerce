import { createSlice } from '@reduxjs/toolkit'
import { fetchAllBrands } from './brandsAction';

const initialState = {
    brand_loading: false,
    brands: [],
    error: false,
    success: false,
    message: ""
};


export const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllBrands.pending, (state) => {
            state.brand_loading = true;
        })
        builder.addCase(fetchAllBrands.fulfilled, (state, action) => {
            state.brand_loading = false;

            if (action.payload.statusCode == 400) {
                state.brands = []
            }
            else {
                state.brands = action.payload
            }


        })
        builder.addCase(fetchAllBrands.rejected, (state, action) => {
            state.brand_loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default brandsSlice.reducer;