'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProjectsSection() {
  const t = useTranslations('Projects');
  const [hoveredProject, setHoveredProject] = useState(null);
//   "featuredProject": "Featured Project",
//   "inspired": "Inspired by",
//   "ourProjects": "Our Projects",
//   "letsCreate": "Let's Create",
//   "yours": "Yours!",
//   "learnMore": "Learn more",
//   "viewProject": "View Project",
//   "allProjects": "View All Projects"
  const projects = [
    {
      id: 'man-dance',
      title: 'Man & Dance Company Perfume',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/bottle-of-essential-massage-oil-on-stone-beauty-treatment-minimal-black-design-packaging-mock-up-1536x865.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    },
    {
      id: 'nancy-watch',
      title: 'Nancy Watch Promotional Landing page',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/smartwatch-screen-mockup-digital-device-1536x1536.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    },
    {
      id: 'malika-perfume',
      title: 'Malika Perfume Funnel Landing Page',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/black-bottle-modern-design-eye-dropper-with-painted-leaves-background-3d-illustration-1536x1536.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    },
    {
      id: 'peters-gym',
      title: "Peter's Gym Company Profile Website",
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/phone-with-empty-screen-on-black-decorated-background-top-view-1536x1024.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    },
    {
      id: 'hoffman-wines',
      title: 'Hoffman 1928 Wines Profile Website',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/single-red-wine-bottle-with-blank-label-for-mockup-and-glass-of-red-wine-on-dark-gray-background.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    },
    {
      id: 'coffe-toffe',
      title: 'Coffe Toffe Funnel Landing Page',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/black-luxury-take-away-paper-cups-set-mirrored-1536x1000.jpg',
      description: 'Vehicula magna morbi scelerisque phasellus neque facilisis quisque venenatis mauris curae ex donec dis bibendum.'
    }
  ];
  
  return (
    <section className="bg-[#151515] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-green-400 uppercase tracking-widest mb-4">
            {t('featuredProject')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t('inspired')} <span className="gradient-text">{t('ourProjects')}</span>? {t('letsCreate')}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold">
            {t('yours')}
          </h3>
        </div>
        
        {/* Projects Grid */}
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
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={`object-cover transition-transform duration-500 ${
                      hoveredProject === project.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                </div>
              </div>
              
              {/* Project Info - Slides up on hover */}
              <div 
                className={`absolute inset-x-0 bottom-0 bg-[#242424]  p-6 transition-all duration-300 ease-in-out ${
                  hoveredProject === project.id 
                    ? 'translate-y-0' 
                    : 'translate-y-[calc(100%-100px)]'
                }`}
              >
                <h3 className="text-xl mb-3">
                  {project.title}
                </h3>
                <p className={`text-gray-400 mb-5 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  {project.description}
                </p>
                
                {/* Button that appears on hover */}
                <div className={`transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Link 
                    href={`/projects/${project.id}`}
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
      </div>
    </section>
  );
}