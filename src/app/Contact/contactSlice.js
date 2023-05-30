import { createSlice } from '@reduxjs/toolkit'
import { contactAction } from './contactAction';
import { toast } from 'react-toastify';

const initialState = {
    loading:  false,
    error: false,
    success: false,
    message: "",
};


export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(contactAction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(contactAction.fulfilled, (state, action) => {
            state.loading = false;
            if (action.payload.status == false) {
                state.success = false;
                state.error = true;
                state.message = action.payload.message
                toast.error(action.payload.message)
            }
            else {

                state.success = true
                state.message = action.payload.message
                state.loading = false
                toast.success(action.payload.message)
            }

        })
        builder.addCase(contactAction.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.success = false
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default contactSlice.reducer;