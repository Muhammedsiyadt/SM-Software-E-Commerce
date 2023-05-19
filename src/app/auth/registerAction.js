import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const registerAction = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const response = await axiosInstance.post(`/signup` , payload);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});