import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, set } from "firebase/database";
import { database } from "../../firebaseConfig.js";

export const getFavorites = createAsyncThunk(
  "users/getFavorites",
  async (uid, thunkAPI) => {
    try {
      const userRef = ref(database, `users/${uid}/favorites`);
      const snapshot = await get(userRef);
      const favorites = snapshot.exists() ? snapshot.val() : [];
      return Object.values(favorites);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "users/addToFavorites",
  async ({ psychologist, uid }, thunkAPI) => {
    const userRef = ref(database, `users/${uid}/favorites`);
    const snapshot = await get(userRef);
    const favorites = snapshot.exists() ? snapshot.val() : [];

    try {
      const isFavorite = Object.values(favorites).find(
        (item) => item._id === psychologist._id
      );

      if (!isFavorite) {
        const updatedFavorites = {
          ...favorites,
          [psychologist._id]: psychologist,
        };
        await set(userRef, updatedFavorites);
        return Object.values(updatedFavorites);
      } else {
        const { [psychologist._id]: removedPsychologist, ...updatedFavorites } =
          favorites;

        await set(userRef, updatedFavorites);
        return Object.values(updatedFavorites);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
