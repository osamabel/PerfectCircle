'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Users, FileText, Layout, Clock, SquareMenu } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [teamCount, setTeamCount] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch data counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        
        // Fetch team members count
        const teamResponse = await fetch('/api/team');
        if (teamResponse.ok) {
          const teamData = await teamResponse.json();
          setTeamCount(teamData.length);
        }
        
        // Fetch services count
        const servicesResponse = await fetch('/api/services');
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json();
          setServicesCount(servicesData.length);
        }
        
        // Fetch projects count
        const projectsResponse = await fetch('/api/projects');
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setProjectsCount(projectsData.length);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCounts();
  }, []);
  
  // Quick stats
  const stats = [
    { name: 'Team Members', count: teamCount, icon: Users, href: '/admin/team', color: 'bg-green-100 text-green-800' },
    { name: 'Services', count: servicesCount, icon: SquareMenu, href: '/admin/services', color: 'bg-blue-100 text-blue-800' },
    { name: 'Projects', count: projectsCount, icon: Layout, href: '/admin/projects', color: 'bg-indigo-100 text-indigo-800' },
    { name: 'Blog Posts', count: 0, icon: FileText, href: '/admin/blog', color: 'bg-purple-100 text-purple-800' },
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">👋 Welcome, {session?.user?.name || 'Admin'}</h2>
        <p className="text-gray-600">
          This is your admin dashboard. From here you can manage your website's content.
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link 
              key={stat.name} 
              href={stat.href} 
              className="bg-white overflow-hidden rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-md ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        {isLoading ? (
                          <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
                        ) : (
                          <div className="text-lg font-semibold text-gray-900">{stat.count}</div>
                        )}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <div className="font-medium text-cyan-600 hover:text-cyan-500">
                    View all
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Recent activity placeholder */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" /> Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500">
            Your recent activities will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}