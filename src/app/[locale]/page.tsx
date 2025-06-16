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

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <>
      <Header/>
      <HeroSection />
      <ConsultationSection />
      <AboutSection />
      <Grow />
      <StatsSection />
      <ServicesSection />
      <Ready />
      <ProjectsSection />
      {/* <BlogSection /> */}
      <TeamSection />
      <Footer />
    </>
  );
}