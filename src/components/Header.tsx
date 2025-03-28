'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header suppressHydrationWarning className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-[120px] h-[40px] relative">
                <Image
                  src="/logo.svg" // You'll need to add this image
                  alt="Logo"
                  fill
                  sizes="120px"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 ml-10">
            <Link 
              href="/" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('about')}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-white hover:text-green-400 transition duration-200 flex items-center">
                {t('services')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  href="/services/web-development" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('webDevelopment')}
                </Link>
                <Link 
                  href="/services/seo" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('seo')}
                </Link>
                <Link 
                  href="/services/digital-marketing" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('digitalMarketing')}
                </Link>
              </div>
            </div>
            
            <Link 
              href="/project" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('project')}
            </Link>
            <Link 
              href="/contact" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('contact')}
            </Link>
            
            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 text-white hover:text-green-400 transition duration-200 flex items-center">
                {t('pages')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link 
                  href="/pages/team" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('team')}
                </Link>
                <Link 
                  href="/pages/faq" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('faq')}
                </Link>
                <Link 
                  href="/pages/pricing" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  {t('pricing')}
                </Link>
              </div>
            </div>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              href="/contact" 
              className="bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-2 rounded-full transition duration-300"
            >
              {t('getStarted')}
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 pb-4">
          <nav className="flex flex-col px-4">
            <Link 
              href="/" 
              className="px-3 py-2 text-white hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              href="/about" 
              className="px-3 py-2 text-white hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <div className="px-3 py-2">
              <p className="text-white mb-1">{t('services')}</p>
              <div className="pl-4 flex flex-col space-y-1">
                <Link 
                  href="/services/web-development" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('webDevelopment')}
                </Link>
                <Link 
                  href="/services/seo" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('seo')}
                </Link>
                <Link 
                  href="/services/digital-marketing" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('digitalMarketing')}
                </Link>
              </div>
            </div>
            <Link 
              href="/project" 
              className="px-3 py-2 text-white hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('project')}
            </Link>
            <Link 
              href="/contact" 
              className="px-3 py-2 text-white hover:text-green-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            <div className="px-3 py-2">
              <p className="text-white mb-1">{t('pages')}</p>
              <div className="pl-4 flex flex-col space-y-1">
                <Link 
                  href="/pages/team" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('team')}
                </Link>
                <Link 
                  href="/pages/faq" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('faq')}
                </Link>
                <Link 
                  href="/pages/pricing" 
                  className="text-sm text-gray-300 hover:text-green-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('pricing')}
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
            <div className="px-3 py-2">
              <Link 
                href="/contact" 
                className="block w-full bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-2 rounded-full text-center transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('getStarted')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}