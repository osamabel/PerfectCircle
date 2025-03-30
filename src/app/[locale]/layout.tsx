// src/app/[locale]/layout.tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`${locale === 'ar' ? 'font-arabic' : 'font-inter'} antialiased text-gray-800`} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <main>
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  );
}