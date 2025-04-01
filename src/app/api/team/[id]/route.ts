// src/app/api/team/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTeamMemberById, updateTeamMember, deleteTeamMember } from '@/lib/models/team';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/team/[id] - Get a specific team member
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the id
    const { id } = await params;
    
    const teamMember = await getTeamMemberById(id);
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    );
  }
}

// PUT /api/team/[id] - Update a team member
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
    
    // Check if team member exists
    const existingMember = await getTeamMemberById(id);
    if (!existingMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Update team member
    const updatedMember = await updateTeamMember(id, {
      name: data.name,
      position: data.position,
      image: data.image,
      social_links: data.social_links
    });
    
    return NextResponse.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}

// DELETE /api/team/[id] - Delete a team member
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
    
    // Check if team member exists
    const existingMember = await getTeamMemberById(id);
    if (!existingMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }
    
    // Delete team member
    const deletedMember = await deleteTeamMember(id);
    
    return NextResponse.json(deletedMember);
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    );
  }
}