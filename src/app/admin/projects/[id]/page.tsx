'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';
import { Project } from '@/lib/models/project';
import CustomImage from '@/components/CustomImageProps';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [client, setClient] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/projects/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Project not found');
          }
          throw new Error('Failed to fetch project');
        }
        
        const project: Project = await response.json();
        
        // Set form values
        setTitleEn(project.title.en || '');
        setTitleAr(project.title.ar || '');
        setSlug(project.slug);
        setDescriptionEn(project.description.en || '');
        setDescriptionAr(project.description.ar || '');
        setContentEn(project.content.en || '');
        setContentAr(project.content.ar || '');
        setClient(project.client || '');
        setCategory(project.category || '');
        setStatus(project.status || 'draft');
        setFeaturedImage(project.featured_image || '');
      } catch (err) {
        console.error(err);
        setError('Error loading project data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
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
  
  // Handle image selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size should be less than 5MB');
      return;
    }
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError(null);
  };
  
  // Remove selected image
  const removeSelectedImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };
  
  // Remove existing image
  const removeExistingImage = () => {
    setFeaturedImage('');
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!titleEn || !titleAr || !slug || !descriptionEn || !descriptionAr || !contentEn || !contentAr) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Upload new image if selected
      let imageUrl = featuredImage;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      // Update data object
      const updateData = {
        title: {
          en: titleEn,
          ar: titleAr
        },
        slug,
        description: {
          en: descriptionEn,
          ar: descriptionAr
        },
        content: {
          en: contentEn,
          ar: contentAr
        },
        featured_image: imageUrl,
        client,
        category,
        status
      };
      
      // Update the project
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      
      // Redirect to projects list
      router.push('/admin/projects');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Error updating project. Please try again.');
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
            href="/admin/projects"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Edit Project</h1>
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
                  placeholder="E-commerce Website"
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
                  placeholder="موقع التجارة الإلكترونية"
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
                  placeholder="e-commerce-website"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  This will be used in the URL: /projects/{slug || 'example-slug'}
                </p>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <input
                  type="text"
                  id="client"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Client name"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Web Development, Design, Marketing, etc."
                />
              </div>
            </div>
            
            {/* Featured Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                {imagePreview ? (
                  <div className="space-y-2 text-center">
                    <div className="relative w-40 h-40 mx-auto">
                      <Image
                        src={imagePreview}
                        alt="New image preview"
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeSelectedImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{imageFile?.name}</p>
                  </div>
                ) : featuredImage ? (
                  <div className="space-y-2 text-center">
                    <div className="relative w-40 h-40 mx-auto">
                      <CustomImage
                        src={featuredImage}
                        alt="Current featured image"
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeExistingImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Current image</p>
                  </div>
                ) : (
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Description section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Short Description</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="descriptionEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descriptionEn"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="A brief description of the project"
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
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="وصف موجز للمشروع"
                  dir="rtl"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Full Content</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contentEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contentEn"
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Detailed content of the project"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contentAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Arabic Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contentAr"
                  value={contentAr}
                  onChange={(e) => setContentAr(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="المحتوى التفصيلي للمشروع"
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
            href="/admin/projects"
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
            {isSubmitting ? 'Saving...' : 'Update Project'}
          </button>
        </div>
      </form>
    </div>
  );
}