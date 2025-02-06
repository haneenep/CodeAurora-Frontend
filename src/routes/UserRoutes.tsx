import {
  Routes,
  Route,
} from "react-router-dom";

import Signup from "@/pages/auth/Signup/Signup";
import Signin from "@/pages/auth/Signin/Signin";
import HomePage from "@/pages/user/Home";

const UserRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/"  element={<HomePage/>}/>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </>
  );
};

export default UserRoutes;
