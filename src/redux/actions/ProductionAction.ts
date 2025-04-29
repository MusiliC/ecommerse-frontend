import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProductsAction = createAsyncThunk(
  "products/getProducts",
  async (params: URLSearchParams | Record<string, any>, thunkAPI) => {
    try {
         const paramsObject = params
           ? params instanceof URLSearchParams
             ? Object.fromEntries(params.entries())
             : params
           : {};

      const { data } = await api.get("public/products", {
        params: paramsObject,
      });
      return data.data;
    } catch (error: unknown) {
      localStorage.clear();
      console.log(error);
      const parsedError = handleApiError(error);

      return thunkAPI.rejectWithValue(parsedError);
    }
  }
);


