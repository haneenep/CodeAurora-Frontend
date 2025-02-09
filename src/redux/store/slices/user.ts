import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../actions/auth/signupActions";
import { UserSignupFormType } from "@/types/IForms";


export interface UserStateType {
    loading: boolean;
    data: UserSignupFormType | null;
    error: string | null;
}

const initialState : UserStateType = {
    loading: false,
    data: null,
    error:null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state: UserStateType, action: PayloadAction<UserSignupFormType>) => {
            state.data = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(signupAction.pending, (state: UserStateType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupAction.fulfilled, (state: UserStateType, action: PayloadAction<UserSignupFormType>) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(signupAction.rejected, (state: UserStateType, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message || "Signup failed";
            })
    },
})

export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;