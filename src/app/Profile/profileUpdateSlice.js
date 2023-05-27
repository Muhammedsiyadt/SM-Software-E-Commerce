

import { createSlice } from '@reduxjs/toolkit'
import { updateProfile } from './profileUpdateAction'
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    error: false,
    success: false,
    message: ""
};


export const updateProfileSlice = createSlice({
    name: 'profile_update',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateProfile.fulfilled, (state, action) => {
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
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false
            state.error = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
    },
})


export default updateProfileSlice.reducer;