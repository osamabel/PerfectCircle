'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Service } from '@/lib/models/service';
import * as LucideIcons from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const locale = useLocale();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a dynamic icon component based on icon name
  const DynamicIcon = ({ iconName, className = "h-16 w-16 mb-6" }: { iconName: string, className?: string }) => {
    // @ts-ignore - TypeScript doesn't know about dynamic imports
    const Icon = LucideIcons[iconName] || LucideIcons.Globe;
    return <Icon className={className} />;
  };

  // Fetch service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        
        // First get all services
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const services: Service[] = await response.json();
        
        // Find the service by slug
        const foundService = services.find(s => s.slug === slug);
        
        if (!foundService) {
          // If not found, use notFound() to show 404 page
          notFound();
          return;
        }
        
        setService(foundService);
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('An error occurred while loading the service.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchService();
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
  
  if (!service) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-[#242424] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-[#65DBA8] w-20 h-20 rounded-full flex items-center justify-center mb-6 text-black mx-auto">
                <DynamicIcon iconName={service.icon} className="h-10 w-10" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                {service.title[locale] || service.title['en']}
              </h1>
              <p className="text-xl text-gray-300">
                {service.short_description[locale] || service.short_description['en']}
              </p>
            </div>
          </div>
        </section>
        
        {/* Content section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Link 
                href="/services" 
                className="flex items-center text-gray-500 hover:text-gray-700 mb-8"
              >
                <LucideIcons.ArrowLeft className="h-4 w-4 mr-2" />
                <span>{locale === 'ar' ? 'العودة إلى جميع الخدمات' : 'Back to all services'}</span>
              </Link>
              
              <div className="prose max-w-none">
                <p className="text-lg" style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                  {service.description[locale] || service.description['en']}
                </p>
              </div>
              
              {/* Call to action */}
              <div className="mt-12 text-center">
                <Link
                  href="/contact"
                  style={{backgroundColor: 'var(--lightgreen)'}}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-green-500 border border-transparent rounded-full hover:bg-green-600"
                >
                  {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}