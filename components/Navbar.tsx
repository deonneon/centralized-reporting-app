"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-100">
          Executive Reporting Hub
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/request" className="text-gray-300 hover:text-gray-100">
            Submit Request
          </Link>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-gray-100"
            >
              Reports ▼
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1">
                <Link
                  href="/reports/sales"
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                  onClick={closeDropdown}
                >
                  Sales Reports
                </Link>
                <Link
                  href="/reports/finance"
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                  onClick={closeDropdown}
                >
                  Financial Reports
                </Link>
                <Link
                  href="/reports/operations"
                  className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-600"
                  onClick={closeDropdown}
                >
                  Operations Reports
                </Link>
              </div>
            )}
          </div>
          <Link href="/dashboard" className="text-gray-300 hover:text-gray-100">
            Dashboard
          </Link>
          <input
            type="search"
            placeholder="Search reports..."
            className="px-2 py-1 border rounded bg-gray-700 text-gray-100"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
