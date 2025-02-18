import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const resetPasswordAction = createAsyncThunk(
	"user/resetPassword", async (data: {token: string, password: string}, { rejectWithValue }) => {
		try {
			const response = await Api.post("/auth/reset-password", data);

			if (response.data.success) {
				return response.data;
			} else {
				return rejectWithValue(response.data);
			}
		} catch (error: any) {
			const e: AxiosError = error as AxiosError;
			return rejectWithValue(e.response?.data || e.message);
		}
	}
);
