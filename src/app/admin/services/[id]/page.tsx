'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Service } from '@/lib/models/service';

// Available icons
const availableIcons = [
  'Globe',
  'Layers',
  'TrendingUp',
  'Puzzle',
  'MessageCircle',
  'Settings'
];

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescEn, setShortDescEn] = useState('');
  const [shortDescAr, setShortDescAr] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [icon, setIcon] = useState(availableIcons[0]);
  
  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/services/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Service not found');
          }
          throw new Error('Failed to fetch service');
        }
        
        const service: Service = await response.json();
        
        // Set form values
        setTitleEn(service.title.en || '');
        setTitleAr(service.title.ar || '');
        setSlug(service.slug);
        setShortDescEn(service.short_description.en || '');
        setShortDescAr(service.short_description.ar || '');
        setDescriptionEn(service.description.en || '');
        setDescriptionAr(service.description.ar || '');
        setIcon(service.icon);
      } catch (err) {
        console.error(err);
        setError('Error loading service data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
  }, [params.id]);
  
  // Create slug from string
  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!titleEn || !titleAr || !slug || !shortDescEn || !shortDescAr || !descriptionEn || !descriptionAr || !icon) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Update service
      const response = await fetch(`/api/services/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: {
            en: titleEn,
            ar: titleAr
          },
          slug,
          short_description: {
            en: shortDescEn,
            ar: shortDescAr
          },
          description: {
            en: descriptionEn,
            ar: descriptionAr
          },
          icon
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
      
      // Redirect to services list
      router.push('/admin/services');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Error updating service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/services"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Edit Service</h1>
        </div>
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
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Basic info section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="titleEn"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Web Design"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="titleAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Arabic Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="titleAr"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="تصميم الويب"
                  dir="rtl"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="web-design"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  This will be used in the URL: /services/{slug || 'example-slug'}
                </p>
              </div>
              
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Globe, Layers, Settings, etc."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the exact Lucide icon name. Icons should be capitalized (e.g., Globe, Layers, Settings).
                </p>
              </div>
            </div>
          </div>
          
          {/* Short Description section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Short Description</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="shortDescEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="shortDescEn"
                  value={shortDescEn}
                  onChange={(e) => setShortDescEn(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="A brief description of the service"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="shortDescAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Arabic Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="shortDescAr"
                  value={shortDescAr}
                  onChange={(e) => setShortDescAr(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="وصف مختصر للخدمة"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Full Description section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Full Description</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descriptionEn"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed description of the service"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Arabic Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descriptionAr"
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="وصف مفصل للخدمة"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Form actions */}
        <div className="px-6 py-4 bg-gray-50 text-right space-x-4">
          <Link
            href="/admin/services"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-400 to-cyan-500 hover:from-green-500 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
}