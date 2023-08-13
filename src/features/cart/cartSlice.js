import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const updateCart = createAsyncThunk(
  "carts/updateCart",
  async ({ id, cart }, { rejectWithValue }) => {
    try {
      let url = `/carts/${id}`;
      const res = await apiService.put(url, { cart });
      const timeout = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      };
      await timeout();
      return res.data.cart;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: [],
  cartItemCount: 0,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const checkCart = JSON.parse(localStorage.getItem("cart"));
      if (!checkCart) window.localStorage.setItem("cart", JSON.stringify([]));
      let cartOnLocal = JSON.parse(localStorage.getItem("cart"));
      const itemInCart = cartOnLocal.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        cartOnLocal.push({ ...action.payload, quantity: 1 });
      }

      state.cart = cartOnLocal;
      state.cartItemCount = cartOnLocal.length;
      localStorage.setItem("cart", JSON.stringify(cartOnLocal));
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user) {
        const id = user._id;

        let url = `/carts/${id}`;
        const res = apiService.put(url, { cartOnLocal });
        return res.data;
      }
    },

    incrementQuantity: (state, action) => {
      let cartOnLocal = JSON.parse(localStorage.getItem("cart"));
      const item = cartOnLocal.find((item) => item._id === action.payload);
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cartOnLocal));
      state.cart = cartOnLocal;
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user) {
        const id = user._id;

        let url = `/carts/${id}`;
        const res = apiService.put(url, { cartOnLocal });
        return res.data;
      }
    },
    decrementQuantity: (state, action) => {
      let cartOnLocal = JSON.parse(localStorage.getItem("cart"));
      const item = cartOnLocal.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }

      localStorage.setItem("cart", JSON.stringify(cartOnLocal));
      state.cart = cartOnLocal;
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user) {
        const id = user._id;

        let url = `/carts/${id}`;
        const res = apiService.put(url, { cartOnLocal });
        return res.data;
      }
    },
    removeItem: (state, action) => {
      let cartOnLocal = JSON.parse(localStorage.getItem("cart"));
      cartOnLocal = cartOnLocal.filter((item) => item._id !== action.payload);

      state.cart = cartOnLocal;
      state.cartItemCount = cartOnLocal.length;
      localStorage.setItem("cart", JSON.stringify(cartOnLocal));
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (user) {
        const id = user._id;

        let url = `/carts/${id}`;
        const res = apiService.put(url, { cartOnLocal });
        return res.data;
      }
    },
    logInUser: (state, action) => {
      state.cart = action.payload;
      state.cartItemCount = action.payload.length;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    logOutUser: (state) => {
      state.cartItemCount = 0;
      state.cart = [];
      localStorage.removeItem("cart");
      localStorage.removeItem("cartForGoogleUser");
      localStorage.removeItem("user");
    },
    clearCart: (state) => {
      state.cartItemCount = 0;
      state.cart = [];
      localStorage.removeItem("cart");
      localStorage.removeItem("cartForGoogleUser");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });

    builder.addCase(updateCart.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});
export const {
  addToCart,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  logInUser,
  logOutUser,
  clearCart,
  saveCartForGoogleUser,
} = cartSlice.actions;
const { reducer } = cartSlice;

export default reducer;
