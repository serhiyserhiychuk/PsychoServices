import { createAsyncThunk } from "@reduxjs/toolkit";

import { ref, onValue } from "firebase/database";
import { database } from "../../../firebaseConfig.js";

const dataRef = ref(database, "psychologists");

export const getAllCampers = createAsyncThunk(
  "campers/getAll",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        onValue(
          dataRef,
          (snapshot) => {
            const data = snapshot.val();
            resolve(data);
          },
          reject
        );
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  "campers/getCamperById",
  async (camperId, thunkAPI) => {
    try {
      const response = await axios.get(`/${camperId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCamperById = createAsyncThunk(
  "campers/updateCamperById",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`/${data.id}`, {
        favorite: data.favorite,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
