import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const updateCart = createAsyncThunk('cart/update' , async (payload,thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/product/cart/qty` ,  {
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


