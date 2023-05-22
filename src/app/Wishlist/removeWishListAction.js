import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";



export const removeWishList = createAsyncThunk('wishlist/remove', async (payload, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/product/wishlist/remove`, {
            product: payload.product,
        }, {
            headers: { 'Authorization': 'Bearer ' + payload.token }
        });
        const data = response.data;
        return data;
    } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
    }
});