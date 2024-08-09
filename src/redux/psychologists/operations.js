import { createAsyncThunk } from "@reduxjs/toolkit";

import { ref, get } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

const dataRef = ref(database, "psychologists");

export const getAllPsychologists = createAsyncThunk(
  "psychologists/getAll",
  async ({ lastOrder, limit, filter }, thunkAPI) => {
    try {
      const snapshot = await get(dataRef);

      let data = Object.values(snapshot.val());

      if (filter === "A to Z") {
        data.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (filter === "Z to A") {
        data.sort((a, b) => a.name.localeCompare(b.name)).reverse();
      }
      if (filter === "Less than $160") {
        data = data.filter((item) => item.price_per_hour <= 160);
      }
      if (filter === "Greater than $160") {
        data = data.filter((item) => item.price_per_hour > 160);
      }
      if (filter === "Popular") {
        data.sort((a, b) => b.rating - a.rating);
      }
      if (filter === "Not popular") {
        data.sort((a, b) => a.rating - b.rating);
      }

      const startIndex = lastOrder
        ? data.findIndex((item) => item._id === lastOrder) + 1
        : 0;

      const paginatedData = data.slice(startIndex, startIndex + limit);

      return paginatedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPsychologistById = createAsyncThunk(
  "psychologists/getPsychologistById",
  async (psychologistId, thunkAPI) => {
    try {
      const snapshot = await get(dataRef);
      const psychologists = snapshot.val();
      const psychologist = Object.values(psychologists).find(
        (psychologist) => psychologist._id === psychologistId
      );
      if (psychologist) {
        return psychologist;
      } else {
        return thunkAPI.rejectWithValue("Psychologist is not found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
