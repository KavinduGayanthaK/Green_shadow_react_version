import React from 'react';

const VerticalNav: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Brand</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              About
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VerticalNav;
