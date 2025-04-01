// src/app/api/projects/[id]/publish/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProjectById, publishProject, unpublishProject } from '@/lib/models/project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST /api/projects/[id]/publish - Publish a project
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
    
    // Check if project exists
    const existingProject = await getProjectById(id);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Publish project
    const updatedProject = await publishProject(id);
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error publishing project:', error);
    return NextResponse.json(
      { error: 'Failed to publish project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id]/publish - Unpublish a project
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
    
    // Check if project exists
    const existingProject = await getProjectById(id);
    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Unpublish project
    const updatedProject = await unpublishProject(id);
    
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error unpublishing project:', error);
    return NextResponse.json(
      { error: 'Failed to unpublish project' },
      { status: 500 }
    );
  }
}