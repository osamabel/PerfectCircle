// src/app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllServices, createService } from '@/lib/models/service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET /api/services - Get all services
export async function GET() {
  try {
    const services = await getAllServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST /api/services - Create a new service
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
    if (!data.title || !data.slug || !data.short_description || !data.description || !data.icon) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if title and descriptions are objects with locale keys
    if (typeof data.title !== 'object' || typeof data.short_description !== 'object' || typeof data.description !== 'object') {
      return NextResponse.json(
        { error: 'Title, short description, and description must be objects with locale keys' },
        { status: 400 }
      );
    }
    
    // Create service
    const service = await createService({
      title: data.title,
      slug: data.slug,
      short_description: data.short_description,
      description: data.description,
      icon: data.icon
    });
    
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}