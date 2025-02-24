import { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
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

const Header = () => {
  const userData = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const userName = userData?.data?.userName;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setIsModalOpen(false);
    dispatch(logoutAction()).then(() => {
      navigate("/");
    });
  };

  return (
    <>
    {
      isModalOpen && (
        <ConfirmModal 
          message="logout"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )
    }
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
              CodeAurora
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-14">
            <a
              href="/"
              className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors"
            >
              Home
            </a>
            <a
              href="/problems"
              className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors"
            >
              Problems
            </a>
            <a
              href="/community"
              className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors"
            >
              Community
            </a>
          </div>

          {/* Right Section - Auth & Theme */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            {userData?.data ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline">{userName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <Link to={"/user-profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-400/10 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <a
                href="/"
                className="text-gray-700 dark:text-white hover:text-orange-400"
              >
                Home
              </a>
              <a
                href="/problems"
                className="text-gray-700 dark:text-white hover:text-orange-400"
              >
                Problems
              </a>
              <a
                href="/community"
                className="text-gray-700 dark:text-white hover:text-orange-400"
              >
                Community
              </a>
              <div className="flex flex-col space-y-2">
                <a
                  href="/signin"
                  className="px-4 py-2 text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-400/10 rounded-md"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
