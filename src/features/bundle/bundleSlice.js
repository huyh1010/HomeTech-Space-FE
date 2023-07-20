import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { get } from "react-hook-form";

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

// export const getSingleProduct = createAsyncThunk(
//   "products/getSingleProduct",
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       let url = `/products/${id}`;
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

const initialState = {
  bundles: [],
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

    builder.addCase(getBundles.fulfilled, (state, action) => {
      state.loading = false;
      state.bundles = action.payload;
    });

    builder.addCase(getBundles.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

const { reducer } = bundleSlice;
export default reducer;
