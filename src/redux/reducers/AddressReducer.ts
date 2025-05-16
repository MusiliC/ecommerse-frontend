import { StateType } from "@/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createAddressAction,
  deleteAddressAction,
  getAddressAction,
  updateAddressAction,
} from "../actions/AddressAction";
import { RootState } from "../store";

const initialState: StateType = {
  products: null,
  categories: null,
  address: null,
  selectedCheckoutAddress: null,
  pagination: {},
  isLoading: false,
  error: null,
  success: false,
};

const handlePending = (state: StateType) => {
  state.address = null;
  state.isLoading = true;
  state.success = false;
  state.error = null;
};

const handleFulfilled = (state: StateType, action: PayloadAction<any>) => {
  state.address = action.payload;
  state.isLoading = false;
  state.success = action.payload.success;
  state.error = null;
};

const handleRejected = (state: StateType, action: any) => {
  state.isLoading = false;
  state.success = false;
  state.error = action.error.message || "Action failed";
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addSelectedAddress: (state, action) => {
      state.selectedCheckoutAddress = action.payload;
    },
    clearCheckoutAddress: (state) => {
      state.selectedCheckoutAddress = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddressAction.pending, handlePending)
      .addCase(createAddressAction.fulfilled, handleFulfilled)
      .addCase(createAddressAction.rejected, handleRejected)
      .addCase(getAddressAction.pending, handlePending)
      .addCase(getAddressAction.fulfilled, handleFulfilled)
      .addCase(getAddressAction.rejected, handleRejected)
      .addCase(updateAddressAction.pending, handlePending)
      .addCase(updateAddressAction.fulfilled, handleFulfilled)
      .addCase(updateAddressAction.rejected, handleRejected)
      .addCase(deleteAddressAction.pending, handlePending)
      .addCase(deleteAddressAction.fulfilled, handleFulfilled)
      .addCase(deleteAddressAction.rejected, handleRejected);
  },
});

export default addressSlice.reducer;

const selectedAddress = (state: RootState) => state.address;

// Selector for the address array only
export const selectAddress = createSelector(
  [selectedAddress],
  (address) => address.address
);

export const { addSelectedAddress } = addressSlice.actions;
