import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ page, limit, name }, { rejectWithValue }) => {
    try {
      let url = `/users?page=${page}&limit=${limit}`;
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

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      let url = "users/data";

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
  userData: [],
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
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      const { user_last_7_days } = action.payload;
      state.userData = user_last_7_days;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error.message;
      }
    });
    builder.addCase(getUserData.rejected, (state, action) => {
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
