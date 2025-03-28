import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

// Modified to safely handle headers
function getLocale(request: NextRequest) {
  // Get the accepted languages from the request
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Parse the accept-language header
  let languages: string[] = [];
  try {
    // Simple parsing of the accept-language header
    languages = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim());
  } catch (e) {
    // If parsing fails, use an empty array
    languages = [];
  }
  
  // Add default locale to ensure we always have at least one valid option
  if (languages.length === 0) {
    languages.push(defaultLocale);
  }
  
  try {
    // Use intl-localematcher to find the best match
    return match(languages, locales, defaultLocale);
  } catch (e) {
    // If matching fails, return the default locale
    console.error('Error matching locale:', e);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip if the request is for an asset or API route
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    /\.[a-zA-Z0-9]{2,4}$/.test(pathname) // Files like favicon.ico
  ) {
    return NextResponse.next();
  }
  
  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return NextResponse.next();
  
  // Get locale safely - will always return a valid locale
  const locale = getLocale(request);
  
  // Redirect if there is no locale
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};