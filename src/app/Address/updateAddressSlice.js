import { createSlice } from '@reduxjs/toolkit'
import { updateAddress } from './updateAddressAction';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: "",
};


export const updateAddressSlice = createSlice({
    name: 'address_update',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateAddress.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateAddress.fulfilled, (state, action) => {
            state.loading = false;



            if (action.payload.statusCode == 400) {
                state.success = false;
                state.error = true;
                state.message = "Something went wrong"
            }
            if (action.payload.status == true) {
                state.success = true;
                state.message = action.payload.message;
                toast.success(action.payload.message);
            }
            else {
                state.success = false;
                state.error = true;
                state.message = "Something went wrong"
                toast.error(action.payload.message);
            }


        })
        builder.addCase(updateAddress.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false;
            state.message = action.payload;
        })
    },
})


export default updateAddressSlice.reducer;