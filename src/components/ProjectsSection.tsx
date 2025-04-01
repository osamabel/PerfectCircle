'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/models/project';

export default function ProjectsSection() {
  const locale = useLocale();
  const t = useTranslations('Projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        
        // Filter published projects only and limit to featured projects (maximum 3)
        const publishedProjects = allProjects
          .filter((project: Project) => project.status === 'published')
          .slice(0, 3)
          .map((project: any) => ({
            ...project,
            title: JSON.parse(project.title),  // Convert title from JSON string to object
            description: JSON.parse(project.description),
            content: JSON.parse(project.content)
          }));
        setProjects(publishedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  if (isLoading) {
    return (
      <section className="py-16 bg-[#151515] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id='project' className="bg-[#151515] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* <p className="text-green-400 uppercase tracking-widest mb-4">
            {t('featuredProject')}
          </p> */}
          <h2 className="text-3xl md:text-4xl  mb-2">
            {t('inspired')} <span className="gradient-text">{t('ourProjects')}{locale == 'ar' ? '؟' : '?'} </span> {t('letsCreate')}
          </h2>
          <h3 className="text-3xl md:text-4xl">
            {t('yours')}
          </h3>
        </div>
        
        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No projects to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
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
                      <Image
                        src={project.featured_image}
                        alt={project.title[locale] || ''}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          hoveredProject === project.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  {/* {index === 0 && (
                    <div className="absolute top-4 left-4 bg-[#65DBA8] text-black text-xs font-semibold py-1 px-3 rounded-full">
                      {t('featuredProject')}
                    </div>
                  )} */}
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
                    <h3 className="text-xl font-bold mb-4">
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
        
        {projects.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#65DBA8] hover:bg-green-500 transition-colors"
            >
              {t('allProjects')}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}