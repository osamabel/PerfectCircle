'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Project } from '@/lib/models/project';
import CustomImage from '@/components/CustomImageProps';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;  const locale = useLocale();
  const t = useTranslations('Projects');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // First get all projects
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const projects: Project[] = await response.json();
        
        // Find the project by slug
        const foundProject = projects
        .map((project: any) => ({
          ...project,
          title: JSON.parse(project.title),  // Convert title from JSON string to object
          description: JSON.parse(project.description),
          content: JSON.parse(project.content)
        }))
        .find(p => p.slug === slug && p.status === 'published')
        ;
        
        if (!foundProject) {
          // If not found or not published, use notFound() to show 404 page
          notFound();
          return;
        }
        
        setProject(foundProject);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('An error occurred while loading the project.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
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
  
  if (!project) {
    return notFound();
  }
  
  // Format date if available
  const formattedDate = project.published_at 
    ? new Date(project.published_at).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;
  
  return (
    <>
      <Header />
      <main>
        {/* Hero section with featured image */}
        <div className="w-full relative h-[50vh] bg-[#242424]">
          {project.featured_image ? (
            <CustomImage
              src={project.featured_image}
              alt={project.title[locale] || ''}
              fill
              className="object-cover opacity-70"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#242424]"></div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                {project.title[locale] || project.title['en']}
              </h1>
              {project.category && (
                <span className="inline-block bg-[#65DBA8] text-black py-1 px-4 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Project content */}
        <section className="py-16 bg-[#151515]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link 
                href="/projects" 
                className="flex items-center text-gray-500 hover:text-gray-700 mb-8"
              >
                <ArrowLeft className={`h-4 w-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
                <span>{locale === 'ar' ? 'العودة إلى المشاريع' : 'Back to Projects'}</span>
              </Link>
              
              {/* Project meta information */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b pb-4">
                {project.client && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">
                      {locale === 'ar' ? 'العميل' : 'Client'}
                    </span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                )}
                
                {formattedDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-500">{formattedDate}</span>
                  </div>
                )}
              </div>
              
              {/* Project description */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4 text-gray-500">
                  {locale === 'ar' ? 'نبذة عن المشروع' : 'Project Overview'}
                </h2>
                <p className="text-gray-200 mb-6 text-lg" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                  {project.description[locale] || project.description['en']}
                </p>
              </div>
              
              {/* Project full content */}
              <div className="prose max-w-none text-white" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: project.content[locale] || project.content['en'] 
                  }} 
                />
              </div>
              

            </div>
          </div>
              {/* Call to action */}
              <section className="bg-[#242424] py-16 text-white mt-12">

                <div className="container mx-auto px-4 text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {locale === 'ar' ? 'هل تريد مشروعًا مشابهًا؟' : 'Want a similar project?'}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {locale === 'ar' 
                      ? 'نحن نقدم حلولاً مخصصة لاحتياجاتك. دعنا نناقش مشروعك التالي.' 
                      : 'We provide tailored solutions for your needs. Let\'s discuss your next project.'}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#65DBA8] hover:bg-green-500 transition-colors"
                  >
                    {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </Link>
                </div>
              </section>
        </section>
      </main>
      <Footer />
    </>
  );
}