import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: {
        displayOrder: 'asc'
      }
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST to create a new service
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newService = await prisma.service.create({
      data: body
    });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    );
  }
}