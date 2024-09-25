"use client"; 

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; 
import { useRouter } from 'next/navigation'; 
import { Toaster, toast } from "sonner"; 


const Sidebar: React.FC = () => {
  const router = useRouter(); 

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault(); 

    
    await signOut({ redirect: false });
    
    router.push('/login');
    // Toaster.
    router.refresh;

  };

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
          <Link href="/profile/projects/listing/">
            <span className="block py-2 px-4 hover:bg-gray-700">Projects</span>
          </Link>
        </li>
        <li>

          <a href="#" onClick={handleSignOut}>
            <span className="block py-2 px-4 hover:bg-gray-700">Log Out</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
