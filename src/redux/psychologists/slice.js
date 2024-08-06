import { createSlice } from "@reduxjs/toolkit";
import { getAllPsychologists, getPsychologistById } from "./operations";

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState: {
    items: [],
    currentPsychologist: null,
    error: null,
    loading: false,
  },
  reducers: {
    resetPsychologists: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllPsychologists.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getAllPsychologists.fulfilled, (state, action) => {
        state.loading = false;

        if (state.items && state.items.length === 0) {
          state.items = action.payload;
        } else if (
          state.items[state.items.length - 1]._id !==
          action.payload[action.payload.length - 1]._id
        ) {
          state.items = [...state.items, ...action.payload];
        }
      })
      .addCase(getAllPsychologists.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getPsychologistById.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getPsychologistById.fulfilled, (state, action) => {
        state.loading = false;
        if (
          state.currentPsychologist &&
          state.currentPsychologist._id === action.payload._id
        ) {
          state.currentPsychologist = null;
        } else {
          state.currentPsychologist = action.payload;
        }
      })
      .addCase(getPsychologistById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export const { resetPsychologists } = psychologistsSlice.actions;
export const psychologistsReducer = psychologistsSlice.reducer;
