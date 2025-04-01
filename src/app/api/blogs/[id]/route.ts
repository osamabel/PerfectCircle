// src/app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/models/blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/blogs/[id] - Get a specific blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the id
    const { id } = await params;
    
    const blogPost = await getBlogPostById(id);
    
    if (!blogPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update a blog post
export async function PUT(
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
    
    const data = await request.json();
    
    // Check if blog post exists
    const existingPost = await getBlogPostById(id);
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    // If publishing, set published_at if not already set
    if (data.status === 'published' && existingPost.status !== 'published') {
      data.published_at = new Date();
    }
    
    // Update blog post
    const updatedPost = await updateBlogPost(id, data);
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete a blog post
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
    
    // Delete blog post
    const deletedPost = await deleteBlogPost(id);
    
    return NextResponse.json(deletedPost);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}