'use client';

import { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Service } from '@/lib/models/service';

export default function ServicesSection() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create a dynamic icon component based on icon name
  const DynamicIcon = ({ iconName, size = 30, strokeWidth = 1.2 }: { iconName: string, size?: number, strokeWidth?: number }) => {
    // @ts-ignore - TypeScript doesn't know about dynamic imports
    const Icon = LucideIcons[iconName] || LucideIcons.Globe;
    return <Icon strokeWidth={strokeWidth} size={size} />;
  };

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);
  
  return (
    <section id='services' className="bg-[#242424] py-16 md:py-20">
      <div className="container mx-auto px-4">
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                className={`relative bg-[#151515] rounded-2xl p-8 flex flex-col h-full cursor-pointer
                  hover:border-[#73e896]/40 border-[1px] border-[#3c3c3c]`}
              >
                {/* Icon */}
                <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                  <DynamicIcon iconName={service.icon} />
                </div>
                
                {/* Title and short description */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {service.title[locale] || service.title['en']}
                </h3>
                <p className="text-gray-400 mb-6">
                  {service.short_description[locale] || service.short_description['en']}
                </p>
                
                {/* Button */}
                <Link
                  href={`/services/${service.slug}`}
                  style={{backgroundColor: 'var(--lightgreen)'}}
                  className="hover:bg-green-500 text-black font-medium px-6 py-3 rounded-full inline-block text-center transition duration-300 mt-auto"
                >
                  {t('learnMore')}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}