import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const updateUserNameAction = createAsyncThunk(
    "user/updateProfile", async (value: {userName: string, email: string}, {rejectWithValue}) => {

        try {

            const response = await Api.put(`/auth/user-profile`, value);

            if (response.data.success) {
                return response.data;
            }

            throw new Error(response.data?.message);

        } catch (error) {
            console.log("Get students action Error: ", error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message);
        }
    }
)