import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState:
  {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      state.favourites.push(action.payload);
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== action.payload
      );
    },
  },
});

export const favouriteActions = favouriteSlice.actions;

export default favouriteSlice;
