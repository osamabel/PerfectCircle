'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Service } from '@/lib/models/service';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const locale = useLocale();
  const t = useTranslations('Services');
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create a dynamic icon component based on icon name
  const DynamicIcon = ({ iconName, size = 30, strokeWidth = 1.2 }: { iconName: string, size?: number, strokeWidth?: number }) => {
    // @ts-ignore - TypeScript doesn't know about dynamic imports
    const Icon = LucideIcons[iconName] || LucideIcons.Globe;
    return <Icon strokeWidth={strokeWidth} size={size} />;
  };

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
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
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-[#242424] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('sectionTitle')}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {locale === 'ar' 
                ? 'مجموعة متكاملة من الخدمات المخصصة لمساعدة عملك على النمو في العالم الرقمي' 
                : 'A comprehensive range of services tailored to help your business grow in the digital world'}
            </p>
          </div>
        </section>
        
        {/* Services grid */}
        <section className="py-16 bg-[#242424]">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div 
                    key={service.id}
                    className="bg-[#151515] hover:border-[#73e896]/40 border-[1px] border-[#3c3c3c] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-8">
                      <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                        <DynamicIcon iconName={service.icon} />
                      </div>
                      
                      <h3 className="text-2xl text-white font-bold mb-4">
                        {service.title[locale] || service.title['en']}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 text-gray-400" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                        {service.short_description[locale] || service.short_description['en']}
                      </p>
                      
                      <Link
                        href={`/services/${service.slug}`}
                        className="flex items-center text-[#65DBA8] font-medium hover:underline"
                      >
                        <span>{locale === 'ar' ? 'التفاصيل' : 'Learn more'}</span>
                        <ArrowRight className={`h-4 w-4 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Call to action */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'ar' ? 'هل أنت مستعد للبدء بمشروعك؟' : 'Ready to get started on your project?'}
            </h2>
            <Link
              href="/contact"
              style={{backgroundColor: 'var(--lightgreen)'}}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-green-500 border border-transparent rounded-full hover:bg-green-600"
            >
              {locale === 'ar' ? 'تواصل معنا الآن' : 'Contact us today'}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}