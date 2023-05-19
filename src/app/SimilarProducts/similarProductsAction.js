import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllSimilarProducts = createAsyncThunk('products/similar', async (payload, thunkAPI) => {

  try {
    if (payload.slug == false) {
      return
    }
    else {
      const response = await axiosInstance.get(`/product/recomment/${payload.slug}`);
      const data = response.data;
      return data;
    }
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});