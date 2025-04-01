import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// First handle i18n routing
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Check if this is an admin route
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  
  // For admin routes, check authentication
  if (isAdminRoute) {
    // Use the secret from env for token verification
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });
    
    // If not logged in or not an admin, redirect to login
    if (!token || token.role !== 'admin') {
      // If it's not already the login page, redirect to login
      if (!pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else if (pathname === '/admin/login') {
      // If already logged in and trying to access login page, redirect to admin dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    
    // Allow access to admin routes
    return NextResponse.next();
  }
  
  // For non-admin routes, use the i18n middleware
  return intlMiddleware(request);
}
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)', '/admin/:path*']
};