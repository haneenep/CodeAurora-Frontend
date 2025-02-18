import Dashboard from "@/components/admin/AdminDashboard";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminUserManagement from "@/components/admin/AdminUserManagement";
import { useAppDispatch } from "@/hooks/useRedux";
import { RootState } from "@/redux/store";
import { getAllUsersAction } from "@/redux/store/actions/user/fetchAllUserAction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AdminHome: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const users = useSelector((state: RootState) => state.user.data || []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeTab === "users") {
      dispatch(getAllUsersAction());
    }
  }, [activeTab, dispatch]);

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 overflow-hidden flex flex-col">
        <AdminHeader 
          title={activeTab === "dashboard" ? "Dashboard" : "User Management"} 
        />

        <main className="p-6 overflow-auto flex-1">
          {activeTab === "users" ? (
            <AdminUserManagement
              users={users}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          ) : (
            <Dashboard />
          )}
        </main>
      </div>
    </div>
  );
};