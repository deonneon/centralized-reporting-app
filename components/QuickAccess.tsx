import React from "react";
import Link from "next/link";

const QuickAccess: React.FC = () => {
  const quickLinks = [
    { label: "New Report Request", href: "/request" },
    { label: "View All Reports", href: "/reports" },
    { label: "Financial Dashboard", href: "/dashboard/financial" },
    { label: "Sales Overview", href: "/dashboard/sales" },
  ];

  return (
    <div className="p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
      <div className="space-y-2">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded transition duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
