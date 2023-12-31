import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { CloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

export const createBundle = createAsyncThunk(
  "bundles/createBundle",
  async (
    { name, products, description, poster_path, price, imageUrl },
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
      let url = `/bundles`;
      const res = await apiService.post(url, data);
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

export const deleteBundle = createAsyncThunk(
  "products/deleteBundle",
  async ({ id }, { rejectWithValue }) => {
    try {
      let url = `/bundles/${id}`;
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
  bundles: [],
  bundle: [],
  productsInBundle: [],
  count: 0,
  loading: false,
  error: null,
};

export const bundleSlice = createSlice({
  name: "bundles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createBundle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
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
    builder.addCase(deleteBundle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createBundle.fulfilled, (state, action) => {
      state.loading = false;
      state.bundles = action.payload;
      toast.success("Bundle created");
    });
    builder.addCase(getBundles.fulfilled, (state, action) => {
      state.loading = false;
      state.bundles = action.payload;
      state.count = action.payload.count;
    });
    builder.addCase(getSingleBundle.fulfilled, (state, action) => {
      state.loading = false;
      state.bundle = action.payload;
    });
    builder.addCase(updateBundle.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product updated");
    });
    builder.addCase(deleteBundle.fulfilled, (state, action) => {
      state.loading = false;

      const { bundle, count } = action.payload;
      const id = bundle._id;

      state.bundles.bundles = state.bundles.bundles.filter(
        (product) => product._id !== id
      );
      state.count = count;
      toast.success("Bundle deleted");
    });
    builder.addCase(createBundle.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
        toast.error(action.payload.message);
      } else {
        state.error = action.error.message;
        toast.error(action.error.message);
      }
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
    builder.addCase(deleteBundle.rejected, (state, action) => {
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
