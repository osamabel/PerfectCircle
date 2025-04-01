'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';

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

// Using a client component with useParams instead of passed params
export default function BlogPostDetailPage() {
  // Get params from the URL using Next.js useParams hook
  const params = useParams();
  const slug = params?.slug as string;
  
  const locale = useLocale();
  const t = useTranslations('Blogs');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // First get all blog posts
        const response = await fetch('/api/blogs');
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        
        const posts: BlogPost[] = await response.json();
        
        // Find the post by slug
        const foundPost = posts
        .map((post: any) => ({
          ...post,
          title: JSON.parse(post.title),  // Convert title from JSON string to object
          excerpt: JSON.parse(post.excerpt),
          content: JSON.parse(post.content)
        }))
        .find(p => p.slug === slug && p.status === 'published');
        
        if (!foundPost) {
          // If not found or not published, use notFound() to show 404 page
          notFound();
          return;
        }
        
        setPost(foundPost);
        
        // Find related posts (exclude current post, limit to 3)
        const related = posts
          .map((post: any) => ({
            ...post,
            title: JSON.parse(post.title),  // Convert title from JSON string to object
            excerpt: JSON.parse(post.excerpt),
            content: JSON.parse(post.content)
          }))
          .filter(p => p.id !== foundPost.id && p.status === 'published')
          .slice(0, 3);
        
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setError('An error occurred while loading the blog post.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [slug]);
  
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!post) {
    return notFound();
  }
  
  return (
    <>
      <Header />
      <main>
        {/* Featured image */}
        <div className="w-full relative h-[50vh] bg-[gray-900]">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title[locale] || ''}
              fill
              className="object-cover opacity-70"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-800"></div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md max-w-4xl">
                {post.title[locale] || post.title['en']}
              </h1>
              
              <div className="flex items-center justify-center text-white text-sm gap-4">
                {post.author?.name && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author.name}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <time dateTime={post.published_at || post.created_at}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article content */}
        <article className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/blog" 
                className="flex items-center text-gray-500 hover:text-gray-700 mb-8"
              >
                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
                <span>{locale === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}</span>
              </Link>
              
              {/* Main content */}
              <div className="prose max-w-none" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                {/* Excerpt */}
                {(post.excerpt?.[locale] || post.excerpt?.['en']) && (
                  <div className="text-xl text-gray-600 mb-8 font-medium">
                    {post.excerpt?.[locale] || post.excerpt?.['en']}
                  </div>
                )}
                
                {/* Content */}
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content[locale] || post.content['en'] 
                }} />
              </div>
            </div>
          </div>
        </article>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-[#242424] py-16 ">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl text-white font-bold mb-10 text-center">
                {locale === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8  text-white">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Featured Image */}
                    <div className="relative h-48 overflow-hidden">
                      {relatedPost.featured_image ? (
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.title[locale] || ''}
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
                    <div className="p-6 bg-[#151515] h-full">
                      <h3 className="text-xl font-bold mb-2 ">
                        {relatedPost.title[locale] || relatedPost.title['en']}
                      </h3>
                      <p className="text-gray-600 line-clamp-2" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                        {relatedPost.excerpt?.[locale] || relatedPost.excerpt?.['en'] || 
                         relatedPost.content[locale]?.substring(0, 100) || 
                         relatedPost.content['en']?.substring(0, 100)}...
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Call to action */}
        <section className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl text-white font-bold mb-6">
              {locale === 'ar' ? 'هل لديك سؤال؟' : 'Have a question?'}
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'نحن هنا للمساعدة. تواصل معنا اليوم للحصول على إجابات لجميع استفساراتك.' 
                : 'We\'re here to help. Contact us today to get answers to all your inquiries.'}
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