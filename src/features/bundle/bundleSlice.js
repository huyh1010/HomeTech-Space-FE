import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { CloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

export const getBundles = createAsyncThunk(
  "bundles/getBundles",
  async ({ page, limit, name }, { rejectWithValue }) => {
    try {
      let url = `/bundles?page=${page}&limit=${limit}`;
      if (name) url += `&name=${name}`;

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

export const getSingleBundle = createAsyncThunk(
  "products/getSingleBundle",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/bundles/${id}`;
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

export const updateBundle = createAsyncThunk(
  "products/updateBundle",
  async (
    { id, name, products, description, poster_path, price, imageUrl },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        name,
        products,
        description,
        price,
        imageUrl,
      };

      const posterPath = await CloudinaryUpload(poster_path);
      data.poster_path = posterPath;
      let url = `/bundles/${id}`;
      const res = await apiService.put(url, data);
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
  bundles: [],
  bundle: [],
  productsInBundle: [],

  loading: false,
  error: null,
};

export const bundleSlice = createSlice({
  name: "bundles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getBundles.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSingleBundle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateBundle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getBundles.fulfilled, (state, action) => {
      state.loading = false;
      state.bundles = action.payload;
    });
    builder.addCase(getSingleBundle.fulfilled, (state, action) => {
      state.loading = false;
      state.bundle = action.payload;
    });
    builder.addCase(updateBundle.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product updated");
    });

    builder.addCase(getBundles.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getSingleBundle.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(updateBundle.rejected, (state, action) => {
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

const { reducer } = bundleSlice;
export default reducer;
