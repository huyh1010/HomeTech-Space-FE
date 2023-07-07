import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const addProductToCart = createAsyncThunk(
  "carts/addProductToCart",
  async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
    try {
      let url = `/carts`;
      const res = await apiService.post(url, { product_id, quantity });
      const timeout = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      };
      await timeout();
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const removeProductQuantity = createAsyncThunk(
  "carts/removeProductQuantity",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      let url = `/carts/quantity/${product_id}`;
      const res = await apiService.delete(url);
      const timeout = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      };
      await timeout();
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getProductFromCart = createAsyncThunk(
  "carts/getProductFromCart",
  async (_, { rejectWithValue }) => {
    try {
      let url = `/carts`;
      const res = await apiService.get(url);
      const timeout = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      };
      await timeout();
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: [],
  totalPrice: 0,
  loading: false,
  error: null,
};
export const cartSlice = createSlice({
  name: "carts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProductToCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeProductQuantity.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(removeProductQuantity.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getProductFromCart.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(removeProductQuantity.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

const { reducer } = cartSlice;
export default reducer;
