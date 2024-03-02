import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetailProduct = createAsyncThunk(
  "products/fetchDetailProduct",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    // console.log("detailProduct:", response.data);
    return response.data;
  }
);

const detailProductSlice = createSlice({
  name: "detailProduct",
  initialState: {
   detailProduct: {},
   status: 'idle'
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.detailProduct = action.payload;
        state.status = "success";
      })
      .addCase(fetchDetailProduct.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setStatus } = detailProductSlice.actions;

export default detailProductSlice.reducer;
