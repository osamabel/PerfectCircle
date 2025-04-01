// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost } from '@/lib/models/blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/blogs - Get all blog posts
export async function GET() {
  try {
    const blogPosts = await getAllBlogPosts();
    return NextResponse.json(blogPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if title and content are objects with locale keys
    if (typeof data.title !== 'object' || typeof data.content !== 'object') {
      return NextResponse.json(
        { error: 'Title and content must be objects with locale keys' },
        { status: 400 }
      );
    }
    
    // Set defaults for optional fields
    const blogPost = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || {},
      content: data.content,
      featured_image: data.featured_image || '',
      author_id: session.user.id, // Use the authenticated user's ID as the author
      status: data.status || 'draft',
      published_at: data.status === 'published' ? new Date() : null
    };
    
    // Create blog post
    const post = await createBlogPost(blogPost);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}