import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { getSingleProduct } from "../product/productSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

export const createCart = createAsyncThunk(
  "carts/createCart",
  async ({ user_id, cart }, { rejectWithValue }) => {
    try {
      let url = "/carts";
      const res = await apiService.post(url, { user_id, cart });
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
export const updateCart = createAsyncThunk(
  "carts/updateCart",
  async ({ id, cart }, { rejectWithValue }) => {
    try {
      console.log(cart);
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
// after login ,back to cart
// in login ,dispatch update cart with data from local storage
// merge cart if cart exists
// update cart with user id
// then in cart page
export const getProductFromCart = createAsyncThunk(
  "carts/getProductFromCart",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const user = JSON.parse(window.localStorage.getItem("user"));
      if (accessToken && user) {
        //if accesstoken or user => use api, else use localstorage
        const id = user._id;
        let url = `/carts/user/${id}`;

        const res = await apiService.get(url);
        const timeout = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve("ok");
            }, 1000);
          });
        };
        await timeout();

        return res.data.cart;
      } else {
        const cart = JSON.parse(window.localStorage.getItem("cart"));
        return cart;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// export const getProductFromUserCart = createAsyncThunk(
//   "carts/getProductFromUserCart",
//   async (id, { rejectWithValue }) => {
//     console.log(id);
//     try {
//       let url = `/carts/user/${id}`;

//       const res = await apiService.get(url);
//       const timeout = () => {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             resolve("ok");
//           }, 1000);
//         });
//       };
//       await timeout();
//       return res.data;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );

// export const assignCartToUser = createAsyncThunk(
//   "users/assignCartToUser",
//   async ({ user_id, cart_id }, { rejectWithValue }) => {
//     try {
//       let url = `/carts/user`;
//       const res = await apiService.put(url, { user_id, cart_id });
//       const timeout = () => {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             resolve("ok");
//           }, 1000);
//         });
//       };
//       await timeout();
//       return res.data;
//     } catch (error) {
//       rejectWithValue(error);
//     }
//   }
// );

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
// const cart =
//   localStorage.getItem("cart") !== null
//     ? JSON.parse(localStorage.getItem("cart"))
//     : [];
// console.log(cart);
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
      console.log(action.payload);
      const itemInCart = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.cartItemCount = action.payload.length;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item._id !== action.payload
      );
      state.cart = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProductFromCart.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    // builder.addCase(getProductFromUserCart.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
    // builder.addCase(removeProductQuantity.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
    // builder.addCase(AddProductQuantity.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
    // builder.addCase(assignCartToUser.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });
    // builder.addCase(removeProduct.pending, (state) => {
    //   state.loading = true;
    //   state.error = "";
    // });

    builder.addCase(createCart.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
    builder.addCase(getProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
      console.log(action.payload);
    });

    // builder.addCase(getProductFromUserCart.fulfilled, (state, action) => {
    //   state.loading = false;

    //   state.cart = action.payload;
    //   state.cartItemCount = action.payload.length;
    // });
    // builder.addCase(removeProductQuantity.fulfilled, (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    //   const { productId } = action.payload;

    //   const item = state.cart.items.find(
    //     (item) => item.productId._id === productId
    //   );

    //   if (item?.quantity === 1) {
    //     item.quantity = 1;
    //   } else {
    //     item.quantity--;
    //   }
    //   item.total = item.quantity * item.price;
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // });
    // builder.addCase(AddProductQuantity.fulfilled, (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    //   const { productId } = action.payload;

    //   const item = state.cart.items.find(
    //     (item) => item.productId._id === productId
    //   );

    //   item.quantity++;

    //   item.total = item.quantity * item.price;
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // });
    // builder.addCase(assignCartToUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   console.log(action.payload);
    //   state.cart = action.payload;
    // });
    // builder.addCase(removeProduct.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const { productId, cart } = action.payload;
    //   console.log(action.payload);
    //   // state.cart.items = state.cart.items?.filter(
    //   //   (item) => item.productId._id !== productId
    //   // );
    //   let itemIndex = state.cart.items.findIndex(
    //     (item) => item.productId._id === productId
    //   );

    //   if (itemIndex > -1) {
    //     state.cart.items.splice(itemIndex, 1);
    //   }
    //   state.cartItemCount = cart.items.length;
    //   localStorage.setItem("cart", JSON.stringify(state.cart));
    // });

    builder.addCase(createCart.rejected, (state, action) => {
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

    // builder.addCase(getProductFromUserCart.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload) {
    //     state.error = action.payload.message;
    //   } else {
    //     state.error = action.error.message;
    //   }
    // });
    // builder.addCase(removeProductQuantity.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload) {
    //     state.error = action.payload.message;
    //   } else {
    //     state.error = action.error.message;
    //   }
    // });
    // builder.addCase(assignCartToUser.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload) {
    //     state.error = action.payload.message;
    //   } else {
    //     state.error = action.error.message;
    //   }
    // });
    // builder.addCase(AddProductQuantity.rejected, (state, action) => {
    //   state.loading = false;
    //   if (action.payload) {
    //     state.error = action.payload.message;
    //   } else {
    //     state.error = action.error.message;
    //   }
    // });
  },
});
export const {
  addToCart,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
} = cartSlice.actions;
const { reducer } = cartSlice;

export default reducer;
