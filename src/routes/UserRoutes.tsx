import { Routes, Route} from "react-router-dom";
import Signup from "@/pages/auth/Signup";
import Signin from "@/pages/auth/Signin";
import HomePage from "@/pages/user/Home";
import OtpPage from "@/pages/auth/OtpPage";
import ConfirmEmail from "@/pages/auth/ConfirmEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Profile from "@/pages/user/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import EditProfile from "@/components/users/EditProfile";

const UserRoutes = () => {


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
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default UserRoutes;
