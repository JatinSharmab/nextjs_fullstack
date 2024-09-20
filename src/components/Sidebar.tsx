// src/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard">
            <span className="block py-2 px-4 hover:bg-gray-700">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/analytics">
            <span className="block py-2 px-4 hover:bg-gray-700">Analytics</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/projects">
            <span className="block py-2 px-4 hover:bg-gray-700">Projects</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings">
            <span className="block py-2 px-4 hover:bg-gray-700">Settings</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
