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
  async (productId, { rejectWithValue }) => {
    try {
      let url = "/carts/quantity/dec";
      const res = await apiService.put(url, { product_id: productId });
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

export const AddProductQuantity = createAsyncThunk(
  "carts/AddProductQuantity",
  async (productId, { rejectWithValue }) => {
    try {
      let url = "/carts/quantity/inc";
      const res = await apiService.put(url, { product_id: productId });
      const timeout = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("ok");
          }, 1000);
        });
      };
      await timeout();
      console.log(res.data);
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
      return res.data[0];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const assignCartToUser = createAsyncThunk(
  "users/assignCartToUser",
  async ({ user_id }, { rejectWithValue }) => {
    console.log(user_id);
    try {
      let url = `/carts/user`;
      const res = await apiService.put(url, { user_id });
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

export const removeProduct = createAsyncThunk(
  "carts/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      let url = "/carts/product";
      const res = await apiService.delete(url, {
        data: { product_id: productId },
      });
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
  cartItemCount: null,
  loading: false,
  error: null,
};
export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducer: {},
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
    builder.addCase(AddProductQuantity.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(assignCartToUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(removeProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const { items } = action.payload;
      state.cart = action.payload;
      state.cartItemCount = items.length;
    });
    builder.addCase(getProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      const { items } = action.payload;
      state.cart = action.payload;
      state.cartItemCount = items.length;
    });
    builder.addCase(removeProductQuantity.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const { productId } = action.payload;

      const item = state.cart.items.find(
        (item) => item.productId._id === productId
      );

      if (item?.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      item.total = item.quantity * item.price;
    });
    builder.addCase(AddProductQuantity.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const { productId } = action.payload;

      const item = state.cart.items.find(
        (item) => item.productId._id === productId
      );

      item.quantity++;

      item.total = item.quantity * item.price;
    });
    builder.addCase(assignCartToUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = false;
      const { productId, cart } = action.payload;
      console.log(action.payload);
      // state.cart.items = state.cart.items?.filter(
      //   (item) => item.productId._id !== productId
      // );
      let itemIndex = state.cart.items.findIndex(
        (item) => item.productId._id === productId
      );

      if (itemIndex > -1) {
        state.cart.items.splice(itemIndex, 1);
      }
      state.cartItemCount = cart.items.length;
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
    builder.addCase(assignCartToUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(AddProductQuantity.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});
export const { increment } = cartSlice.actions;
const { reducer } = cartSlice;

export default reducer;
