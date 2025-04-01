'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  title: Record<string, string>;
  slug: string;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  featured_image: string;
  author_id: string;
  author?: {
    name: string;
    email: string;
    role: string;
  };
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function BlogSection() {
  const locale = useLocale();
  const t = useTranslations('Blogs');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch published blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        
        // Get all blog posts
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const allPosts = await response.json();
        
        // Filter published posts only and limit to recent posts (maximum 3)
        const publishedPosts = allPosts
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => {
            // Sort by published_at date (newest first)
            return new Date(b.published_at || b.created_at).getTime() - 
                   new Date(a.published_at || a.created_at).getTime();
          })
          .slice(0, 3)
          .map((post: any) => ({
            ...post,
            title: JSON.parse(post.title),  // Convert title from JSON string to object
            excerpt: JSON.parse(post.excerpt),
            content: JSON.parse(post.content)
          }));
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }
  
  // If no published posts, don't show the section
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <section id='blogs' className="py-16 bg-[#242424]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wider text-green-400 mb-4">
            {t('latestBlog')}
          </h2>
          <h3 className="text-4xl text-gray-200 font-bold mb-6">
            {t('recentPosts')}
          </h3>
          <p className="max-w-2xl mx-auto text-gray-400">
            {locale === 'ar' 
              ? 'اطلع على أحدث المقالات والأفكار من فريقنا، حيث نشارك رؤى وتحليلات حول التصميم والتطوير والتسويق الرقمي.'
              : 'Check out the latest articles and insights from our team, where we share perspectives and analysis on design, development, and digital marketing.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                {post.featured_image ? (
                  <Image
                    src={post.featured_image}
                    alt={post.title[locale] || ''}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              
              {/* Post Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.published_at || post.created_at}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3">
                  {post.title[locale] || post.title['en']}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                  {post.excerpt?.[locale] || post.excerpt?.['en'] || 
                   post.content[locale]?.substring(0, 150) || 
                   post.content['en']?.substring(0, 150)}...
                </p>
                
                {/* Read More Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center text-[#65DBA8] hover:underline"
                >
                  <span>{t('readMore')}</span>
                  <ArrowRight className={`h-4 w-4 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#65DBA8] hover:bg-green-500 transition-colors"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}