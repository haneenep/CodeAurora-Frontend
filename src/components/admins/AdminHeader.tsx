import { LogOut, Menu, User } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggler";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import { useAppDispatch } from "@/hooks/useRedux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSideBar } from "@/context/SideBarContext";
import ConfirmModal from "../common/modal/ConfirmModal";


const AdminHeader = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const adminData = useSelector((state: RootState) => state.user);

  const userName = adminData.data?.userName || "Admin";

  const handleLogoutClick = () => {
    setIsModalOpen(true)
  };
  const handleLogout = () => {
    setIsModalOpen(false)
    dispatch(logoutAction()).then(() => {
      navigate("/");
    });
  };

  const { toggleSidebar } = useSideBar();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {
      isModalOpen && (
        <ConfirmModal 
          message="logout"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )
    }
        <div className="px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link to='/'>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                CodeAurora
              </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{userName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogoutClick}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default AdminHeader;