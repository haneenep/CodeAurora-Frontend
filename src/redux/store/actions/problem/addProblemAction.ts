import { adminEndPoints } from "@/constants/endPointUrl";
import { Api } from "@/services/axios";
import { ProblemData } from "@/types/IProblems";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const addProblemAction = createAsyncThunk(
  "problem/addProblem",
  async (data: ProblemData, { rejectWithValue }) => {

    try {

      const response = await Api.post(adminEndPoints.ADD_PROBLEM, data);

      if (response.data.success) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }

    } catch (error) {

      const err: AxiosError = error as AxiosError;
      return rejectWithValue(err.response?.data || err.message);

    }
  }
);
