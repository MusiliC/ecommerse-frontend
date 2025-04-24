import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsAction = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("public/products");
      return data.data;
    } catch (error: unknown) {
      localStorage.clear();
      console.log(error);
      const parsedError = handleApiError(error);

      return thunkAPI.rejectWithValue(parsedError);
    }
  }
);
