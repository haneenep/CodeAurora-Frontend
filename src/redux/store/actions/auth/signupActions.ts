import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "@/services/axios";
import { UserSignupFormType } from "@/types/IForms";
import { AxiosError } from "axios";


export const signupAction = createAsyncThunk(
    "user/signup",
     async (data: UserSignupFormType, {rejectWithValue}) => {

        try {
            
            const response = await Api.post('/api/auth/signup',data);

            if(response.data.success){

                return response.data;
            } else {
                
                return rejectWithValue(response.data);
            }
        } catch (error) {

            const err: AxiosError = error as AxiosError;
            return rejectWithValue(err.response?.data || err.message);
        }
     })