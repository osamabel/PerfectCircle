'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

export default function HeroSection() {
  const t = useTranslations('HeroSection');
  
  return (
    <div suppressHydrationWarning className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/70"></div>
          <Image
            src="/hero-background.jpg" // You'll need to add this image to your public folder
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
          {t('transform')} <span className="block">{t('your')}</span>
          <span className="text-blue-300">{t('online')} </span>
          <span className="text-green-300">{t('presence')}</span>
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          {t('today')}!
        </h2>
        
        <p className="max-w-2xl text-lg mb-12 mx-auto">
          {t('description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="px-8 py-3 bg-green-400 text-black font-medium rounded-full hover:bg-green-500 transition duration-300">
            {t('getStarted')}
          </Link>
          <Link href="/portfolio" className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-black transition duration-300">
            {t('explorePortfolio')}
          </Link>
        </div>
      </div>
    </div>
  );
}