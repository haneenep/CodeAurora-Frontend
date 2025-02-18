import { Api } from "@/services/axios";
import { IGoogleAuth } from "@/types/IGAuth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const googleAuthAction = createAsyncThunk(
  "user/googleAuth",
  async (credentials: IGoogleAuth, { rejectWithValue }) => {
    try {
      const response = await Api.post("/auth/google-auth", credentials);

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
        console.log(error,"google authentication error");
        const e: AxiosError = error as AxiosError;
        return rejectWithValue(e.response?.data || e.message)
    }
  }
);
