import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const tokenAction = createAsyncThunk('verify/token', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/auth/token/verify`, payload);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});