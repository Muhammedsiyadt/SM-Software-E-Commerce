// THIS IS CATEGORY AND ITS CONTRIBUTORS "AS IS" AND ANY EXPRESS

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllCat = createAsyncThunk('cat/all' , async (thunkAPI) => {
      try {
        const response = await axiosInstance.get(`/categories`);
        const data = response.data;
        return data;
      } catch (error) {
        const message = error.message;
        return thunkAPI.rejectWithValue(message)
      }
});