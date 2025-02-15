// store.js
import { configureStore } from '@reduxjs/toolkit';
import favouriteSlice from './favouriteSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    favourites: favouriteSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
