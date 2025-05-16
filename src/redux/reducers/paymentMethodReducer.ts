import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: "stripe",
};

export const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    addPaymentMethod: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    },
  },
});

export const { addPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
