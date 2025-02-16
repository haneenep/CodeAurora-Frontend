import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const findUserEmailAction = createAsyncThunk(
    "/user/find-email", async (email: string, {rejectWithValue}) => {

        try {

            const response = await Api.get(`/auth/find-email/${email}`);

            if(response.data.success){
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
            
        } catch (error) {

            const err : any = error as AxiosError;

            throw new Error(err.response?.data.error)
            
        }
    }
)