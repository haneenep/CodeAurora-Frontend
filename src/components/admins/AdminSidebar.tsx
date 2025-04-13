import { useSideBar } from "@/context/SideBarContext";
import {
  ChevronDown,
  ChevronRight,
  Code2,
  GitPullRequest,
  List,
  PlusCircle,
  TextSelection,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const { isSideBarCollapsed } = useSideBar();
  const [isProblemsOpen, setIsProblemsOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(location, currentPath, "pathhhh");

  const toggleProblemsDropDown = () => {
    setIsProblemsOpen(!isProblemsOpen);
  };

  const isActive = (path: string) => {
    return currentPath === path;
  };

  const isProblemsActive = () => {
    return (
      currentPath.includes("/admin/add-problem") ||
      currentPath.includes("/admin/problems")
    );
  };

  useEffect(() => {
    if (isProblemsActive() && !isProblemsOpen) {
      setIsProblemsOpen(true);
    }
  }, [currentPath, isProblemsOpen]);

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen pt-14 transition-transform ${
          isSideBarCollapsed ? "-translate-x-full" : "translate-x-0"
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="space-y-2">
            <Link
              to="/admin/users"
              className={`flex items-center px-3 py-2 rounded-lg ${
                isActive("/admin/users")
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-indigo-400 dark:hover:bg-indigo-600"
              }`}
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <div className="space-y-1">
              <button
                onClick={toggleProblemsDropDown}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg ${
                  isProblemsActive()
                    ? "bg-indigo-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-indigo-400 dark:hover:bg-indigo-600"
                }`}
              >
                <div className="flex items-center">
                  <Code2 className="w-5 h-5 mr-3" />
                  Problems
                </div>
                {isProblemsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isProblemsOpen && (
                <div className="pl-6 space-y-1">
                  <Link
                    to="/admin/add-problem"
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActive("/admin/add-problem")
                        ? "bg-indigo-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-indigo-400 dark:hover:bg-indigo-600"
                    }`}
                  >
                    <PlusCircle className="w-4 h-4 mr-3" />
                    Add Problem
                  </Link>
                  <Link
                    to="/admin/problems"
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      isActive("/admin/problems")
                        ? "bg-indigo-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-indigo-400 dark:hover:bg-indigo-600"
                    }`}
                  >
                    <List className="w-4 h-4 mr-3" />
                    View Problems
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/submissions"
              className={`flex items-center px-3 py-2 rounded-lg ${
                isActive("/submissions")
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-indigo-400 dark:hover:bg-indigo-600"
              }`}
            >
              <TextSelection className="w-5 h-5 mr-3" />
              Test Cases
            </Link>
            {/* <Link
              to="/contests"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Award className="w-5 h-5 mr-3" />
              Contests
            </Link> */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
