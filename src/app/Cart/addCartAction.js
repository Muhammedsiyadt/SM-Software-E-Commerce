import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const addAllCart = createAsyncThunk('cart/add' , async (payload,thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/product/cart/add` ,  {
            product:payload.product,
            quantity:payload.quantity
        }, {
            headers:{'Authorization' : 'Bearer ' + payload.token}
        });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});