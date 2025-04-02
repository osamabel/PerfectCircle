'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/models/project';
import CustomImage from '@/components/CustomImageProps';

export default function ProjectsPage() {
  const locale = useLocale();
  const t = useTranslations('Projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Fetch published projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const allProjects = await response.json();
        
        // Filter published projects only
        const publishedProjects = allProjects
        .filter((project: Project) => project.status === 'published')
        .map((project: any) => ({
          ...project,
          title: JSON.parse(project.title),  // Convert title from JSON string to object
          description: JSON.parse(project.description),
          content: JSON.parse(project.content)
        }));
        
        setProjects(publishedProjects);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            publishedProjects
              .map((project: Project) => project.category)
              .filter(Boolean)
          )
        ) as string[];
        
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Filter projects by category
  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;
  
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-[#242424] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('ourProjects')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'مجموعة من المشاريع التي نفتخر بها ونعرضها لإظهار خبرتنا ومهاراتنا' 
                : 'A collection of projects we are proud to showcase demonstrating our expertise and skills'}
            </p>
          </div>
        </section>
        
        {/* Category filter */}
        {categories.length > 0 && (
          <section className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
              <div className={`flex items-center gap-4 overflow-x-auto pb-2 ${locale === 'ar' ? 'justify-end' : ''}`}>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategory === null
                      ? 'bg-[#65DBA8] text-black'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {locale === 'ar' ? 'الكل' : 'All'}
                </button>
                
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-[#65DBA8] text-black'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Projects grid */}
        <section className="py-16 bg-[#151515]">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">
                  {selectedCategory 
                    ? (locale === 'ar' 
                        ? `لا توجد مشاريع في فئة "${selectedCategory}"` 
                        : `No projects found in category "${selectedCategory}"`)
                    : (locale === 'ar' 
                        ? 'لا توجد مشاريع متاحة حاليًا' 
                        : 'No projects available at the moment')}
                </h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="mt-4 text-[#65DBA8] hover:underline"
                  >
                    {locale === 'ar' ? 'عرض جميع المشاريع' : 'View all projects'}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="relative rounded-lg overflow-hidden group"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project Image */}
                    <div className="aspect-video w-full overflow-hidden bg-[#151515] h-[500px]">
                      <div className="h-full w-full relative">
                        {project.featured_image ? (
                          <CustomImage
                            src={project.featured_image}
                            alt={project.title[locale] || ''}
                            fill
                            className={`object-cover transition-transform duration-500 ${
                              hoveredProject === project.id ? 'scale-110' : 'scale-100'
                            }`}                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div 
                  className={`absolute inset-x-0 bottom-0 bg-[#242424]  p-6 transition-all duration-300 ease-in-out ${
                    hoveredProject === project.id 
                      ? 'translate-y-0' 
                      : 'translate-y-[calc(100%-100px)]'
                  }`}>
                    <div className="mb-2">
                      <span className="text-gray-400 text-sm">
                        {project.category || ''}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white">
                      {project.title[locale] || project.title['en']}
                    </h3>
                    <p 
                    className={`text-gray-400 mb-6 line-clamp-2 ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}`}
                    style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                      {project.description[locale] || project.description['en']}
                    </p>

                    {/* Button that appears on hover */}
                    <div className={`transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                      <Link 
                        href={`/projects/${project.slug}`}
                        style={{backgroundColor: 'var(--lightgreen)'}}
                        className="bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-3 rounded-full inline-block text-center transition duration-300"
                      >
                        {t('learnMore')}
                      </Link>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Call to action */}
        <section className="bg-[#242424] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {locale === 'ar' ? 'هل لديك مشروع تريد تنفيذه؟' : 'Have a project in mind?'}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {locale === 'ar' 
                ? 'نحن هنا لمساعدتك في تحويل أفكارك إلى حقيقة. دعنا نتعاون لإنشاء شيء مميز.' 
                : 'We are here to help you turn your ideas into reality. Let\'s collaborate to create something exceptional.'}
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