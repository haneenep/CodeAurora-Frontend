import { ProblemData } from "@/types/IProblems";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProblemAction } from "../actions/problem/addProblemAction";


export interface ProblemStateType {
    items: ProblemData[];
    loading: boolean;
    error: string | null;
    currentProblem: ProblemData | null;
}

const initialState: ProblemStateType = {
    items: [],
    loading: false,
    error: null,
    currentProblem: null,
}


const problemSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        setCurrentProblems: (state: ProblemStateType, action: PayloadAction<ProblemData>) => {
            state.currentProblem = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            // add problems
            .addCase(addProblemAction.pending, (state: ProblemStateType) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProblemAction.fulfilled, (state: ProblemStateType, action: PayloadAction<ProblemData>) => {
                state.loading = false;
                state.items.push(action.payload);
                state.error = null;
            })
            .addCase(addProblemAction.rejected, (state: ProblemStateType, action) => {
                state.loading = false;
                state.error = action.error.message || "problem adding failed"
            })
    },
})


export const { setCurrentProblems } = problemSlice.actions;

export const problemReducer = problemSlice.reducer;