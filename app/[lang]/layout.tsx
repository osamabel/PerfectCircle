import '../globals.css';

import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { getDictionary } from '../lib/i18n/dictionaries';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(params.lang);
  
  return (
    <html lang={params.lang} dir={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${params.lang === 'ar' ? 'rtl' : 'ltr' }` }>
        <header>
          <nav className="nav-menu">
            <Link href={`/${params.lang}`}>{dict.nav.home}</Link>
            <Link href={`/${params.lang}/blog`}>{dict.nav.blog}</Link>
          </nav>
          <LanguageSwitcher currentLang={params.lang} />
        </header>
        <main className='bg-amber-100'>{children}</main>
        <footer>
          <p>© 2025 Your Company</p>
        </footer>
      </body>
    </html>
  );
}