import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../actions/auth/signupActions";
import { UserSignupFormType } from "@/types/IForms";
import { verifyOtpAction } from "../actions/auth/verifyOtpAction";
import { signinAction } from "../actions/auth/signinAction";
import { getUserDataAction } from "../actions/auth/getUserDataAction";
import { logoutAction } from "../actions/auth/logoutAction";


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

            //  signup user
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

            // otp verifying
            .addCase(verifyOtpAction.pending, (state: UserStateType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtpAction.fulfilled, (state: UserStateType, action) => {
                state.loading = false;
                state.data = action.payload.data
                state.error = null;
            })
            .addCase(verifyOtpAction.rejected, (state: UserStateType, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message || "Verification failed";
            })

            // signin user
            .addCase(signinAction.pending,(state: UserStateType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinAction.fulfilled, (state: UserStateType, action) => {
                state.loading = false;
                state.data = action.payload?.data;
                state.error = null;
            })
            .addCase(signinAction.rejected, (state: UserStateType, action) => {
                state.loading = false;
                state.error = action.error.message || 'login failed';
                state.data = null;
            })
            // get users data
            .addCase(getUserDataAction.pending,(state: UserStateType) => {
                state.loading = true;
            })
            .addCase(getUserDataAction.fulfilled, (state: UserStateType, action: PayloadAction<{data: UserSignupFormType}>) => {
                state.loading = false;
                state.data = action.payload?.data;
                state.error = null;
            })
            .addCase(getUserDataAction.rejected, (state: UserStateType, action) => {
                state.loading = false;
                state.error = action.error.message || 'login failed';
                state.data = null;
            })
            .addCase(logoutAction.pending, (state: UserStateType) => {
                state.loading = true
            }) 
            .addCase(logoutAction.fulfilled, (state: UserStateType) => {
                state.loading = false;
                state.data = null;
                state.error = null;
            }) 
            .addCase(logoutAction.rejected, (state: UserStateType, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error.message || "Logout failed";
            }) 
    },
})

export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;