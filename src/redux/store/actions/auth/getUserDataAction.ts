import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const getUserDataAction = createAsyncThunk(
    "user/getUserData", async (_,{rejectWithValue}) => {

        try {
            
            const response = await Api.get("/auth/get-userdata");

            console.log(response,"get userssssss")

            if(response.data.success){
                return response.data
            } else {
                return rejectWithValue(response.data)
            }

        } catch (error) {
            
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data || e.message)
        }
    }
)