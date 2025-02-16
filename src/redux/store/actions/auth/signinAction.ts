import { Api } from "@/services/axios";
import { UserSiginFormType } from "@/types/IForms";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


export const signinAction = createAsyncThunk(
    'user/signin', async (data: UserSiginFormType , {rejectWithValue}) => {

        try {

            const response = await Api.post("/auth/signin", data);

        if(response.data.success){
            return response.data;
        } else {
            return rejectWithValue(response.data);
        }
            
        } catch (error) {
            const err : any = error as AxiosError;
            return rejectWithValue(err.response?.data);

        }
    }
)