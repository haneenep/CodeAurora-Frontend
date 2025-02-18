import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const forgotPasswordMailAction = createAsyncThunk(
  "user/forgotPasswordMail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/forgot-password-mail", {email});

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      const e: AxiosError = error as AxiosError;
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
