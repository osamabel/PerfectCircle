'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function TeamSection() {
  const t = useTranslations('Team');
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Team members data
  const teamMembers = [
    {
      id: 'oscar',
      name: 'Oscar Andrews',
      position: 'Founder',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/11.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 'jamie',
      name: 'Jamie Williams',
      position: 'Co-Founder',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/6.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 'bethany',
      name: 'Bethany Brooks',
      position: 'Business Manager',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/13.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      }
    },
    {
      id: 'mason',
      name: 'Mason Lawson',
      position: 'Marketing Manager',
      image: 'https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/9.jpg',
      socialLinks: {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com'
      }
    }
  ];

  // Update slides to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(4);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev === teamMembers.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? teamMembers.length - slidesToShow : prev - 1
    );
  };

  // Calculate visible members
  const visibleMembers = teamMembers.slice(currentSlide, currentSlide + slidesToShow).length < slidesToShow 
    ? [...teamMembers.slice(currentSlide), ...teamMembers.slice(0, slidesToShow - (teamMembers.length - currentSlide))]
    : teamMembers.slice(currentSlide, currentSlide + slidesToShow);

  return (
    <section className="bg-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-green-400 uppercase tracking-widest mb-4">
            {t('meetOurTeam')}
          </p>
          <h2 className="text-3xl md:text-4xl  mb-4">
            {t('weTalk')} <span className="gradient-text">{t('hope')}</span> {t('helping')}
            <br />
            {t('and')} <span className="gradient-text">{t('teamwork')}</span>.
          </h2>
        </div>
        
        {/* Team Members Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          {teamMembers.length > slidesToShow && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-black w-10 h-10 rounded-full flex items-center justify-center -ml-5 focus:outline-none"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-black w-10 h-10 rounded-full flex items-center justify-center -mr-5 focus:outline-none"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              gap: '1.5rem',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {visibleMembers.map((member) => (
                <div 
                  key={member.id}
                  className="relative rounded-t-lg overflow-hidden bg-[#1A1A1A] group"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  {/* Member Image */}
                  <div className="aspect-square w-full">
                    <div className="relative h-full w-full">
                        <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover grayscale-[100%] hover:grayscale-0 transition-all duration-500 ease-in-out"
                        />
                      {/* Social Icons (visible on hover) */}
                      <div className={`absolute right-4 top-4 flex flex-col space-y-2 transition-opacity bg-white p-2 rounded-full duration-300 ${
                        hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <a 
                          href={member.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-green-400 text-black p-2 rounded-full hover:bg-green-500 transition-all"
                          aria-label="Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                          </svg>
                        </a>
                        <a 
                          href={member.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-green-400 text-black p-2 rounded-full hover:bg-green-500 transition-all"
                          aria-label="Twitter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                        <a 
                          href={member.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-green-400 text-black p-2 rounded-full hover:bg-green-500 transition-all"
                          aria-label="LinkedIn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-400">
                      {member.position}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pagination Dots (optional) */}
          {teamMembers.length > slidesToShow && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(teamMembers.length / slidesToShow) }).map((_, index) => {
                const isActive = index === Math.floor(currentSlide / slidesToShow);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index * slidesToShow)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-green-400 w-6' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}