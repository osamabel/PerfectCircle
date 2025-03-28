import { getDictionary } from '../../../../lib/i18n/dictionaries';
import { getPost } from '../../../../lib/posts';
import Link from 'next/link';

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const posts = await getPosts(params.lang);
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ 
  params 
}: { 
  params: { lang: string; slug: string } 
}) {
  const dict = await getDictionary(params.lang);
  const post = await getPost(params.lang, params.slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return (
    <article className={params.lang === 'ar' ? 'rtl' : 'ltr'}>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Link href={`/${params.lang}/blog`}>
        ← {dict.blog.backToBlog}
      </Link>
    </article>
  );
}