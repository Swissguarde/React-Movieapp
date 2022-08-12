import { createSlice } from "@reduxjs/toolkit";

export const movieOrShow = createSlice({
  name: "movieOrShow",
  initialState: {
    searchQuery: "",
  },
  reducers: {
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { searchMovie } = movieOrShow.actions;
export default movieOrShow.reducer;
