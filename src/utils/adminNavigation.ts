import { usePathname } from 'next/navigation';

// Determine if the current path includes a locale prefix
export function useAdminNavigation() {
  const pathname = usePathname();
  
  // Check if the path starts with a locale (e.g. /en/admin, /ar/admin)
  const hasLocalePrefix = /^\/[a-z]{2}\//.test(pathname);
  
  // Extract locale if it exists
  const locale = hasLocalePrefix ? pathname.split('/')[1] : null;
  
  // Function to generate admin links that maintain locale if present
  const getAdminLink = (path: string) => {
    return locale ? `/${locale}${path}` : path;
  };
  
  // Extract the current admin section from the path
  const getCurrentSection = () => {
    const parts = pathname.split('/');
    // The admin section will be at index 2 if there's a locale, otherwise at index 1
    const sectionIndex = hasLocalePrefix ? 3 : 2;
    return parts[sectionIndex] || 'dashboard';
  };
  
  return {
    locale,
    hasLocalePrefix,
    getAdminLink,
    getCurrentSection
  };
}