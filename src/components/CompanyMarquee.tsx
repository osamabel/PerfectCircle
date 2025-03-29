'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CompanyMarquee() {
  const t = useTranslations('Companies');
  const [isMobile, setIsMobile] = useState(false);
  const locale = useLocale();

  // Check screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Company logos - actual logos matching the image
  const companies = [
    { id: 0, name: 'Logo 0', logo: '/companies/0.png' },
    { id: 1, name: 'Logo 1', logo: '/companies/1.png' },
    { id: 2, name: 'Logo 2', logo: '/companies/2.webp' },
    { id: 3, name: 'Logo 3', logo: '/companies/3.png' },
    { id: 4, name: 'Logo 4', logo: '/companies/4.png' },
    { id: 5, name: 'Logo 5', logo: '/companies/5.png' },
    { id: 6, name: 'Logo 6', logo: '/companies/6.png' },
    { id: 7, name: 'Logo 7', logo: '/companies/7.png' },
    { id: 8, name: 'Logo 8', logo: '/companies/8.png' },
    { id: 9, name: 'Logo 9', logo: '/companies/9.png' },
  ];
  
  return (
    <section className="bg-[#151515] overflow-hidfden border-white/10 border-t-[1px]">
      <div className="relative w-full overflow-hidden">
        {/* Marquee container */}
        <div className="flex flex-row py-[40px]">
          {/* First copy of logos */}
          <div className={`animate-marquee-${locale} inline-flex bg-blFue-500`}>
            {companies.map((company) => (
              <div 
                key={company.id} 
                className="flex items-center justify-center mx-8"
              >
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={90}
                    height={90}
                    className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Duplicate set of logos for seamless looping */}
          <div className={`animate-marquee-${locale} inline-flex`}>
            {companies.map((company) => (
              <div 
                key={`dup-${company.id}`} 
                className="flex items-center justify-center mx-8"
              >
                <div className="w-32 h-32 relative flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={90}
                    height={90}
                    className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}