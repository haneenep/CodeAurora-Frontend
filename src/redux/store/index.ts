import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./slices/user"
import { problemReducer } from "./slices/problem";


export const store = configureStore({
    reducer: {
        user: userReducer,
        problems: problemReducer,
    }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType < typeof store.getState >;