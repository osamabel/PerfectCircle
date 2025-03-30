// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create the uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public/uploads/team');
    
    try {
      await import('fs').then(fs => 
        !fs.existsSync(uploadsDir) && fs.mkdirSync(uploadsDir, { recursive: true })
      );
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(uploadsDir, uniqueFilename);
    
    // Write the file
    await writeFile(filePath, buffer);
    
    // Return the public URL path
    return NextResponse.json({ 
      success: true, 
      url: `/uploads/team/${uniqueFilename}` 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}