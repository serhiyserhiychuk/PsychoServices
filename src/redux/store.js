import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { psychologistsReducer } from "./psychologists/slice";
import { usersReducer } from "./users/slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedPsychologistsReducer = persistReducer(
  persistConfig,
  psychologistsReducer
);
const persistedUsersReducer = persistReducer(persistConfig, usersReducer);

export const store = configureStore({
  reducer: {
    psychologists: persistedPsychologistsReducer,
    users: persistedUsersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
