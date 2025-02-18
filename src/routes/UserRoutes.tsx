import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "@/pages/auth/Signup";
import Signin from "@/pages/auth/Signin";
import HomePage from "@/pages/user/Home";
import OtpPage from "@/pages/auth/OtpPage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ConfirmEmail from "@/pages/auth/ConfirmEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Profile from "@/pages/user/Profile";

const UserRoutes = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  const PublicRoute = ({ children }: { children: JSX.Element }) => {
    if (userData?.role === "admin") {
      return <Navigate to={"/admin"} />;
    }
    return userData ? <Navigate to={"/"} /> : children;
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (userData?.role === "admin") {
      return <Navigate to={"/admin"} />;
    }
    return userData ? children : <Navigate to={"/signin"} />;
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/confirm-mail"
          element={
            <PublicRoute>
              <ConfirmEmail />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoutes;
