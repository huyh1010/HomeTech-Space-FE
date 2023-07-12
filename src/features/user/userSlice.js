import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

// export const assignCartToUser = createAsyncThunk("users/assignCartToUser",  async ({ product_id, quantity = 1 }, { rejectWithValue }) => {
//   try {
//     let url = `/carts/user`;
//     const res = await apiService.post(url, { product_id, quantity });
//     const timeout = () => {
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve("ok");
//         }, 1000);
//       });
//     };
//     await timeout();
//     return res.data;
//   } catch (error) {
//     rejectWithValue(error);
//   }
// })

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  // extraReducers: (builder) => {
  //   builder.addCase(getProducts.pending, (state) => {
  //     state.loading = true;
  //     state.error = "";
  //   });

  //   builder.addCase(.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.products = action.payload;
  //   });

  //   builder.addCase(getSingleProduct.rejected, (state, action) => {
  //     state.loading = false;
  //     if (action.payload) {
  //       state.error = action.payload.message;
  //     } else {
  //       state.error = action.error.message;
  //     }
  //   });
  // },
});

const { reducer } = userSlice;
export default reducer;
