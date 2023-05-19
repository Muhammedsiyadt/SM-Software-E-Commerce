import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllBrands = createAsyncThunk('brands/all', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/brands`);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});