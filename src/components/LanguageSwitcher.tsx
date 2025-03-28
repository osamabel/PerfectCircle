'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div suppressHydrationWarning className="language-switcher" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <button
          onClick={() => handleLocaleChange('en')}
          className={`px-3 py-1 rounded-md ${
            locale === 'en' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isPending}
        >
          English
        </button>
        <button
          onClick={() => handleLocaleChange('ar')}
          className={`px-3 py-1 rounded-md ${
            locale === 'ar' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isPending}
        >
          العربية
        </button>
      </div>
    </div>
  );
}