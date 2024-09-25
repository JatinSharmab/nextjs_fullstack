"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema } from '@/components/schema';
import { useRouter } from 'next/navigation';

interface UserProfile {
    userId: number;
    userFirstName: string;
    userLastName: string;
    userAge: number;
    userEmail: string;
    userPhone: string;
    userGender: string;
}

const UpdateProfilePage = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfile>({
    resolver: zodResolver(updateProfileSchema),
  });

  
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  
  useEffect(() => {
    if (session) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`/api/v1/user/${session.user?.id}`);
          const userProfile = response.data.user;

          
          setValue('userFirstName', userProfile.userFirstName);
          setValue('userLastName', userProfile.userLastName);
          setValue('userEmail', userProfile.userEmail);
          setValue('userPhone', userProfile.userPhone);
          setValue('userAge', userProfile.userAge);
          setValue('userGender', userProfile.userGender);
        } catch (err) {
          setError('Failed to fetch user profile');
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [session, setValue]);

  
  const onSubmit = async (data: UserProfile) => {
    try {
      console.log('Form data:', data); 
      await axios.put(`/api/v1/user/${session?.user?.id}`, data);
      toast.success('Profile updated successfully!');
      router.push("/profile/me");
    } catch (err) {
      console.error('Error updating profile:', err); 
      setError('Failed to update user profile');
      toast.error('Error updating profile');
    }
  };

  
  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  
  if (!session || !session.user?.id) {
    return <p className="text-center text-red-500">Session not available.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              {...register('userFirstName')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.userFirstName && <p className="text-red-500">{errors.userFirstName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('userLastName')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.userLastName && <p className="text-red-500">{errors.userLastName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('userEmail')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.userEmail && <p className="text-red-500">{errors.userEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              {...register('userPhone')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.userPhone && <p className="text-red-500">{errors.userPhone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register('userAge')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.userAge && <p className="text-red-500">{errors.userAge.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('userGender')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.userGender && <p className="text-red-500">{errors.userGender.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
