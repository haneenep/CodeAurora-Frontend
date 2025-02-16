import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "@/pages/auth/Signup";
import Signin from "@/pages/auth/Signin";
import HomePage from "@/pages/user/Home";
import OtpPage from "@/pages/auth/OtpPage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserRoutes = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    return userData ? <Navigate to={"/"} /> : children;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/otp"
          element={
            <PublicRoute>
              <OtpPage />
            </PublicRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
