'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  
  const currentYear = new Date().getFullYear();
  
  // Social media links
  const socialLinks = [
    { id: 'X', icon: 'X.svg', url: 'https://x.com/PerfectLooop' },
    { id: 'instagram', icon: 'instagram.svg', url: 'https://www.instagram.com/perfectlooop/' },
    { id: 'linkedin', icon: 'linkedin.svg', url: 'https://www.linkedin.com/in/perfect-looop-545a3b35b' },
    { id: 'snapchat', icon: 'snapchat.svg', url: 'https://www.snapchat.com/add/perfectlooop?share_id=HF5M7U9igoc&locale=en-SA' },
    { id: 'youtube', icon: 'youtube.svg', url: 'https://www.youtube.com/feed/you' },
    { id: 'tiktok', icon: 'tiktok.svg', url: 'https://www.tiktok.com/@perfectlooop' },
  ];
  
  return (
    <footer className="bg-[#151515] text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and Address */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Image 
                src="/logoWhile.png" 
                alt="perfectCircle" 
                width={100} 
                height={100}
                className="w-auto"
              />
            </div>
            <p className="text-gray-400 mb-1">{t('address.line1')}</p>
            <p className="text-gray-400 mb-6">{t('address.line2')}</p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#65DBA8] hover:bg-[#70ECB6] w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                >
                  <span className="sr-only">{social.id}</span>
                  {/* You can use SVG icons directly here or import SVG files */}
                  {social.id === 'X' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {social.id === 'instagram' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.id === 'linkedin' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social.id === 'twitter' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  )}
                  {social.id === 'youtube' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  )}
                  {social.id === 'snapchat' && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-black"
                    >
                      <path d="M511.4 339.6c-2.2-7.4-10.2-12.6-22.2-14.7-6.6-1.2-13.3-1.4-18.4-1.4-5.7 0-11.4.3-16.9.6-10.8.6-21.6 1.3-32.5-2.5-13.2-4.6-23.4-14.7-29.5-30.4-2.3-6-4.2-11.5-5.8-16.4 0-.2-.1-.4-.1-.6-2.6-8.1-5.4-16.5-8.5-25.5-3.1-9.2-6.3-18.5-9.8-28.1-5.4-14.6-11.1-29.6-18.7-44.8-21.4-43.4-51.3-73.2-85.5-82.3-3.6-.9-7.3-1.4-10.9-1.4-3.6 0-7.2.5-10.9 1.4-34.2 9.1-64.1 38.9-85.5 82.3-7.6 15.2-13.3 30.2-18.7 44.8-3.5 9.6-6.7 18.9-9.8 28.1-3.1 9-5.9 17.4-8.5 25.5l-.1.6c-1.6 4.9-3.5 10.4-5.8 16.4-6.1 15.7-16.3 25.8-29.5 30.4-10.9 3.8-21.7 3.1-32.5 2.5-5.5-.3-11.2-.6-16.9-.6-5.1 0-11.8.2-18.4 1.4-12 2.1-20 7.3-22.2 14.7-2.3 7.8 2.6 17 14.3 26.7 6.2 5.2 13.4 8.2 20.5 11.1 3.5 1.4 7.1 2.8 10.4 4.2 4.5 1.8 8.6 3.5 12.2 5.2 4.4 2.2 6.6 5.8 6.6 10.7 0 10.8 12.6 19.7 27.6 19.7 3.5 0 7.1-.6 10.6-1.9 4.9-1.7 9.4-3.5 13.8-5.2 6.4-2.6 13-5.1 20.4-6.5 3.9-.8 8.1-1.2 12.5-1.2 7.8 0 16.1 1.4 24.7 4.2 14.5 4.7 29.6 9.1 45.1 13.1 11.2 2.9 23.5 2.9 34.7 0 15.5-4 30.6-8.4 45.1-13.1 8.6-2.8 16.9-4.2 24.7-4.2 4.4 0 8.6.4 12.5 1.2 7.4 1.4 14 3.9 20.4 6.5 4.4 1.8 8.9 3.5 13.8 5.2 3.5 1.3 7.1 1.9 10.6 1.9 15 0 27.6-8.9 27.6-19.7 0-4.9 2.2-8.5 6.6-10.7 3.6-1.7 7.7-3.4 12.2-5.2 3.3-1.3 6.9-2.8 10.4-4.2 7.1-2.9 14.2-5.9 20.5-11.1 11.8-9.7 16.6-18.9 14.4-26.7z"/>
                    </svg>
                  )}

                  {social.id === 'tiktok' && (
                    <svg className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div className="md:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6">{t('services.title')}</h4>
            <ul className="space-y-3">
              <li><Link href="/services/web-development" className="text-gray-400 hover:text-white transition duration-300">{t('services.webDesign')}</Link></li>
              <li><Link href="/services/digital-transformation" className="text-gray-400 hover:text-white transition duration-300">{t('services.webDevelopment')}</Link></li>
              <li><Link href="/services/seo-digital-marketing" className="text-gray-400 hover:text-white transition duration-300">{t('services.seoDigitalMarketing')}</Link></li>
              <li><Link href="/services/branding-visual-identity" className="text-gray-400 hover:text-white transition duration-300">{t('services.brandingVisualIdentity')}</Link></li>
              <li><Link href="/services/consultation-strategy" className="text-gray-400 hover:text-white transition duration-300">{t('services.consultationStrategy')}</Link></li>
              <li><Link href="/services/maintenance-support" className="text-gray-400 hover:text-white transition duration-300">{t('services.maintenanceSupport')}</Link></li>
              <li><Link href="/services/artificial-intelligence-solutions" className="text-gray-400 hover:text-white transition duration-300">{t('services.artificialIntelligence')}</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div className="md:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6">{t('support.title')}</h4>
            <ul className="space-y-3">
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition duration-300">{t('support.contactUs')}</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Company */}
          <div className="md:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6">{t('company.title')}</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition duration-300">{t('company.aboutUs')}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 pb-2">
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              {t('copyright')} {currentYear} {t('copyrightSuffix')}.
            </p>
            </div>
            
            {/* Policy Links */}
            {/* <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">{t('termsOfUse')}</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300">{t('privacyPolicy')}</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition duration-300">{t('cookiePolicy')}</Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}