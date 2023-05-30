import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


export const contactAction = createAsyncThunk('contact/form', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/user/enquiry` , payload.data);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});