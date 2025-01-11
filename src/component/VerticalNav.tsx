import React from 'react';
import { Link } from 'react-router-dom';


const VerticalNav: React.FC = () => {
  return (
    <nav className="w-2/12  flex flex-col h-screen bg-white border-r border-gray-200" id="navbarVertical">
      <div className="flex flex-col justify-between flex-grow px-4 py-3">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <img
            src="src/assets/images/Green%20Vintage%20Agriculture%20and%20Crops%20Farming%20Logo.png"
            alt="Logo"
            className="w-36"
          />
          {/* Toggler */}
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div id="sidebarCollapse" className="hidden lg:block mt-6">
          <ul className="space-y-3">
            <li>
              <Link
                id="dashboard"
                to="/dashboard"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="bx bxs-home mr-3"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link
                id="staff"
                to="/staff"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="bx bxs-user mr-3"></i> Staff
              </Link>
            </li>
            <li>
              <Link
                id="field"
                to="/field"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="bx bxs-spa mr-3"></i> Field
              </Link>
            </li>
            <li>
              <Link
                id="crop"
                to="/crop"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="fa-solid fa-seedling mr-3"></i> Crop
              </Link>
            </li>
            <li>
              <Link
                id="vehicle"
                to="/vehicle"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="fa-solid fa-truck mr-3"></i> Vehicle
              </Link>
            </li>
            <li id="equipment">
              <Link
                to="/equipment"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="fa-solid fa-screwdriver-wrench mr-3"></i> Equipment
              </Link>
            </li>
            <li>
              <Link
                id="logs"
                to="/logs"
                className="flex items-center text-lg text-gray-700 hover:text-green-600"
              >
                <i className="fa-solid fa-blog mr-3"></i> Logs
              </Link>
            </li>
          </ul>
        </div>

        {/* User */}
        <div className="mt-auto">
          <ul className="space-y-3">
            <li>
              <Link
                to="/index.html"
                className="flex items-center text-lg text-gray-700 hover:text-red-600"
              >
                <i className="bi bi-person-square mr-3"></i> Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default VerticalNav;
