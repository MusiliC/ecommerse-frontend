import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategoriesAction = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
  

      const { data } = await api.get("public/categories");
      return data.data;
    } catch (error: unknown) {
      localStorage.clear();
      console.log(error);
      const parsedError = handleApiError(error);

      return thunkAPI.rejectWithValue(parsedError);
    }
  }
);
