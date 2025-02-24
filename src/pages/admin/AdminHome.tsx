import AdminHeader from "@/components/admins/AdminHeader";
import AdminSidebar from "@/components/admins/AdminSidebar";
import { SideBarProvider } from "@/context/SideBarContext";
import { Outlet } from "react-router-dom";

const AdminHome = () => {
  return (
    <SideBarProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}

        <AdminHeader />

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main Content */}
        <Outlet />
      </div>
    </SideBarProvider>
  );
};

export default AdminHome;
