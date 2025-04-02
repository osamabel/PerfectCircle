'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Search, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/models/project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch projects
  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Error loading projects. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title['en']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      
      // Remove deleted project from state
      setProjects(prevProjects => 
        prevProjects.filter(project => project.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert('Error deleting project. Please try again.');
    }
  };
  
  // Handle publish/unpublish
  const handlePublishToggle = async (id: string, currentStatus: string) => {
    try {
      const method = currentStatus === 'published' ? 'DELETE' : 'POST';
      const response = await fetch(`/api/projects/${id}/publish`, {
        method,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${currentStatus === 'published' ? 'unpublish' : 'publish'} project`);
      }
      
      const updatedProject = await response.json();
      
      // Update project in state
      setProjects(prevProjects => 
        prevProjects.map(project => 
          project.id === id ? updatedProject : project
        )
      );
    } catch (err) {
      console.error(err);
      alert(`Error ${currentStatus === 'published' ? 'unpublishing' : 'publishing'} project. Please try again.`);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-lg hover:from-green-500 hover:to-cyan-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Project
        </Link>
      </div>
      
      {/* Search and refresh */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={fetchProjects}
          className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isLoading}
        >
          <RefreshCw size={18} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      
      {/* Projects list */}
      {!isLoading && filteredProjects.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            {searchTerm ? 'No matching projects found.' : 'No projects yet.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-2 text-cyan-600 hover:text-cyan-500"
            >
              Clear search
            </button>
          )}
        </div>
      )}
      
      {!isLoading && filteredProjects.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {project.featured_image && (
                          <div className="h-10 w-10 flex-shrink-0 mr-4">
                            <Image 
                              src={project.featured_image} 
                              alt={project.title.en || 'Project image'}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded object-cover"
                            />
                            <img 
                              src={project.featured_image} 
                              alt={project.title.en || 'Project image'}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.title.en}</div>
                          <div className="text-sm text-gray-500">{project.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.client || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{project.category || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        project.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handlePublishToggle(project.id, project.status)}
                        className={`mr-3 ${
                          project.status === 'published' 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {project.status === 'published' ? (
                          <EyeOff size={18} className="inline" />
                        ) : (
                          <Eye size={18} className="inline" />
                        )}
                      </button>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit"
                      >
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}