"use client";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner'; 
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddProjSchema } from '@/components/schema';

interface ProjectForm {
  projectTechnology: string;
  projectName: string;
  projectStatus: string;
  projectLead: string;
  projectManager: string;
  projectClient: string;
  projectManagementTool: string;
  projectManagementToolUrl: string;
  projectRepoTool: string;
  projectRepoToolUrl: string;
  projectDescription: string;
}

const AddProjectPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectForm>({
    resolver:zodResolver(AddProjSchema)
  });

  const onSubmit = async (data: ProjectForm) => {
    setLoading(true);
    try {
      await axios.post(`/api/v1/projects/listing/${1}`, data);
      toast.success('Project added successfully!');
      router.push("listing");
    } catch (err) {
      console.error('Error adding project:', err); 
      toast.error('Error adding project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Project</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              {...register('projectName')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              {...register('projectStatus')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectStatus && <p className="text-red-500">{errors.projectStatus.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Lead</label>
            <input
              type="text"
              {...register('projectLead')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectLead && <p className="text-red-500">{errors.projectLead.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Manager</label>
            <input
              type="text"
              {...register('projectManager')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectManager && <p className="text-red-500">{errors.projectManager.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Project Client</label>
            <input
              type="text"
              {...register('projectClient')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectClient && <p className="text-red-500">{errors.projectClient.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Management Tool</label>
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
            <label className="block text-sm font-medium text-gray-700">Management Tool URL</label>
            <input
              type="text"
              {...register('projectManagementToolUrl')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectManagementToolUrl && <p className="text-red-500">{errors.projectManagementToolUrl.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Repository Tool</label>
            <select
              {...register('projectRepoTool')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="GitLab">GitLab</option>
              <option value="GitHub">GitHub</option>
            </select>
            {errors.projectRepoTool && <p className="text-red-500">{errors.projectRepoTool.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Repository Tool URL</label>
            <input
              type="text"
              {...register('projectRepoToolUrl')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.projectRepoToolUrl && <p className="text-red-500">{errors.projectRepoToolUrl.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            {...register('projectDescription')}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.projectDescription && <p className="text-red-500">{errors.projectDescription.message}</p>}
        </div>

        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProjectPage;
