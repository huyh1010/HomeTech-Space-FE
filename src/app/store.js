import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";

const rootReducer = {
  users: userReducer,
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;