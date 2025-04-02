// src/app/api/check-file/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');
  
  if (!filePath) {
    return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
  }
  
  const fullPath = path.join(process.cwd(), 'public', filePath);
  
  try {
    const exists = fs.existsSync(fullPath);
    
    if (exists) {
      // If file exists, read it and return it with proper content type
      const content = fs.readFileSync(fullPath);
      const contentType = getContentType(filePath);
      
      // Return the actual file content
      return new NextResponse(content, {
        headers: {
          'Content-Type': contentType,
        },
      });
    } else {
      return NextResponse.json({ 
        error: 'File not found',
        path: filePath,
        fullPath,
      }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({
      error: 'Error checking file',
      message: (error as Error).message,
      stack: (error as Error).stack,
    }, { status: 500 });
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}