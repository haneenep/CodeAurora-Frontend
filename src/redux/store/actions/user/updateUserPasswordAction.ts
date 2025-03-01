import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserPasswordAction = createAsyncThunk(
  "user/updatePassword",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await Api.patch("/auth/change-password", data);

      if (response.data.success) {
        return response.data.success;
      } else {
        return rejectWithValue(response.data)
      }
    } catch (error: any) {
        throw new Error(error)
    }
  }
);
