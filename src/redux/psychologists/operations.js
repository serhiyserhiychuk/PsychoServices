import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ref,
  query,
  orderByChild,
  get,
  startAfter,
  limitToFirst,
} from "firebase/database";
import { database } from "../../../firebaseConfig.js";

const dataRef = ref(database, "psychologists");

export const getAllPsychologists = createAsyncThunk(
  "psychologists/getAll",
  async (lastOrder, thunkAPI) => {
    try {
      const q = query(
        dataRef,
        orderByChild("_id"),
        startAfter(lastOrder),
        limitToFirst(3)
      );

      const snapshot = await get(q);

      return Object.values(snapshot.val());
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
