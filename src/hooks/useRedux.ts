import {useDispatch} from "react-redux";
import { AppDispatch } from "@/redux/store";

export const useAppDispatch = () => {
    return useDispatch<AppDispatch>();
};