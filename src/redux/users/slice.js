import { createSlice } from "@reduxjs/toolkit";
import { getFavorites, addToFavorites } from "./operations";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    favorites: [],
    currentUser: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getFavorites.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(addToFavorites.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const usersReducer = usersSlice.reducer;
