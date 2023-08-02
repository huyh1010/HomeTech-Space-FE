import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      let url = `/users?page=${page}&limit=${limit}`;
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
  users: [],
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

const { reducer } = userSlice;
export default reducer;
