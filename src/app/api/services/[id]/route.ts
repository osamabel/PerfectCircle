// src/app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServiceById, updateService, deleteService } from '@/lib/models/service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/services/[id] - Get a specific service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params to get the id
    const { id } = await params;
    
    const service = await getServiceById(id);
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update a service
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
    
    // Check if service exists
    const existingService = await getServiceById(id);
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Update service
    const updatedService = await updateService(id, {
      title: data.title,
      slug: data.slug,
      short_description: data.short_description,
      description: data.description,
      icon: data.icon
    });
    
    return NextResponse.json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete a service
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
    
    // Check if service exists
    const existingService = await getServiceById(id);
    if (!existingService) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }
    
    // Delete service
    const deletedService = await deleteService(id);
    
    return NextResponse.json(deletedService);
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}