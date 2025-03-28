'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher({ 
  currentLang 
}: { 
  currentLang: string 
}) {
  const pathname = usePathname();
  
  // Remove the current language from the path
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '');
  
  return (
    <div className="language-switcher">
      <Link 
        href={`/en${pathnameWithoutLang}`} 
        className={currentLang === 'en' ? 'active' : ''}
      >
        English
      </Link>
      <Link 
        href={`/ar${pathnameWithoutLang}`} 
        className={currentLang === 'ar' ? 'active' : ''}
      >
        العربية
      </Link>
    </div>
  );
}