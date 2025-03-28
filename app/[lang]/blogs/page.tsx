// import { getDictionary } from '../../../lib/i18n/dictionaries';
import Link from 'next/link';
// import { getPosts } from '../../../lib/posts';
import { getDictionary } from '@/app/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default async function Blog({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);
  const posts = await getPosts(params.lang);
  
  return (
    <main className={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{dict.blog.title}</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/${params.lang}/blog/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
            <Link href={`/${params.lang}/blog/${post.slug}`}>
              {dict.blog.readMore}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}