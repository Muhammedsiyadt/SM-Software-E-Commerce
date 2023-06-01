// reducers.js
import { createSlice } from '@reduxjs/toolkit';

const storedCartItems = localStorage.getItem('cart_items');
const cartItemsLength = storedCartItems ? JSON.parse(storedCartItems).length : 0;

const initialState = {
  count: cartItemsLength,
};

const counterSlice = createSlice({
  name: 'counter_items',
  initialState,
  reducers: {
    increment: (state , action) => {
      state.count = action.payload;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

export default counterSlice.reducer;
