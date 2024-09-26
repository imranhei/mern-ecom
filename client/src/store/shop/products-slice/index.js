import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  loading: false,
  productDetails: null,
};

export const fecthAllFilteredProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fecthProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthAllFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fecthAllFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
      })
      .addCase(fecthAllFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.productList = [];
      }).addCase(fecthProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fecthProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fecthProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
