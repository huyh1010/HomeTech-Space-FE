import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getProducts = createAsyncThunk(
  "products/GetProducts",
  async ({ page, name, category, limit, price }, { rejectWithValue }) => {
    try {
      let url = `/products?page=${page}&limit=${limit}`;
      if (name) url += `&name=${name}`;
      if (category) url += `&category=${category}`;
      if (price) url += `&price=${price}`;
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

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/products/${id}`;
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/products/${id}`;
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

const initialState = {
  newProducts: [],
  products: [],
  product: [],
  count: 0,
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSingleProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.count = action.payload.count;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;

      const { product, count } = action.payload;
      const id = product._id;

      state.products.products = state.products.products.filter(
        (product) => product._id !== id
      );
      state.count = count;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

const { reducer } = categorySlice;
export default reducer;
