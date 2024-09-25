"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface UserProfile {
  userId: number;
  userFirstName: string;
  userLastName: string;
  userAge: number;
  userEmail: string;
  userPhone: string;
  // userCity: string;
  // userState: string;
  // userCountry: string;
  userGender: string;
}

const ProfilePage = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`/api/v1/user/${session.user?.id}`);
          setProfile(response.data.user);
        } catch (err) {
          setError('Failed to fetch user profile');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [session]);
  const navigateToUpdate=()=>{
    <Link href="/profile/admin"></Link>
  }
  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>
        {profile && (
          <table className="min-w-full bg-white border border-gray-300">
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">First Name</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userFirstName}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Last Name</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userLastName}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Email</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userEmail}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Phone</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userPhone}</td>
              </tr>
              {/* <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">City</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userCity}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">State</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userState}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Country</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userCountry}</td>
              </tr> */}
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Age</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userAge}</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 text-sm font-medium text-gray-500">Gender</td>
                <td className="px-4 py-2 text-sm text-gray-900">{profile.userGender}</td>
              </tr>
            </tbody>
            
          </table>
          
        )}
        <Link href="/profile/update">
         <button

              className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             
     Edit Profile

            </button>
            </Link>
      </div>

  );
};

export default ProfilePage;
