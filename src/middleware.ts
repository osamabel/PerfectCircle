import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { getToken } from 'next-auth/jwt';

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip next-intl middleware for admin routes
  if (pathname.startsWith('/admin')) {
    // For admin routes, check authentication except for login
    if (!pathname.startsWith('/admin/login')) {
      // Check if the user is authenticated
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      });
      
      // If not authenticated, redirect to login
      if (!token) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    }
    
    // Allow admin routes to proceed without locale handling
    return NextResponse.next();
  }
  
  // For non-admin routes, use the next-intl middleware
  return intlMiddleware(request);
}

// Update the matcher to include admin routes
export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};