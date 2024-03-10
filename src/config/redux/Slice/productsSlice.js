import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fungsi untuk memuat data dari cache jika tersedia
export const loadDataFromCache = () => {
  const cachedData = localStorage.getItem("cachedProductsData");
  if (cachedData) {
    const { timestamp, data } = JSON.parse(cachedData);
    // Check if data is expired (1 hour expiration time)
    const expirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
    if (Date.now() - timestamp < expirationTime) {
      return data;
    }
  }
  return null;
};

// 1. call API
export const fetchProductsData = createAsyncThunk(
  "products/fetchProductsData",
  async ({ category, categoryName }) => {
     // Cek apakah data dalam cache masih valid
     const cachedData = loadDataFromCache();
     if (cachedData && cachedData.category === category && cachedData.categoryName === categoryName) {
       return cachedData.data;
     }
 
     // Jika data dalam cache tidak valid atau tidak sesuai, ambil data dari API
     const response = await axios.get(
       `https://fakestoreapi.com/products/${category}/${categoryName}`
     );
 
     // Simpan data ke cache dengan timestamp
     const dataWithTimestamp = {
       timestamp: Date.now(),
       category,
       categoryName,
       data: response.data,
     };
     localStorage.setItem(
       "cachedProductsData",
       JSON.stringify(dataWithTimestamp)
     );
 
     return response.data;
  }
 );
 

// 2.Create Slice with status
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: loadDataFromCache() || [], // Load data from cache if available
    status: "idle",
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
        state.status = "loading";
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "success";
      })
      .addCase(fetchProductsData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setStatus } = productsSlice.actions;

export default productsSlice.reducer;
