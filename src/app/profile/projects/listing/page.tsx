"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaSyncAlt, FaSort,FaTrash} from 'react-icons/fa';  // Importing icons from react-icons
import Link from 'next/link';
import axios from 'axios';

interface Project {
  projectId: string;
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

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Project | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5); 
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`/api/v1/projects/listing/${1}`);
        const data = await res.json();

        if (data.user) {
          setProjects(data.user);
        } else {
          console.error('Error: Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Sort function
  const handleSort = (field: keyof Project) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    const sortedProjects = [...projects].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setProjects(sortedProjects);
  };

  // Pagination: Calculate the current projects based on page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects
    .filter(project =>
      project.projectName.toLowerCase().includes(searchQuery) ||
      project.projectTechnology.toLowerCase().includes(searchQuery)
    )
    .slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Edit and Update actions
  const handleEdit = (id: string) => {
    // router.push(`/projects/edit/${projectId}`);
    router.push(`update/${id}`);

    // <Link href={`update/${projectId}`}></Link>

  };

  const handleDelete = async (projectId: string) => {
    try {
      const response = await axios.patch(`/api/v1/projects/listing/${projectId}`);
      
      if (response.status === 200) {
        console.log("Project deleted successfully");
        // You can add toast notification or refresh the list here
      } else {
        console.error("Failed to delete the project");
      }
    } catch (error) {
      console.error("Error deleting the project:", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">Loading...</div>;
  }

  if (projects.length === 0) {
    return <div className="min-h-screen bg-gray-900 text-white p-8">No projects found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project Listing</h1>
        <input
          type="text"
          placeholder="Search projects..."
          className="px-4 py-2 rounded bg-gray-700 text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
       <Link href="add"><button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Add Project
        </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              {[
                { label: "Technology", field: "projectTechnology" },
                { label: "Project Name", field: "projectName" },
                { label: "Status", field: "projectStatus" },
                { label: "Lead", field: "projectLead" },
                { label: "Manager", field: "projectManager" },
                { label: "Client", field: "projectClient" },
                { label: "Management Tool", field: "projectManagementTool" },
                { label: "Repo Tool", field: "projectRepoTool" },
                { label: "Description", field: "projectDescription" },
              ].map((header) => (
                <th
                  key={header.label}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header.field as keyof Project)}
                >
                  {header.label} <FaSort className="inline-block ml-1" />
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {currentProjects.map((project) => (
              <tr key={project.projectId}>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectTechnology}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectLead}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectManager}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectClient}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectManagementTool}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectRepoTool}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.projectDescription}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="text-yellow-400 hover:text-yellow-500 transition duration-200"
                      onClick={() => handleEdit(project.projectId)}
                    >
                      <FaEdit className="w-5 h-5" />
                    </button>
                    <button
    className="text-red-400 hover:text-red-500 transition duration-200"
    onClick={() => handleDelete(project.projectId)}
  >
    <FaTrash className="w-5 h-5" />
  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
