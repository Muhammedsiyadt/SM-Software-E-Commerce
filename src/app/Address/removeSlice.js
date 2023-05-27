

import { createSlice } from '@reduxjs/toolkit'
import { removeAddress } from './removeAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    message: "",
    success:false,
};


export const removeAddressSlice = createSlice({
    name: 'delete_address',
    initialState,
    extraReducers: (builder) => {

        builder.addCase(removeAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeAddress.fulfilled, (state, action) => {
            state.loading = false;

            if (action.payload.status == false) {
                state.message = action.payload.message
                toast.error(action.payload.message)

            }
            else {
                state.success = true
                toast.success(action.payload.message)
            }


        })
        builder.addCase(removeAddress.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload)
        })


    },
})




export default removeAddressSlice.reducer;