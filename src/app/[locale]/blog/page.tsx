'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowRight, Calendar, Search } from 'lucide-react';

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

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('Blogs');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
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
        
        // Filter published posts only
        const publishedPosts = allPosts
          .map((post: any) => ({
            ...post,
            title: JSON.parse(post.title),  // Convert title from JSON string to object
            excerpt: JSON.parse(post.excerpt),
            content: JSON.parse(post.content)
          }))
          .filter((post: BlogPost) => post.status === 'published')
          .sort((a: BlogPost, b: BlogPost) => {
            // Sort by published_at date (newest first)
            return new Date(b.published_at || b.created_at).getTime() - 
                   new Date(a.published_at || a.created_at).getTime();
          });
        
        setPosts(publishedPosts);
        setFilteredPosts(publishedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Filter posts based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post => {
      const titleMatch = post.title[locale]?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.title['en']?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const excerptMatch = post.excerpt?.[locale]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt?.['en']?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const contentMatch = post.content[locale]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content['en']?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return titleMatch || excerptMatch || contentMatch;
    });
    
    setFilteredPosts(filtered);
  }, [searchTerm, posts, locale]);
  
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-[#242424] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('blogTitle')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'أحدث المقالات والرؤى والتحليلات من فريقنا من الخبراء' 
                : 'Latest articles, insights, and analysis from our team of experts'}
            </p>
          </div>
        </section>
        
        {/* Search bar */}
        <div className="bg-white border-b py-4 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={locale === 'ar' ? 'بحث في المقالات...' : 'Search articles...'}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                dir={locale === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </div>
        </div>
        
        {/* Blog posts grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500 mb-4">
                  {searchTerm 
                    ? (locale === 'ar' 
                        ? 'لا توجد مقالات تطابق بحثك' 
                        : 'No articles match your search')
                    : (locale === 'ar' 
                        ? 'لا توجد مقالات متاحة حاليًا' 
                        : 'No articles available at the moment')}
                </h3>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-[#65DBA8] hover:underline"
                  >
                    {locale === 'ar' ? 'مسح البحث' : 'Clear search'}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
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
                      
                      {/* Author */}
                      {post.author?.name && (
                        <div className="text-sm text-gray-500 mb-4">
                          {locale === 'ar' ? 'بواسطة' : 'By'}: {post.author.name}
                        </div>
                      )}
                      
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
            )}
          </div>
        </section>
        
        {/* Call to action */}
        <section className="bg-[#242424] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'ar' ? 'هل تريد البقاء على اطلاع؟' : 'Want to stay informed?'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {locale === 'ar' 
                ? 'تابعنا على وسائل التواصل الاجتماعي للحصول على أحدث المقالات والتحديثات' 
                : 'Follow us on social media for the latest articles and updates.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#65DBA8] hover:bg-green-500 transition-colors"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}