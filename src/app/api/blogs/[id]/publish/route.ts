// src/app/api/blogs/[id]/publish/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, publishBlogPost, unpublishBlogPost } from '@/lib/models/blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// POST /api/blogs/[id]/publish - Publish a blog post
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Await the params to get the id
    const { id } = await params;
    
    // Check if blog post exists
    const existingPost = await getBlogPostById(id);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Publish blog post
    const updatedPost = await publishBlogPost(id);
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error publishing blog post:', error);
    return NextResponse.json(
      { error: 'Failed to publish blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id]/publish - Unpublish a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Await the params to get the id
    const { id } = await params;
    
    // Check if blog post exists
    const existingPost = await getBlogPostById(id);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // Unpublish blog post
    const updatedPost = await unpublishBlogPost(id);
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error unpublishing blog post:', error);
    return NextResponse.json(
      { error: 'Failed to unpublish blog post' },
      { status: 500 }
    );
  }
}