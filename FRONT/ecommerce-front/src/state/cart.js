import { createAction, createReducer } from "@reduxjs/toolkit";
/**
 * Acción para agregar un elemento al carrito.
 */
export const addToCart = createAction("ADD_TO_CART");
/**
 * Acción para remover un element del carrito
 */
export const removeToCart = createAction("REMOVE_TO_CART");
/**
 * Acción para establecer la visibilidad del carrito.
 */
export const setCartVisible=createAction('SET_CART_VISIBLE')


/**
 * Estado inicial del carrito.
 * @property {Array} items - Lista de elementos en el carrito.
 * @property {boolean} cartVisible - Indicador de la visibilidad del carrito.
 */
export const cartInitialState = {
  items: [],
  cartVisible:false,

};


/**
 * Reductor del carrito.
 * @param {Object} state - Estado actual del carrito.
 * @param {Object} action - Acción despachada.
 */
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
