import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app";

export const store = configureStore({
  reducer: appSlice.reducer,
});
