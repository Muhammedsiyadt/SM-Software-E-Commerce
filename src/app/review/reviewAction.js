// THIS IS CATEGORY AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllReview = createAsyncThunk('review/all' , async ( payload , thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/user/${payload.id}/reviews`);
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});