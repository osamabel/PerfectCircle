import { NextRequest, NextResponse } from 'next/server';
import { getAllTeamMembers, createTeamMember } from '@/lib/models/team';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/team - Get all team members
export async function GET() {
  try {
    const teamMembers = await getAllTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

// POST /api/team - Create a new team member
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
    if (!data.name || !data.position || !data.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create team member
    const teamMember = await createTeamMember({
      name: data.name,
      position: data.position,
      image: data.image,
      social_links: data.social_links || {}
    });
    
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    );
  }
}