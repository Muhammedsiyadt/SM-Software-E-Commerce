import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const resetAction = createAsyncThunk('reset/password', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/auth/reset` , payload.data);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});