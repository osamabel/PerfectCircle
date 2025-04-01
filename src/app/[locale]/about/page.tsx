'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  const t = useTranslations('About');
  const locale = useLocale();

  const features = [
    { id: 1, title: t('customSolutions') },
    { id: 2, title: t('cuttingEdgeDesign') },
    { id: 3, title: t('seoOptimization') },
    { id: 4, title: t('responsiveDesign') },
    { id: 5, title: t('innovativeTechnology') },
    { id: 6, title: t('securityReliability') },
  ];

  return (
    <section id='about' className="py-16 md:py-24 bg-[#151515] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Features list with image */}
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-lg mb-10 lg:mb-0">
              <Image
                src="https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office-1536x1024.jpg" 
                alt="Team working together"
                width={800}
                height={600}
                className="rounded-lg"
              />
              
              {/* Features list overlay */}
              <div className={`absolute ${locale === 'ar' ? 'right-[-10%]' : 'left-[-10%]'} bottom-[-10%] bg-black/90 p-8 backdrop-blur-sm rounded-2xl`}>
                <div className="space-y-6">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-center gap-4">
                      <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          className="w-4 h-4 text-green-400"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </div>
                      <p className="text-lg">{feature.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="lg:w-1/2">
            <div style={{color: 'var(--lightgreen)'}} className="text-green-400 font-medium mb-2">
              {t('whoWeAre')}
            </div>
            
            <h2 className={`text-2xl md:text-3xl ${locale === 'ar' ? 'font-bold' : 'font-medium'}  mb-6`}>
              {t('innovativeSolutions')} <br />
              <span className="gradient-text">{t('onlineSuccess')} </span>
            </h2> 

            <p className="text-gray-400 mb-10">
              {t('description')}
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-around gap-6 mb-10 border-y-[1px] border-white/10 py-10">
              <div>
                <h3 className="text-3xl md:text-4xl font-medium">+2000</h3>
                <p className="text-gray-400">{t('projectsDone')}</p>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-medium">+100</h3>
                <p className="text-gray-400">{t('happyClients')}</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/about"
              style={{backgroundColor: 'var(--lightgreen)'}} 
              className="inline-block hover:bg-green-500 text-black font-medium px-8 py-3 rounded-full transition duration-300"
            >
              {t('discoverMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}