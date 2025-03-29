'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Check if the page was scrolled more than 50px
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setVisible(false);
      } else {
        // Scrolling up - show header
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', controlHeader);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);
  
  return (
    <header 
      suppressHydrationWarning 
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-md shadow-lg' : 'bg-transparent'
      } ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-25 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-[100px] h-[100px] relative">
                <Image
                  src="/logoWhile.png"
                  alt="Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-4 ml-10 font-[500]">
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
            <Link 
              href="#services" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('services')}
            </Link>
            
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

            <Link 
              href="/blogs" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
            >
              {t('blogs')}
            </Link>
            
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link 
              href="/contact" 
              style={{backgroundColor: 'var(--lightgreen)'}} 
              className={`hover:bg-green-500 text-black ${locale === 'ar' ? 'font-bold' : 'font-medium'} px-6 py-2 rounded-full transition duration-300`}
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
        <div className="md:hidden bg-black/95 pb-4 h-[calc(100vh-100px)] flex flex-col justify-between">
          <nav className="flex flex-col px-4 items-start">
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
            <Link 
              href="#services" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('services')}
            </Link>

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
            <Link 
              href="/blogs" 
              className="px-3 py-2 text-white hover:text-green-400 transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('blogs')}
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </nav>
          <div className="px-3 py-2">
            <Link 
              href="/contact" 
              style={{backgroundColor: 'var(--lightgreen)'}} 
              className="block w-full hover:bg-green-500 text-black font-medium px-6 py-2 rounded-full text-center transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('getStarted')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}