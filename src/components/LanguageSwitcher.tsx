'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition, useState } from 'react';
import Image from 'next/image';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
      setIsOpen(false);
    });
  };

  // Map of language codes to their display information
  const languages = {
    en: {
      name: 'English',
      flag: '/flags/en.svg',
      shortName: 'EN'
    },
    ar: {
      name: 'العربية',
      flag: '/flags/ar.svg',
      shortName: 'AR'
    }
  };

  const currentLanguage = languages[locale as keyof typeof languages];

  return (
    <div suppressHydrationWarning className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100/10 transition-all cursor-pointer"
        disabled={isPending}
      >
        <div className="relative w-5 h-5 overflow-hidden rounded-full">
          <Image 
            src={currentLanguage.flag} 
            alt={`${currentLanguage.name} Flag`}
            width={20} 
            height={20}
            className="object-cover"
          />
        </div>
        <span className="font-medium text-[14px]">{currentLanguage.shortName}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-1 right-0 rtl:left-0 rtl:right-auto z-10 rounded-md overflow-hidden w-30 py-1">
          {Object.entries(languages).map(([code, language]) => (
            <button
              key={code}
              onClick={() => handleLocaleChange(code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:hover:bg-gray-100/10 transition-colors ${
                locale === code ? 'hover:bg-gray-100/10' : ''
              }`}
              disabled={isPending}
            >
              <div className="relative  h-5 overflow-hidden rounded-full">
                <Image 
                  src={language.flag} 
                  alt={`${language.name} Flag`}
                  width={20} 
                  height={20}
                  className="object-cover"
                />
              </div>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}