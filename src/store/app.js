import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: [],
  favourites: [],
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setFavourites: (state, action) => {
      const f = action.payload;
      const f_exists = state.favourites.find((fav) => fav.name == f.name);

      if (f_exists) {
        state.favourites = state.favourites.filter((fav) => fav.name != f.name);
      } else {
        state.favourites = [...state.favourites, f];
      }
    },
  },
});

export const { setRecommendations, setFavourites } = appSlice.actions;
