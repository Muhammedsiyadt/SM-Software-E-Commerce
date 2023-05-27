

import { createSlice } from '@reduxjs/toolkit'
import { addAddress } from './addAddressAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const addAddressSlice = createSlice({
    name: 'address_add',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addAddress.fulfilled, (state, action) => {
            
            state.loading = false;

            if (action.payload.status == true){
                state.success = true;
                state.message = action.payload.message
                toast.success(action.payload.message)

            }
            else {
                state.success =false;
                state.error = true;
                state.message = action.payload.message
                toast.info(action.payload.message)
            }


        })
        builder.addCase(addAddress.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default addAddressSlice.reducer;