import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      let url = "/categories";
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
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
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
