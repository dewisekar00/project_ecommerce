import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredential) => {
    try {
      const request = await axios.post(
        "https://dummyjson.com/auth/login",
        userCredential
      );
      const response = await request.data;
      localStorage.setItem("token", response.token);
      console.log("data:", response);
      console.log("token:", response.token);
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error
          ? action.error.message
          : "Terjadi kesalahan saat login. Silakan coba lagi nanti.";
      });
  },
});
export default authSlice.reducer;
