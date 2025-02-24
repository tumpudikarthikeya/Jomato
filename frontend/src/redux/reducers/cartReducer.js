import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {   
      const item = action.payload;
      // Ensure the price is a valid number when adding the item
      const price = parseFloat(item.price);
      if (isNaN(price)) {
        console.error(`Invalid price for item: ${item.name}`);
        return;
      }

      // Find existing item in the cart based on item_id
      const existingItem = state.cart.find((product) => product.item_id === item.item_id);

      if (existingItem) {
        // If item already exists in the cart, increase the quantity
        existingItem.qty += 1;
      } else {
        // If item doesn't exist, add new item with qty 1
        state.cart.push({ ...item, qty: 1, price });
      }
    },
    removeItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((product) => product.item_id === item.item_id);

      if (existingItem) {
        // Decrease the quantity or remove the item completely if qty is 1
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          // Remove the item from the cart if qty is 1
          state.cart = state.cart.filter((product) => product.item_id !== item.item_id);
        }
      }
    },
    setCart: (state, action) => {
      // Set the cart state from external data (like localStorage or API)
      state.cart = action.payload;
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
