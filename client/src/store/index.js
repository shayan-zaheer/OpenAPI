import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favouriteSlice from './favouriteSlice';

const rootReducer = combineReducers({
  favourites: favouriteSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,

});

console.log(store.getState());

// Persistor for Redux Persist
const persistor = persistStore(store);

export { store, persistor };