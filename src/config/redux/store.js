// store.js
import { configureStore } from '@reduxjs/toolkit';
import products from './Slice/productsSlice';
import addCart from './Slice/addCart';
import total from './Slice/addCart'
import totalPrice from './Slice/addCart'

const store = configureStore({
  reducer: {
    products,
    addCart,
    total,
    totalPrice
  },
});

export default store;
