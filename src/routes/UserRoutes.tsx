import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "@/pages/auth/Signup/Signup";
import Signin from "@/pages/auth/Signin/Signin";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
