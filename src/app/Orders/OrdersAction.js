import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllOrders = createAsyncThunk('orders/all' , async (payload, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/user/orders` , {
            headers: { 'Authorization': 'Bearer ' + payload.token }
          });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});