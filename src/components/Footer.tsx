'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('Footer');
  
  const currentYear = new Date().getFullYear();
  
  // Social media links
  const socialLinks = [
    { id: 'facebook', icon: 'facebook.svg', url: 'https://facebook.com' },
    { id: 'instagram', icon: 'instagram.svg', url: 'https://instagram.com' },
    { id: 'twitter', icon: 'twitter.svg', url: 'https://twitter.com' },
    { id: 'youtube', icon: 'youtube.svg', url: 'https://youtube.com' },
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
                  className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                >
                  <span className="sr-only">{social.id}</span>
                  {/* You can use SVG icons directly here or import SVG files */}
                  {social.id === 'facebook' && (
                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  )}
                  {social.id === 'instagram' && (
                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                  {social.id === 'twitter' && (
                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  )}
                  {social.id === 'youtube' && (
                    <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
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
              <li><Link href="/services/web-design" className="text-gray-400 hover:text-white transition duration-300">{t('services.webDesign')}</Link></li>
              <li><Link href="/services/web-development" className="text-gray-400 hover:text-white transition duration-300">{t('services.webDevelopment')}</Link></li>
              <li><Link href="/services/seo-digital-marketing" className="text-gray-400 hover:text-white transition duration-300">{t('services.seoDigitalMarketing')}</Link></li>
              <li><Link href="/services/branding-visual-identity" className="text-gray-400 hover:text-white transition duration-300">{t('services.brandingVisualIdentity')}</Link></li>
              <li><Link href="/services/consultation-strategy" className="text-gray-400 hover:text-white transition duration-300">{t('services.consultationStrategy')}</Link></li>
              <li><Link href="/services/maintenance-support" className="text-gray-400 hover:text-white transition duration-300">{t('services.maintenanceSupport')}</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div className="md:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6">{t('support.title')}</h4>
            <ul className="space-y-3">
              <li><Link href="/help-center" className="text-gray-400 hover:text-white transition duration-300">{t('support.helpCenter')}</Link></li>
              <li><Link href="/ticket-support" className="text-gray-400 hover:text-white transition duration-300">{t('support.ticketSupport')}</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition duration-300">{t('support.contactUs')}</Link></li>
              <li><Link href="/customer-support" className="text-gray-400 hover:text-white transition duration-300">{t('support.customerSupport')}</Link></li>
              <li><Link href="/forum-community" className="text-gray-400 hover:text-white transition duration-300">{t('support.forumCommunity')}</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Company */}
          <div className="md:col-span-1">
            <h4 className="text-white text-lg font-bold mb-6">{t('company.title')}</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition duration-300">{t('company.aboutUs')}</Link></li>
              <li><Link href="/leadership" className="text-gray-400 hover:text-white transition duration-300">{t('company.leadership')}</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition duration-300">{t('company.careers')}</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition duration-300">{t('company.articleNews')}</Link></li>
              <li><Link href="/legal" className="text-gray-400 hover:text-white transition duration-300">{t('company.legalNotices')}</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 pb-2">
          <div className="flex flex-col md:flex-row md:justify-between">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              {t('copyright')} {currentYear} {t('copyrightSuffix')} <Link href="https://moxcreative.com" className="text-gray-400 hover:text-white">MoxCreative</Link>.
            </p>
            </div>
            
            {/* Policy Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition duration-300">{t('termsOfUse')}</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-300">{t('privacyPolicy')}</Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition duration-300">{t('cookiePolicy')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}