export function Navigation() {
  return (
    <>
      <nav className="flex flex-col lg:flex-row lg:h-screen bg-white border-b lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-4 py-3 lg:py-5 border-b lg:border-b-0">
          {/* Toggler */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            type="button"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {/* Brand */}
          <img
            src="assets/images/Green%20Vintage%20Agriculture%20and%20Crops%20Farming%20Logo.png"
            alt="Logo"
            className="w-36"
          />
          {/* User menu (mobile) */}
          <div className="relative lg:hidden">
            <button
              type="button"
              className="focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {/* Avatar Icon Placeholder */}
            </button>
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden"
              aria-labelledby="sidebarAvatar"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Billing
              </a>
              <div className="border-t"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Collapse */}
        <div className="collapse lg:block flex-grow">
          <ul className="space-y-4 p-4 text-lg text-gray-700">
            <li>
              <a
                href="#"
                id="dashboard"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="bx bxs-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="staff"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="bx bxs-user"></i>
                <span>Staff</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="field"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="bx bxs-spa"></i>
                <span>Field</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="crop"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="fa-solid fa-seedling"></i>
                <span>Crop</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="vehicle"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="fa-solid fa-truck"></i>
                <span>Vehicle</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="equipment"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <span>Equipment</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                id="logs"
                className="flex items-center space-x-2 hover:text-gray-900"
              >
                <i className="fa-solid fa-blog"></i>
                <span>Logs</span>
              </a>
            </li>
          </ul>

          {/* Logout Section */}
          <div className="mt-auto p-4">
            <a
              href="index.html"
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <i className="bi bi-person-square"></i>
              <span>Log out</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
