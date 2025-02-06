import { useState } from 'react';
import { Menu } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggler';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
          <a href="/" className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors">
            Home
          </a>
          <a href="/problems" className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors">
            Problems
          </a>
          <a href="/community" className="text-gray-700 dark:text-white hover:text-orange-400 dark:hover:text-orange-400 transition-colors">
            Community
          </a>
        </div>

        {/* Right Section - Auth & Theme */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to={"/signin"} className="px-4 py-2 text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-400/10 rounded-md transition-colors">
              Sign In
            </Link>
            <Link to={"/signup"} className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
              Sign Up
            </Link>
          </div>

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
            <a href="/" className="text-gray-700 dark:text-white hover:text-orange-400">
              Home
            </a>
            <a href="/problems" className="text-gray-700 dark:text-white hover:text-orange-400">
              Problems
            </a>
            <a href="/community" className="text-gray-700 dark:text-white hover:text-orange-400">
              Community
            </a>
            <div className="flex flex-col space-y-2">
              <a href="/signin" className="px-4 py-2 text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-400/10 rounded-md">
                Sign In
              </a>
              <a href="/signup" className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;