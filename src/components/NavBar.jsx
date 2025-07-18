import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ query, setQuery, handleSearch, darkMode, setDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b shadow dark:border-gray-700 transition-colors duration-300 md:shadow-lg md:dark:shadow-none md:rounded-b-lg md:dark:bg-gray-800 md:border-b-0 dark:md:border-gray-700 dark:md:shadow-lg dark:md:shadow-gray-800 dark:md:rounded-b-lg dark:md:border-b-0">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between">
       
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            🎬Asap Movies App
          </h1>

     
          <button
            className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
       
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:justify-center md:w-auto mt-3 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-medium text-gray-800 dark:text-gray-300 text-center">
            <li>
              <Link
                to="/"
                className="block px-8 py-4 rounded-full bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="block px-8 py-4 rounded-full bg-blue-100 dark:bg-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </div>

        {/* Search & Theme Toggle */}
        <div className="mt-3 md:mt-0 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                    <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            className="order-1 sm:order-2 w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
