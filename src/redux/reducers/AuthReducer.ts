import { AuthState, User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accountLoginAction } from "../actions/AuthAction";
import { RootState } from "../store";

const authString = localStorage.getItem("auth");

const user = authString ? JSON.parse(authString) : [];

const initialState: AuthState = {
  user: null,
  address: null,
  isLoading: false,
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

		builder
      .addCase(accountLoginAction.pending, (state) => {
        state.user = null;
        state.isLoading = true;
      })
      .addCase(
        accountLoginAction.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user = action.payload?.user;
          state.isLoading = false;
        }
      )
      .addCase(accountLoginAction.rejected, (state) => {
        state.isLoading = false;
      });

  }
});

export default authSlice.reducer;

