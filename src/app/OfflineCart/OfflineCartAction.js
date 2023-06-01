import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchOfflineCart = createAsyncThunk('cart/offline', async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/product/cart/offline', { params: { items: payload.products } });
      const data = response.data;
      return data;
    } catch (error) {
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });
  