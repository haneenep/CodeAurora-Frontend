import { useSideBar } from "@/context/SideBarContext";
import { Code2, GitPullRequest, LayoutDashboard, LucideLayoutDashboard, TextSelection, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const { isSideBarCollapsed } = useSideBar();

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
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-400 dark:hover:bg-indigo-600"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              to="/problems"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-400 dark:hover:bg-indigo-600"
            >
              <Code2 className="w-5 h-5 mr-3" />
              Problems
            </Link>
            <Link
              to="/test-cases"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-400 dark:hover:bg-indigo-600"
            >
              <TextSelection className="w-5 h-5 mr-3" />
              Test Cases
            </Link>
            <Link
              to="/submissions"
              className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-indigo-400 dark:hover:bg-indigo-600"
            >
              <GitPullRequest className="w-5 h-5 mr-3" />
              Submissions
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
