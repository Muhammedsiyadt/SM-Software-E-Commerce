import { createSlice } from '@reduxjs/toolkit'
import { fetchSingleAddress } from './singleAddressAction';

const initialState = {
    loading: false,
    address: {},
    error: false,
    success: false,
    message: "",
    empty: false,
};


export const addressSingleSlice = createSlice({
    name: 'address_single',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchSingleAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSingleAddress.fulfilled, (state, action) => {
            state.loading = false;
            
            

            if (action.payload.statusCode == 400) {
                state.product = null
            }
            else if(action.payload.status == 404){
                state.empty = true
            }
            else {
                state.address = action.payload.data
                state.empty = false
                state.success = true
            }


        })
        builder.addCase(fetchSingleAddress.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false;
            state.message = action.payload;
        })
    },
})


export default addressSingleSlice.reducer;