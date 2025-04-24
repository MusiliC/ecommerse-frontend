import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsAction = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const {data} = await api.get("public/products");
      return {
        data: data.data,
        success: true,
      };
    } catch (error: unknown) {
      localStorage.clear();
      console.log(error);
      const parsedError = handleApiError(error);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);
