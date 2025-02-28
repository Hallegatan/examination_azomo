import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api"; 
import cartReducer from "../features/cart";


const store = configureStore({
  reducer: {
    cart: cartReducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;