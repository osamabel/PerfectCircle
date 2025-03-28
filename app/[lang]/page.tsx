import Link from 'next/link';
import { getDictionary } from '../lib/i18n/dictionaries';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);
  
  return (
    <main className={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{dict.home.title}</h1>
      <p>{dict.home.description}</p>
      <Link href={`/${params.lang}/blog`}>{dict.nav.blog}</Link>
    </main>
  );
}