import api from "@/api/api";
import { LoginFormData } from "@/components/auth/Login";
import { handleApiError } from "@/components/utils/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const accountLoginAction = createAsyncThunk(
  "auth/authenticateUser",
  async (data: LoginFormData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signin", data);
         
      localStorage.setItem("auth", JSON.stringify(response?.data?.data));

      toast.success("Login success");
      return {
        user: response?.data?.data,
        success: true,
      };
    } catch (error: unknown) {
      const parsedError = handleApiError(error);
     
      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);

export const accountSignUpAction = createAsyncThunk(
  "auth/signupUser",
  async (data: LoginFormData, thunkAPI) => {
    try {
      const response = await api.post("/auth/signup", data);

      toast.success("Register Success");
      return {
        user: response?.data?.data,
        success: true,
      };
    } catch (error: unknown) {
      const parsedError = handleApiError(error);

      toast.error(parsedError);
      return thunkAPI.rejectWithValue({ error: parsedError, success: false });
    }
  }
);




