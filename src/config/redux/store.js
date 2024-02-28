// store.js
import { configureStore } from '@reduxjs/toolkit';
import products from './Slice/productsSlice';
import addCart from './Slice/addCart';
import total from './Slice/addCart'
import totalPrice from './Slice/addCart'
import searchResultSlice from './Slice/searchResultSlice';
import detailProduct from './Slice/detailProduct';
const store = configureStore({
  reducer: {
    products,
    addCart,
    total,
    totalPrice,
    searchResultSlice,
    detailProduct
  },
});

export default store;
