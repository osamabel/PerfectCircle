import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts(language: string) {
  const posts = await prisma.post.findMany({
    where: {
      language,
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.content.substring(0, 150) + '...',
    createdAt: post.createdAt,
  }));
}

export async function getPost(language: string, slug: string) {
  return prisma.post.findFirst({
    where: {
      language,
      slug,
      published: true,
    },
  });
}