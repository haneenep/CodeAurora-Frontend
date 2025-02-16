import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const verifyOtpAction = createAsyncThunk(
    "/user/verifyOtp", async (data: {email: string, otp: string}, {rejectWithValue}) => {
        
        try {
            
            const response = await Api.post("/auth/verify-otp", data);

            if(response.data.success){
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }

        } catch (error) {

            console.error(error);

        }
    } 
)