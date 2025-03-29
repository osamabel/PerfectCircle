'use client';

import { Globe, Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ConsultationSection() {
  const t = useTranslations('Consultation');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would add your actual form submission logic
    // For example:
    // await submitFormToAPI(formData);
    
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative bg-[#151515] lg:h-[460px] text-white py-8 md:py-24">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row gap-y-[40px]">
        {/* Left side - Service Icons */}
        <div className="lg:w-[60%] mb-10 lg:mb-0 lg:pr-8 flex flex-col lg:flex-row gap-[30px] ">
          <div className="mb-8">
            <div className="w-14 h-14">
              <Globe strokeWidth={1.2} style={{color: 'var(--lightgreen)'}} size={50} />
            </div>
            <h3 className="text-2xl mb-4">{t('designTitle')}</h3>
            <p className="text-gray-400">{t('designDescription')}</p>
          </div>
          
          <div>
            <div className="w-14 h-14">
              <Settings strokeWidth={1.2} style={{color: 'var(--lightgreen)'}} size={50}/>
            </div>
            <h3 className="text-2xl mb-4">{t('maintenanceTitle')}</h3>
            <p className="text-gray-400">{t('maintenanceDescription')}</p>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="lg:w-[40%] lg:pl-8 lg:transform lg:-translate-y-[40%]">
          <div className="bg-white text-black p-8 rounded-lg relative">
            <h2 className="text-3xl font-medium mb-6">{t('formTitle')}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="mb-2">
                    <label htmlFor="name" className="block mb-1 font-medium">
                    {t('nameLabel')}
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                    placeholder={t('namePlaceholder')}
                    required
                    />
                </div>
                
                <div className="mb-2">
                    <label htmlFor="company" className="block mb-2 font-medium">
                    {t('companyLabel')}
                    </label>
                    <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                    placeholder={t('companyPlaceholder')}
                    />
                </div>
              </div>
              
              <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">
                    {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                    placeholder={t('phonePlaceholder')}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    {t('emailLabel')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                    placeholder={t('emailPlaceholder')}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">
                  {t('messageLabel')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6] "
                  placeholder={t('messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                style={{backgroundColor: 'var(--lightgreen)'}} 
                className={`w-full py-3 px-4 hover:bg-green-500 text-black font-medium rounded-full transition-all duration-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('submitting') : t('submitButton')}
              </button>
            </form>
            <div style={{color: 'var(--lightgreen)'}}  className="hidden lg:block absolute left-[-20px] bottom-[-16px] transform -rotate-90 origin-left">
                <span className="text-2xl font-medium tracking-widest uppercase">
                {t('sideText')}
                </span>
            </div>
          </div>
            
        </div>
      </div>
      
      
    </section>
  );
}