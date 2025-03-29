'use client';

import { Globe, Layers, MessageCircle, Puzzle, Settings, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ServicesSection() {
  const t = useTranslations('Services');
  
  const services = [
    {
      id: 'web-design',
      icon: (<Globe strokeWidth={1.2} size={30}/>),
      title: t('webDesign.title'),
      shortDesc: t('webDesign.shortDesc'),
      description: t('webDesign.description')
    },
    {
      id: 'web-development',
      icon: (<Layers strokeWidth={1.2} size={30}/>),
      title: t('webDevelopment.title'),
      shortDesc: t('webDevelopment.shortDesc'),
      description: t('webDevelopment.description'),
    },
    {
      id: 'digital-marketing',
      icon: (<TrendingUp strokeWidth={1.2} size={30}/> ),
      title: t('digitalMarketing.title'),
      shortDesc: t('digitalMarketing.shortDesc'),
      description: t('digitalMarketing.description')
    },
    {
      id: 'visual-identity',
      icon: (<Puzzle strokeWidth={1.2} size={30}/>),
      title: t('visualIdentity.title'),
      shortDesc: t('visualIdentity.shortDesc'),
      description: t('visualIdentity.description')
    },
    {
      id: 'consultation',
      icon: (<MessageCircle strokeWidth={1.2} size={30}/>),
      title: t('consultation.title'),
      shortDesc: t('consultation.shortDesc'),
      description: t('consultation.description')
    },
    {
      id: 'web-maintenance',
      icon: (<Settings strokeWidth={1.2} size={30}/>),
      title: t('webMaintenance.title'),
      shortDesc: t('webMaintenance.shortDesc'),
      description: t('webMaintenance.description')
    }
  ];
  
  return (
    <section className="bg-[#242424] py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          {t('sectionTitle')}
        </h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`relative bg-[#151515] rounded-2xl p-8 flex flex-col h-full cursor-pointer
                hover:border-[#73e896]/40 border-[1px] border-[#3c3c3c]`}
            >
              {/* Icon */}
              <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                {service.icon}
              </div>
              
              {/* Title and short description */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {service.shortDesc}
              </p>
              
              <hr className="border-[#3c3c3c] my-6" />
              
              {/* Long description */}
              <p className="text-gray-400 mb-6 flex-grow">
                {service.description}
              </p>
              
              {/* Button */}
              <Link
                href={`/services/${service.id}`}
                style={{backgroundColor: 'var(--lightgreen)'}}
                className="hover:bg-green-500 text-black font-medium px-6 py-3 rounded-full inline-block text-center transition duration-300 mt-auto"
              >
                {t('getStarted')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}