'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

type TeamMember = {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  displayOrder: number;
};

export default function TeamAdminPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await fetch('/api/team');
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('Error loading team members. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchTeamMembers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/team/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete team member');
        }

        setTeamMembers(teamMembers.filter(member => member.id !== id));
      } catch (error) {
        console.error('Error deleting team member:', error);
        setError('Failed to delete team member');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
            <Link
              href="/admin/team/new"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add New Member
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-10 bg-white shadow rounded-lg">
              <p className="text-gray-500">No team members found. Add your first team member!</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <li key={member.id}>
                    <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 relative">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.position}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/team/edit/${member.id}`}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 border border-blue-600 rounded-md"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="text-red-600 hover:text-red-900 px-3 py-1 border border-red-600 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}