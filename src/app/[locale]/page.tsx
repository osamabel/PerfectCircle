import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  const t = useTranslations('HomePage');
  
  return (
    <>
      <HeroSection />
      <div className="py-10">
        <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
        <Link href="/about" className="text-blue-600 hover:underline">
          {t('about')}
        </Link>
      </div>
    </>
  );
}