import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchSingleProduct = createAsyncThunk('product/single' , async (payload, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/product/${payload.slug}`);
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});