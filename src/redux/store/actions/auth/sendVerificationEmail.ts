import { Api } from "@/services/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const sendVerificationEmail = createAsyncThunk(
    "user/sendVerificationEmail", async (email: string,{rejectWithValue}) => {

        try {
            
            const response = await Api.post('/auth/email-verification',{email:email});

            if(response.data.success){
                return response.data;
            } else {

                return rejectWithValue(response.data);
            }

        } catch (error) {
            console.log("send verification failed",error);
            const e: AxiosError = error as AxiosError;
            return rejectWithValue(e.response?.data)
        }
    }
)