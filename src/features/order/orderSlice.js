import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

import { toast } from "react-toastify";

export const createOrder = createAsyncThunk(
  "products/GetProducts",
  async ({ customer_info, cart, user_id, totalPrice }, { rejectWithValue }) => {
    try {
      let url = `/orders`;

      const res = await apiService.post(url, {
        customer_info,
        cart,
        user_id,
        totalPrice,
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

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (
    { page, limit, name, status, payment_status, payment_method },

    { rejectWithValue }
  ) => {
    try {
      let url = `/orders?page=${page}&limit=${limit}`;
      if (name) url += `&name=${name}`;
      if (status) url += `&status=${status}`;
      if (payment_status) url += `&payment_status=${payment_status}`;
      if (payment_method) url += `&payment_method=${payment_method}`;

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

export const getOrderSales = createAsyncThunk(
  "orders/getOrderSales",
  async (
    _,

    { rejectWithValue }
  ) => {
    try {
      let url = "/orders/sales";

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

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/orders/${id}`;
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

export const getUserOrder = createAsyncThunk(
  "/orders/getUserOrder",
  async ({ user_id, page, limit }, { rejectWithValue }) => {
    try {
      let url = `/orders/user/${user_id}?page=${page}&limit=${limit}`;
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

export const updateOrder = createAsyncThunk(
  "/orders/updateOrder",
  async ({ status, payment_status, id }, { rejectWithValue }) => {
    try {
      let url = `/orders/${id}`;
      const res = await apiService.put(url, { status, payment_status });
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
  orders: [],
  order: [],
  orderId: null,
  orderLast7Days: [],
  orderLast30Days: [],
  totalPages: 0,
  count: 0,
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
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getOrderSales.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSingleOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(cancelOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { orderId } = action.payload;
      state.orderId = orderId;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.loading = false;
      const { orders, totalPages, count } = action.payload;
      state.orders = orders;
      state.totalPages = totalPages;
      state.count = count;
    });
    builder.addCase(getOrderSales.fulfilled, (state, action) => {
      state.loading = false;
      const { order_last_7_days, order_last_30_days } = action.payload;
      state.orderLast7Days = order_last_7_days;
      state.orderLast30Days = order_last_30_days;
    });
    builder.addCase(getSingleOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { orderId, order } = action.payload;
      state.order = order;
      state.orderId = orderId;
    });
    builder.addCase(getUserOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { count, order, totalPages } = action.payload;
      state.orders = order;
      state.count = count;
      state.totalPages = totalPages;
    });
    builder.addCase(cancelOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { order, count } = action.payload;
      const id = order._id;
      const filteredOrder = state.orders.filter((order) => order._id !== id);
      state.orders = filteredOrder;
      state.count = count;

      toast.success("Order canceled");
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.loading = false;
      const { status, payment_status } = action.payload;

      let order = state.order;
      order.status = status;
      order.payment_status = payment_status;
      toast.success("Order updated");
    });

    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getOrderSales.rejected, (state, action) => {
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
    builder.addCase(getUserOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(cancelOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
        toast.error(action.payload.message);
      } else {
        state.error = action.error.message;
        toast.error(action.error.message);
      }
    });
  },
});

const { reducer } = orderSlice;
export default reducer;
