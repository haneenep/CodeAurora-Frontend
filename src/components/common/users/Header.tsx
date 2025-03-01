import { useState } from "react";
import { Menu, User, LogOut, Settings, Code } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggler";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks/useRedux";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";
import ConfirmModal from "../modal/ConfirmModal";

interface NavLinkProps {
  href: string;
  label: string;
}

const Header = () => {
  const userData = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userProfile = userData?.data?.profileImage;

  const userName = userData?.data?.userName;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    setIsModalOpen(false);
    await dispatch(logoutAction())
      navigate("/signin");
  };

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          message="logout"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="relative h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                <Code className="h-5 w-5 text-white absolute" />
              </div>
              <span className="ml-2.5 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                CodeAurora
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/problems" label="Problems" />
            <NavLink href="/community" label="Community" />
          </div>

          {/* Right Section - Auth & Theme */}
          <div className="flex items-center space-x-3">
            <ModeToggle />
            {userData?.data ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                    {userProfile ? 
                    <img
                    src={userProfile}
                    className="h-8 w-8 rounded-full"
                    alt="Profile Preview"
                  /> : userData.data.userName.charAt(0).toUpperCase()}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 p-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
                  <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {userData?.data?.email || "user@example.com"}
                    </p>
                  </div>
                  <div className="p-1">
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md">
                      <User className="h-4 w-4 text-indigo-500" />
                      <Link to={"/user-profile"} className="flex-1">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md">
                      <Settings className="h-4 w-4 text-indigo-500" />
                      <Link to={"/settings"} className="flex-1">Settings</Link>
                    </DropdownMenuItem>
                  </div>
                  <div className="p-1 border-t border-gray-100 dark:border-gray-800">
                    <DropdownMenuItem
                      className="flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-2 rounded-md"
                      onClick={handleLogoutClick}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg z-50">
            <div className="flex flex-col p-4 space-y-3">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/problems" label="Problems" />
              <MobileNavLink href="/community" label="Community" />
              <MobileNavLink href="/learn" label="Learn" />
              
              {!userData?.data && (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-medium"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

// Desktop nav link component
const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <a
    href={href}
    className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
  >
    {label}
  </a>
);

// Mobile nav link component
const MobileNavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <a
    href={href}
    className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md font-medium"
  >
    {label}
  </a>
  );


export default Header;