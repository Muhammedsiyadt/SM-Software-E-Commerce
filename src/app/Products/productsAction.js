import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";




export const fetchAllProducts = createAsyncThunk('products/all', async (payload, thunkAPI) => {
  try {


    if (Array.isArray(payload.brand) && payload.brand.length <= 0 && Array.isArray(payload.categories) && payload.categories.length <= 0) {

      const response = await axiosInstance.get(`/products?page=${payload.page}&min=${Number(payload.min)}&max=${Number(payload.max)}&sort=${payload.sort}`);
      const data = response.data;
      return data;
    }

    else {

      // Create a Set to store unique brand values
      const brandSet = new Set(payload.brand);
      const catSet = new Set(payload.categories);

      // Convert the Set to an array
      const uniqueBrands = Array.from(brandSet);
      const catBrands = Array.from(catSet);

      const brandParams = uniqueBrands.map(brand => `brand[]=${brand}`);


      const catParams = catBrands.map(cat => `category[]=${cat}`);

      // Join the brand parameters with '&'
      const brandQueryString = brandParams.join('&');
      const catQueryString = catParams.join('&');

      const response = await axiosInstance.get(`/products?page=${payload.page}&${brandQueryString}&${catQueryString}&min=${Number(payload.min)}&max=${Number(payload.max)}&sort=${payload.sort}`);
      const data = response.data;
      return data;
    }

    if(Array.isArray(payload.brand) && payload.brand.length >= 0){
      // Create a Set to store unique brand values
      const brandSet = new Set(payload.brand);

      // Convert the Set to an array
      const uniqueBrands = Array.from(brandSet);

      const brandParams = uniqueBrands.map(brand => `brand[]=${brand}`);


      // Join the brand parameters with '&'
      const brandQueryString = brandParams.join('&');

      const response = await axiosInstance.get(`/products?page=${payload.page}&${brandQueryString}&min=${Number(payload.min)}&max=${Number(payload.max)}`);
      const data = response.data;
      return data;
    }

    if(Array.isArray(payload.categories) && payload.categories.length >= 0){

      // Create a Set to store unique brand values
      const catSet = new Set(payload.categories);

      // Convert the Set to an array

      const catBrands = Array.from(catSet);

      const catParams = catBrands.map(cat => `category[]=${cat}`);

      const catQueryString = catParams.join('&');

      const response = await axiosInstance.get(`/products?page=${payload.page}&${catQueryString}&min=${Number(payload.min)}&max=${Number(payload.max)}`);
      const data = response.data;
      return data;
    }
   

  } catch (error) {
    const message = error.message;
    return thunkAPI.rejectWithValue(message)
  }
});