import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { AddressType } from "@/types/AddressSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const createAddressAction = createAsyncThunk(
  "address/create",
  async (data: AddressType, thunkAPI) => {
    try {
      const response = await api.post("/addresses", data);

      toast.success("Address Created");
      return response?.data?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);


// export const getProductsAction = createAsyncThunk(
//   "address/getAddress",
//   async (_, thunkAPI) => {
//     try {

//       const { data } = await api.get("/addresses", {
//         params: paramsObject,
//       });
//       return data.data;
//     } catch (error: unknown) {
//       localStorage.clear();
//       console.log(error);
//       const parsedError = handleApiError(error);

//       return thunkAPI.rejectWithValue(parsedError);
//     }
//   }
// );
