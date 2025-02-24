import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const userData = useSelector((state: RootState) => state.user.data);

  if (userData?.role === "admin") {
    return <Navigate to={"/admin"} />;
  }
  return userData ? <Navigate to={"/"} /> : children;
};
