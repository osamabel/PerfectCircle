import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <p className="mb-6">{t('description')}</p>
      
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            {t('message')}
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-4 py-2 border rounded-md"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {t('send')}
        </button>
      </form>
      
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