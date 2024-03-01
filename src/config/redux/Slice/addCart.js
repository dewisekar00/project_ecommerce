import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddCart = createAsyncThunk(
  "products/fetchAddCart",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log("addCart:", response.data);
    return response.data;
  }
);

const addCartSlice = createSlice({
  name: "addCart",
  initialState: {
    addCart: [],
    total: 0,
    totalPrice: 0,
    status: "idle",
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.addCart = [...state.addCart, action.payload];
        state.totalPrice += action.payload.price;
        state.total += 1;
        state.status = "success";
      })
      .addCase(fetchAddCart.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setStatus } = addCartSlice.actions;

export default addCartSlice.reducer;
