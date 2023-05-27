import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";



export const removeAddress = createAsyncThunk('address_p/remove', async (payload, thunkAPI) => {

    try {
        const response = await axiosInstance.post(`/user/address/${payload.id}/remove`,{} , {
            headers: { 'Authorization': 'Bearer ' + payload.token }
        });
        const data = response.data;
        
        return data;
    } catch (error) {
        console.log(error);
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
    }
});