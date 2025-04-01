'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Search, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface BlogPost {
  id: string;
  title: Record<string, string>;
  slug: string;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  featured_image: string;
  author_id: string;
  author?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function BlogsPage() {
  const { data: session } = useSession();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const data = await response.json();
      setBlogPosts(data);
    } catch (err) {
      setError('Error loading blog posts. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load blog posts on component mount
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  
  // Filter blog posts based on search term
  const filteredPosts = blogPosts.filter(post => 
    post.title['en']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author?.name && post.author.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }
      
      // Remove deleted post from state
      setBlogPosts(prevPosts => 
        prevPosts.filter(post => post.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert('Error deleting blog post. Please try again.');
    }
  };
  
  // Handle publish/unpublish
  const handlePublishToggle = async (id: string, currentStatus: string) => {
    try {
      const method = currentStatus === 'published' ? 'DELETE' : 'POST';
      const response = await fetch(`/api/blogs/${id}/publish`, {
        method,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${currentStatus === 'published' ? 'unpublish' : 'publish'} blog post`);
      }
      
      const updatedPost = await response.json();
      
      // Update post in state
      setBlogPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error(err);
      alert(`Error ${currentStatus === 'published' ? 'unpublishing' : 'publishing'} blog post. Please try again.`);
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-green-400 to-cyan-500 text-white rounded-lg hover:from-green-500 hover:to-cyan-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Post
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
            placeholder="Search blog posts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={fetchBlogPosts}
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
      
      {/* Blog posts list */}
      {!isLoading && filteredPosts.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">
            {searchTerm ? 'No matching blog posts found.' : 'No blog posts yet.'}
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
      
      {!isLoading && filteredPosts.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {post.featured_image && (
                          <div className="h-10 w-10 flex-shrink-0 mr-4">
                            <Image 
                              src={post.featured_image} 
                              alt={post.title.en || 'Blog post image'}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.title.en}</div>
                          <div className="text-sm text-gray-500">{post.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.author?.name || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handlePublishToggle(post.id, post.status)}
                        className={`mr-3 ${
                          post.status === 'published' 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {post.status === 'published' ? (
                          <EyeOff size={18} className="inline" />
                        ) : (
                          <Eye size={18} className="inline" />
                        )}
                      </button>
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit"
                      >
                        <Edit size={18} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
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