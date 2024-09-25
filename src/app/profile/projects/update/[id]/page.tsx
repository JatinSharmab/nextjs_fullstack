"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProjSchema } from '@/components/schema'; // Your Zod validation schema for projects
import { useParams, useRouter } from 'next/navigation';

interface Project {
  projectId: number;
  projectName: string;
  projectTechnology: string;
  projectStatus: string;
  projectManagementTool: string;
  projectRepoTool: string;
}


const EditProjectPage = ({ projectId }: { projectId: number }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const id = useParams().id
  console.log(id)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Project>({
    resolver: zodResolver(AddProjSchema),
  });

  // Fetch project data when the page loads
  useEffect(() => {
    const fetchProject = async () => {
      try {
        console.log("============before=----------------------")
        const response = await axios.get(`/api/v1/projects/getProject/${id}`);
        console.log("============After=----------------------")

        const projectData = response.data.user;

        // Set the form values with the fetched project data
        setValue('projectName', projectData.projectName);
        setValue('projectTechnology', projectData.projectTechnology);
        setValue('projectStatus', projectData.projectStatus);
        setValue('projectManagementTool', projectData.projectManagementTool);
        setValue('projectRepoTool', projectData.projectRepoTool);
      } catch (err) {
        setError('Failed to fetch project data');
      } finally {
        setLoading(false);
      }
    };
    fetchProject()
    // if (session && id) {
    //   fetchProject();
    // }
  }, []);

  // Submit handler for updating the project data
  const onSubmit = async (data: Project) => {
    try {
      console.log('Form data:', data);
      await axios.put(`/api/v1/projects/listing/${projectId}`, data);
      toast.success('Project updated successfully!');
      router.push("/projects");
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project');
      toast.error('Error updating project');
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!session || !session.user?.id) {
    return <p className="text-center text-red-500">Session not available.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Edit Project</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              {...register('projectName')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Technology</label>
            <input
            
              type="text"
              {...register('projectTechnology')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectTechnology && <p className="text-red-500">{errors.projectTechnology.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('projectStatus')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.projectStatus && <p className="text-red-500">{errors.projectStatus.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Management Tool</label>
            <select
              {...register('projectManagementTool')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Trello">Trello</option>
              <option value="Jira">Jira</option>
            </select>
            {errors.projectManagementTool && <p className="text-red-500">{errors.projectManagementTool.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Repository Tool</label>
            <select
              {...register('projectRepoTool')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="GitHub">GitHub</option>
              <option value="GitLab">GitLab</option>
            </select>
            {errors.projectRepoTool && <p className="text-red-500">{errors.projectRepoTool.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProjectPage;
