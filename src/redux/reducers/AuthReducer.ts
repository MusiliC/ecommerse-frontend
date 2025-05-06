/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountLoginAction, accountSignUpAction } from "../actions/AuthAction";

interface AuthPayload {
  user: User; // Replace with specific user type if known
  success: boolean;
}

let user = null;
const authString = localStorage.getItem("auth");
if (authString) {
  try {
    user = JSON.parse(authString);
  } catch (error) {
    console.error("Failed to parse auth from localStorage:", error);
    user = null;
  }
}

const initialState: AuthState = {
  user,
  address: null,
  isLoading: false,
  error: null,
  success: false,
};

const handlePending = (state: AuthState) => {
  state.user = null;
  state.isLoading = true;
  state.success = false;
  state.error = null;
};

const handleFulfilled = (
  state: AuthState,
  action: PayloadAction<AuthPayload>
) => {
  state.user = action.payload.user;
  state.isLoading = false;
  state.success = action.payload.success;
  state.error = null;
};

const handleRejected = (state: AuthState, action: any) => {
  state.isLoading = false;
  state.success = false;
  state.error = action.error.message || "Action failed";
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.success = false;
      state.error = null;
      localStorage.removeItem("auth"); // Clear auth from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(accountLoginAction.pending, handlePending)
      .addCase(accountLoginAction.fulfilled, handleFulfilled)
      .addCase(accountLoginAction.rejected, handleRejected)
      .addCase(accountSignUpAction.pending, handlePending)
      .addCase(accountSignUpAction.fulfilled, handleFulfilled)
      .addCase(accountSignUpAction.rejected, handleRejected);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
