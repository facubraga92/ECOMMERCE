import { createAction, createReducer } from "@reduxjs/toolkit";

export const setProductsRedux = createAction("SET_PRODUCTS");

export const productsInitialState = [];

export const productsReducer = createReducer(
  productsInitialState,
  (builder) => {
    builder.addCase(setProductsRedux, (state, action) => action.payload);
  }
);
