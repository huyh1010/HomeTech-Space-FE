import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { CloudinaryUpload } from "../../utils/cloudinary";
import { toast } from "react-toastify";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (
    {
      brand,
      category,
      description,
      dimension_size,
      features,
      name,
      poster_path,
      price,
      weight_kg,
      imageUrl,
    },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        brand,
        category,
        description,
        dimension_size,
        features,
        name,
        price,
        weight_kg,
        imageUrl,
      };

      const posterPath = await CloudinaryUpload(poster_path);
      data.poster_path = posterPath;
      let url = `/products`;
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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    {
      id,
      brand,
      category,
      description,
      dimension_size,
      features,
      name,
      poster_path,
      price,
      weight_kg,
      imageUrl,
    },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        brand,
        category,
        description,
        dimension_size,
        features,
        name,
        price,
        weight_kg,
        imageUrl,
      };

      const posterPath = await CloudinaryUpload(poster_path);
      data.poster_path = posterPath;
      let url = `/products/${id}`;
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
  totalPages: 0,
  count: 0,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSingleProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      toast.success("Product created");
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;

      state.products = action.payload;
      state.count = action.payload.count;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product updated");
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;

      const { product, count } = action.payload;
      const id = product._id;

      state.products.products = state.products.products.filter(
        (product) => product._id !== id
      );
      state.count = count;
      toast.success("Product deleted");
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
        toast.error(action.payload.message);
      } else {
        state.error = action.error.message;
        toast.error(action.error.message);
      }
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
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
        toast.error(action.payload.message);
      } else {
        state.error = action.error.message;
        toast.error(action.error.message);
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

const { reducer } = productSlice;
export default reducer;
