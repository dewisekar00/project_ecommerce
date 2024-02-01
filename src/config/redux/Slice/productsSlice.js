import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 1.call API
export const fetchProductsData = createAsyncThunk(
  // nama action yang akan ditampilkan di redux dev tool
  'products/fetchProductsData',
  async ({category, categoryName}) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${category}/${categoryName}`);
    return response.data;
  }
);


// 2.Create Slice with status
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  // 3.Add status and added API data to initialState
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'success';
      })
      .addCase(fetchProductsData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setStatus } = productsSlice.actions;

export default productsSlice.reducer;
