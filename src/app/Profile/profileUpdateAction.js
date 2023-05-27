import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";





export const updateProfile = createAsyncThunk('profile/update', async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/user/profile`, payload.data, {
            headers: { 'Authorization': 'Bearer ' + payload.token }
        });
        const data = response.data;
        return data;
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
    }
});