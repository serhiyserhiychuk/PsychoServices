import { createSlice } from "@reduxjs/toolkit";
import { getAllCampers, getCamperById, updateCamperById } from "./operations";

const camperSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    currentCamper: null,
    error: null,
    loading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCampers.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllCampers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getCamperById.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.loading = false;
        if (
          state.currentCamper &&
          state.currentCamper._id === action.payload._id
        ) {
          state.currentCamper = null;
        } else {
          state.currentCamper = action.payload;
        }
      })
      .addCase(getCamperById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(updateCamperById.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateCamperById.fulfilled, (state, action) => {
        state.loading = false;
        const camperIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (camperIndex !== -1) {
          state.items[camperIndex] = action.payload;
          state.currentCamper = action.payload;
        }
      })
      .addCase(updateCamperById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const campersReducer = camperSlice.reducer;
