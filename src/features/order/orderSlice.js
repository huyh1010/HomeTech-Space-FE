import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const createOrder = createAsyncThunk(
  "products/GetProducts",
  async ({ customer_info, cart, user_id }, { rejectWithValue }) => {
    try {
      let url = `/orders`;

      const res = await apiService.post(url, { customer_info, cart, user_id });
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

export const getSingleOrder = createAsyncThunk(
  "orders/getSingleOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/orders/${id}`;
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
  order: [],
  orderId: null,
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSingleOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { orderId } = action.payload;
      state.orderId = orderId;
    });
    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.order = action.payload;
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getSingleOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

const { reducer } = orderSlice;
export default reducer;
