import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchSingleReview = createAsyncThunk('review/single' , async (payload, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/user/${payload.product}/review` , {
            headers: { 'Authorization': 'Bearer ' + payload.token }
          });
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});