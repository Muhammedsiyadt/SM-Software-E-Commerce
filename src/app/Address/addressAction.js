import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllAddress = createAsyncThunk('address/all' , async (payload,thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/user/address` , {
            headers:{'Authorization' : 'Bearer ' + payload.token}
        });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});


export const fetchAllStates = createAsyncThunk('states/all' , async (thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/states`);
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});