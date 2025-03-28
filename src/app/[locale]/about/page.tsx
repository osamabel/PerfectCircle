import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="mb-6">{t('description')}</p>
      
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
          velit vel ultricies lacinia, nisl nunc aliquam nunc, vitae aliquam nunc 
          nisl vel nisl. Sed euismod, velit vel ultricies lacinia, nisl nunc 
          aliquam nunc, vitae aliquam nunc nisl vel nisl.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
          velit vel ultricies lacinia, nisl nunc aliquam nunc, vitae aliquam nunc 
          nisl vel nisl. Sed euismod, velit vel ultricies lacinia, nisl nunc 
          aliquam nunc, vitae aliquam nunc nisl vel nisl.
        </p>
      </div>
      
      <div className="mt-8">
        <Link 
          href="/" 
          className="text-blue-600 hover:underline"
        >
          ← {t('back')}
        </Link>
      </div>
    </div>
  );
}