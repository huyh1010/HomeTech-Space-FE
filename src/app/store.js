import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";

const rootReducer = {
  categories: categoryReducer,
  products: productReducer,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
