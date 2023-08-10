import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/user/userSlice";
import bundleReducer from "../features/bundle/bundleSlice";
import orderReducer from "../features/order/orderSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["carts"], // only navigation will be persisted
};

const reducer = combineReducers({
  users: userReducer,
  categories: categoryReducer,
  products: productReducer,
  carts: cartReducer,
  bundles: bundleReducer,
  orders: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
