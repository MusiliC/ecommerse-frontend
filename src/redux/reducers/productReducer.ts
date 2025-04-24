// productSlice.ts
import { StateType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getProductsAction } from "../actions/ProductionAction";

const initialState: StateType = {
  products: null,
  categories: null,
  pagination: {},
  isLoading: false,
  error: null,
  success: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.products = action.payload?.content;
        state.pagination = {
          pageNumber: action.payload?.pageNumber,
          pageSize: action.payload?.pageSize,
          totalElements: action.payload?.totalElements,
          totalPages: action.payload?.totalPages,
          lastPage: action.payload?.lastPage,
        };
        state.isLoading = false;
        state.success = true;
      })
      .addCase(getProductsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Unknown error occurred";
      });
  },
});

export default productSlice.reducer;
