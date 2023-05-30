import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const userAction = createAsyncThunk('auth/user', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/user`, {
      headers: { 'Authorization': 'Bearer ' + payload.token },
    });
    const data = response.data;

    if (data.status === false) {
      return thunkAPI.rejectWithValue(data.message);
    } else {
      return data;
    }

  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});