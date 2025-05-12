import api from "@/api/api";
import { handleApiError } from "@/components/utils/utils";
import { AddressType } from "@/types/AddressSchema";
import { Action, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { RootState } from "../store";
import { addSelectedAddress } from "../reducers/AddressReducer";

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

export const getAddressAction = createAsyncThunk(
  "address/getAddress",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/addresses");
      return data?.data?.content;
    } catch (error: unknown) {
      localStorage.clear();
      console.log(error);
      const parsedError = handleApiError(error);

      return thunkAPI.rejectWithValue(parsedError);
    }
  }
);

export const updateAddressAction = createAsyncThunk(
  "address/update",
  async (data: AddressType, thunkAPI) => {
    try {
      const response = await api.put(`/addresses/${data.addressId}`, data);

      toast.success("Address Updated");
      return response?.data?.data;
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);

export const selectUserCheckoutAddress = (
  data: AddressType
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(addSelectedAddress(data));
  };
};
