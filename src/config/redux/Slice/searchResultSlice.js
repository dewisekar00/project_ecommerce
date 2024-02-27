import { createSlice } from "@reduxjs/toolkit";

const searchResultSlice = createSlice({
  name: "searchResults",
  initialState: [],
  reducers: {
    setSearchResults(state, action) {
      return action.payload;
    },
  },
});

export const { setSearchResults } = searchResultSlice.actions;
export default searchResultSlice.reducer;

// expectasinya didalam slice ini itu berisi data yang terfilter karena mau ditampilkan data yang ke filter itu ke app.jsx
