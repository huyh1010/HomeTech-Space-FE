import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import bundleReducer from "../features/bundle/bundleSlice";
import orderReducer from "../features/order/orderSlice";

const rootReducer = {
  users: userReducer,
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
  bundles: bundleReducer,
  orders: orderReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
