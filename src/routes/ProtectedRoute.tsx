import { useAppDispatch } from "@/hooks/useRedux";
import { RootState } from "@/redux/store";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

    const userData = useSelector((state: RootState) => state.user.data);
    const dispatch = useAppDispatch()

  if (userData?.role === "admin") {
    return <Navigate to={"/admin"} />;
  }

  if (userData?.isBlocked) {
    dispatch(logoutAction());
    return <Navigate to={"/signin"}/>
  }

  return userData ? children : <Navigate to={"/signin"} />;
};
