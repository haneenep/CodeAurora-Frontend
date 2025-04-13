
import AdminDashboard from "@/components/admins/AdminDashboard";
import UserManagement from "@/components/admins/AdminUserManagement";
import AddProblem from "@/components/admins/problems/AddProblem";
import AdminHome from "@/pages/admin/AdminHome";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

const AdminRoutes = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  if (!userData || userData.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminHome />}>
          <Route index element={<AdminDashboard/>}/>
          <Route path="/users" element={<UserManagement/>}/>
          <Route path="/add-problem" element={<AddProblem/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default AdminRoutes;
