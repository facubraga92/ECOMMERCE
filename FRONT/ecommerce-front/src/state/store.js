import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { productsReducer } from "./products";

const store = configureStore({
  reducer: { user: userReducer, cart: cartReducer, products: productsReducer },
});

export default store;
