// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartReducer'; 

const store = configureStore({
  reducer: {
    cart: cartReducer, // Register your cart reducer
  },
});

export default store;
