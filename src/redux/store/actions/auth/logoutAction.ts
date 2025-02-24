import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.delete("/auth/logout");

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
        const err: AxiosError = error as AxiosError;
        return rejectWithValue(err.response?.data || err.message); 
    }
  }
);
