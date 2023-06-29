import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

export const userInitialState = {
  name: null,
  email: null,
  password: null,
  address: null,
  phone: null,
  role: null,
};

export const userReducer = createReducer(userInitialState, (builder) => {
  builder.addCase(setUser, (state, action) => action.payload);
});
