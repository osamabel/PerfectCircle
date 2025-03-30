'use client';

import { useSession } from 'next-auth/react';
import { Users, FileText, Layout, Clock, SquareMenu } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session } = useSession();
  
  // Quick stats
  const stats = [
    { name: 'Team Members', count: 4, icon: Users, href: '/admin/team', color: 'bg-green-100 text-green-800' },
    { name: 'Blog Posts', count: 0, icon: FileText, href: '/admin/blog', color: 'bg-blue-100 text-blue-800' },
    { name: 'services', count: 0, icon: SquareMenu, href: '/admin/services', color: 'bg-purple-100 text-purple-800' },
    { name: 'Projects', count: 0, icon: Layout, href: '/admin/projects', color: 'bg-purple-100 text-purple-800' },
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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
                        <div className="text-lg font-semibold text-gray-900">{stat.count}</div>
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