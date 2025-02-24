// cartActions.js

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_CART = "SET_CART";

// Action to add item to cart
export const addItem = (product) => ({
  type: ADD_ITEM,
  payload: product,
});

// Action to remove item from cart
export const removeItem = (product) => ({
  type: REMOVE_ITEM,
  payload: product,
});

// Action to set the cart from localStorage
export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});
