import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeroSection from '@/components/HeroSection';
import ConsultationSection from '@/components/Consultation';
import Header from '@/components/Header';
import AboutSection from './about/page';
import Grow from '@/components/Grow';
import StatsSection from '@/components/StatsSection';
import ServicesSection from '@/components/ServicesSection';
import Ready from '@/components/Ready';
import ProjectsSection from '@/components/ProjectsSection';
import Footer from '@/components/Footer';
import TeamSection from '@/components/TeamSection';
import BlogSection from '@/components/BlogSection';
// src/app/test-image/page.tsx
function TestImage() {
  const imagePath = '/uploads/team/1743546177672-musique.png'; // Use a known image

  return (
    <div style={{ padding: '20px' }}>
      <h1>Image Test</h1>
      
      <div>
        <h2>Standard IMG tag:</h2>
        <img 
          src={imagePath} 
          alt="Test image" 
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h2>Direct URL:</h2>
        <p>
          <a href={imagePath} target="_blank" rel="noopener noreferrer">
            Open image directly
          </a>
        </p>
      </div>
    </div>
  );
}
export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <>
      <Header/>
      <TestImage />
      <HeroSection />
      <ConsultationSection />
      <AboutSection />
      <Grow />
      <StatsSection />
      <ServicesSection />
      <Ready />
      <ProjectsSection />
      <BlogSection />
      <TeamSection />
      <Footer />
    </>
  );
}