// productSlice.ts
import { StateType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesAction } from "../actions/CategoriesAction";

const initialState: StateType = {
  products: null,
  categories: null,
  pagination: {},
  isLoading: false,
  error: null,
  success: false,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {   
    builder
      .addCase(getCategoriesAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoriesAction.fulfilled, (state, action) => {
        state.categories = action.payload?.content;
        state.pagination = {
          pageNumber: action.payload?.pageNumber,
          pageSize: action.payload?.pageSize,
          totalElements: action.payload?.totalElements,
          totalPages: action.payload?.totalPages,
          lastPage: action.payload?.lastPage,
        };
        state.isLoading = false;
        state.success = true;
        state.isLoading = false;
        state.success = true;
      })
      .addCase(getCategoriesAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Unknown error occurred";
      });
  },
});

export default categorySlice.reducer;
