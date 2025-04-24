// productSlice.ts
import { StateType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getProductsAction } from "../actions/ProductionAction";

const initialState: StateType = {
  products: null,
  categories: null,
  pagination: {},
  loading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.products = action.payload?.data.content;
        state.pagination = {
          pageNumber: action.payload?.data.pageNumber,
          pageSize: action.payload?.data.pageSize,
          totalElements: action.payload?.data.totalElements,
          totalPages: action.payload?.data.totalPages,
          lastPage: action.payload?.data.lastPage,
        };
        state.loading = false;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
