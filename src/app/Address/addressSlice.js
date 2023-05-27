import { createSlice } from '@reduxjs/toolkit'
import { fetchAllAddress, fetchAllStates } from './addressAction';

const initialState = {
    loading: false,
    address: [],
    states: [],
    error: false,
    success: false,
    message: ""
};


export const addressSlice = createSlice({
    name: 'address',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllAddress.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.address = []
            }
            else {
                state.address = action.payload.data
            }


        })
        builder.addCase(fetchAllAddress.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })

        builder.addCase(fetchAllStates.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAllStates.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.statusCode == 400) {
                state.states = []
            }
            else {
                state.states = action.payload.states
            }


        })
        builder.addCase(fetchAllStates.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
        })
    },
})


export default addressSlice.reducer;