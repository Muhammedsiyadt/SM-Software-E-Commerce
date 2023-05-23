// THIS IS CATEGORY AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";





export const addReview = createAsyncThunk('review/add' , async ( payload , thunkAPI) => {
      try {
        const response = await axiosInstance.post(`/user/review` , payload.data , {
            headers:{'Authorization' : 'Bearer ' + payload.token}
        });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});