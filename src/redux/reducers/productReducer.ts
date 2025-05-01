// productSlice.ts
import { ProductType, StateType } from "@/types";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getProductsAction } from "../actions/ProductionAction";
import { getCategoriesAction } from "../actions/CategoriesAction";
import { RootState } from "../store";

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


const selectProducts = (state:RootState) => state.products;

// Selector for the products array only
export const selectProductList = createSelector(
  [selectProducts],
  (products) => products.products
);

// New selector to find a product by productId

export const selectProductById = createSelector(  
  [selectProductList, (_, productId: number) => productId],
  (products, productId): ProductType | undefined =>
    
    products?.find((item) => item.productId === productId)
);

export default productSlice.reducer;
