import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllRecommendProductsHome = createAsyncThunk('products/recomment', async (thunkAPI) => {

  try {
      const response = await axiosInstance.get(`/products/recomment`);
      const data = response.data;
      return data;

  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});