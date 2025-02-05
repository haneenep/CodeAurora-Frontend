// import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const Header = () => {

  const { theme,toggleTheme } = useTheme();

  return (

    <>
    <nav className="bg-white shadow-md px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
            CodeAurora
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-14">
          <a href="/" className="text-gray-700 hover:text-orange-400 transition-colors">
            Home
          </a>
          <a href="/problems" className="text-gray-700 hover:text-orange-400 transition-colors">
            Problems
          </a>
          <a href="/community" className="text-gray-700 hover:text-orange-400 transition-colors">
            Community
          </a>
        </div>

        {/* Right Section - Auth & Theme */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          <button className="px-4 py-2 text-orange-400 hover:bg-orange-100 rounded-md transition-colors">
            Sign In
          </button>
          
          <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-300 transition-colors">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Header
