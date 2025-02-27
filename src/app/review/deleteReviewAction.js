// THIS IS CATEGORY AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";





export const deleteReview = createAsyncThunk('review/delete', async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/user/review/remove`, { product: payload.product }, {
      headers: { 'Authorization': 'Bearer ' + payload.token }
    });
    const data = response.data;
    return data;
  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});