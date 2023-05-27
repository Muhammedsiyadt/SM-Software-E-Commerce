import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const addOrders = createAsyncThunk('orders/add' , async (payload, thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/user/orders` , payload.data , {
            headers: { 'Authorization': 'Bearer ' + payload.token }
          });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});