import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsersAction = createAsyncThunk(
  "admin/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Api.get("/auth/get-all-users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);