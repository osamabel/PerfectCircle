'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';
import { useSession } from 'next-auth/react';

export default function NewBlogPostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form data
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [excerptAr, setExcerptAr] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentAr, setContentAr] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Generate slug from English title
  const handleTitleEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitleEn(value);
    
    // Auto-generate slug if user hasn't manually edited it
    if (!slug || slug === createSlug(titleEn)) {
      setSlug(createSlug(value));
    }
  };
  
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
  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!titleEn || !titleAr || !slug || !contentEn || !contentAr) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Upload image if provided
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      // Create blog post
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: {
            en: titleEn,
            ar: titleAr
          },
          slug,
          excerpt: {
            en: excerptEn,
            ar: excerptAr
          },
          content: {
            en: contentEn,
            ar: contentAr
          },
          featured_image: imageUrl,
          status
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }
      
      // Redirect to blogs list
      router.push('/admin/blog');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Error creating blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/blog"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Add New Blog Post</h1>
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
                  onChange={handleTitleEnChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="How to Build a Website"
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
                  placeholder="كيفية بناء موقع ويب"
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
                  placeholder="how-to-build-a-website"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  This will be used in the URL: /blog/{slug || 'example-slug'}
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
                        alt="Image preview"
                        fill
                        className="rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{imageFile?.name}</p>
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
          
          {/* Excerpt section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Excerpt</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="excerptEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Excerpt
                </label>
                <textarea
                  id="excerptEn"
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="A brief summary of the blog post"
                />
                <p className="mt-1 text-xs text-gray-500">
                  A short summary of your post. If not provided, an excerpt will be generated from the content.
                </p>
              </div>
              
              <div>
                <label htmlFor="excerptAr" className="block text-sm font-medium text-gray-700 mb-1">
                  Arabic Excerpt
                </label>
                <textarea
                  id="excerptAr"
                  value={excerptAr}
                  onChange={(e) => setExcerptAr(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="ملخص موجز للمقالة"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium border-b pb-2">Content</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contentEn" className="block text-sm font-medium text-gray-700 mb-1">
                  English Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contentEn"
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your blog post content here..."
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
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
                  placeholder="محتوى مقال المدونة هنا..."
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
            href="/admin/blog"
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
            {isSubmitting ? 'Saving...' : 'Save Blog Post'}
          </button>
        </div>
      </form>
    </div>
  );
}