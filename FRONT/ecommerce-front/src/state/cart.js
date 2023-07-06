import { createAction, createReducer } from "@reduxjs/toolkit";

export const addToCart = createAction("ADD_TO_CART");
export const removeToCart = createAction("REMOVE_TO_CART");
export const setCartVisible=createAction('SET_CART_VISIBLE')

export const cartInitialState = {
  items: [],
  cartVisible:false,

};

export const cartReducer = createReducer(cartInitialState, (builder) => {
  builder.addCase(addToCart, (state, action) => {
    const newItem = action.payload;
    const existingItem = state.items.find((item) => item.id === newItem.id);

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      state.items.push(newItem);
    }
  });

  builder.addCase(removeToCart, (state, action) => {
    const itemId = action.payload;
    state.items = state.items.filter((item) => item.id !== itemId);
  });

  builder.addCase(setCartVisible,(state,action)=> { state.cartVisible = action.payload})
});
