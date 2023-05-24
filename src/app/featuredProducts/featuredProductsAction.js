import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllFeaturedProductsHome = createAsyncThunk('products/featureds', async (thunkAPI) => {

  try {
      const response = await axiosInstance.get(`/products/featured`);
      const data = response.data;
      
      return data;

  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});