"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import Button from "@/components/Button";
import { Service } from "@/lib/models/service";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Target, Eye, MessageSquare } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("About");
  const thero = useTranslations("HeroSection");
  const tServices = useTranslations("Services");
  const locale = useLocale();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreServices, setHasMoreServices] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        // Check if there are more than 5 services
        setHasMoreServices(data.length > 5);
        // Limit to first 5 services for about section
        setServices(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <Header />
        <main>
          {/* New Hero-style Section */}
          <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="relative w-full h-full">
                <Image
                  src="https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/podcaster-using-a-laptop.jpg"
                  alt="About Background"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/80"></div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
              <h1 className="text-4xl lg:text-5xl mb-8">
                <span className="">{t("whoWeAre_about")}</span> <br />
                <span className="gradient-text font-bold h-[53px]">{t("onlineSuccess_about")}</span>
              </h1>

              <p className={`max-w-4xl text-lg mb-12 mx-auto leading-relaxed text-center`}>
                {t("description_about")}
              </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    link="https://wa.me/966549292268"
                    content={thero("getStarted")}
                    size="md"
                    className={locale === "ar" ? "font-bold" : "font-medium"}
                  />
                  <Button
                    link="/project"
                    content={thero("explorePortfolio")}
                    variant="secondary"
                    size="md"
                    icon={
                      <ArrowRight
                        className={`h-5 w-5 ${locale === "ar" ? "rotate-180" : ""}`}
                      />
                    }
                  />
                </div>
            </div>
          </div>

          <section id="about" className="py-16 md:py-24 bg-[#151515] text-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left side - Services list with image */}
                <div className="lg:w-1/2 relative">
                  <div className="relative rounded-lg mb-10 lg:mb-0">
                    <Image
                      src="https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-web-designers-working-together-at-modern-office-1536x1024.jpg"
                      alt="Team working together"
                      width={800}
                      height={600}
                      className="rounded-lg"
                    />

                    {/* Services list overlay */}
                    <div
                      className={`absolute ${locale === "ar" ? "right-[-10%]" : "left-[-10%]"} bottom-[-10%] bg-black/90 p-8 backdrop-blur-sm rounded-2xl`}
                    >
                      {isLoading ? (
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {services.map((service) => (
                            <div key={service.id} className="flex items-center gap-4">
                              <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-4 h-4 text-green-400"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <p className="text-lg">
                                {service.title[locale] || service.title["en"]}
                              </p>
                            </div>
                          ))}
                          {hasMoreServices && (
                            <div className="pt-4 border-t border-white/10">
                              <Button
                                link="/services"
                                content={tServices("viewAllServices")}
                                size="md"
                                className="w-full"
                                icon={
                                  <LucideIcons.ArrowRight
                                    className={`h-5 w-5 ${locale === "ar" ? "rotate-180" : ""}`}
                                  />
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side - Text content */}
                <div className="lg:w-1/2">
                  <div
                    style={{ color: "var(--lightgreen)" }}
                    className="text-green-400 font-medium mb-2"
                  >
                    {t("whoWeAre_about")}
                  </div>

                  <h2
                    className={`text-2xl md:text-3xl ${locale === "ar" ? "font-bold" : "font-medium"}  mb-6`}
                  >
                    <span className="gradient-text">{t("onlineSuccess_about")} </span>
                  </h2>

                  <p className="text-gray-400 mb-10">{t("description_about")}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-around gap-6 mb-10 border-y-[1px] border-white/10 py-10">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-medium">+2000</h3>
                      <p className="text-gray-400">{t("projectsDone")}</p>
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-medium">+100</h3>
                      <p className="text-gray-400">{t("happyClients")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Goal, Vision, Mission Section */}
          <section className="py-16 md:py-24 bg-[#242424] text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {locale === "ar" ? "قيمنا ورؤيتنا" : "Our Values & Vision"}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {locale === "ar" 
                    ? "نؤمن بالابتكار والتميز في كل ما نقدمه لعملائنا"
                    : "We believe in innovation and excellence in everything we provide to our clients"
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Goal Card */}
                <div className="relative bg-[#151515] rounded-2xl p-8 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                    <Target size={30} strokeWidth={1.2} />
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" ? "هدفنا" : "Our Goal"}
                  </h3>
                  <p className={`text-gray-400 leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" 
                      ? "نهدف إلى تمكين الأفراد والشركات من مواكبة التطور التقني من خلال تقديم خدمات مبتكرة، سهلة الاستخدام، وعالية الكفاءة، تُسهم في بناء مستقبل رقمي أكثر ذكاءً وإبداعًا."
                      : "We aim to enable individuals and companies to keep pace with technological development by providing innovative, user-friendly, and highly efficient services that contribute to building a smarter and more creative digital future."
                    }
                  </p>
                </div>

                {/* Vision Card */}
                <div className="relative bg-[#151515] rounded-2xl p-8 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                    <Eye size={30} strokeWidth={1.2} />
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" ? "رؤيتنا" : "Our Vision"}
                  </h3>
                  <p className={`text-gray-400 leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" 
                      ? "نسعى لأن نكون روّادًا في عالم التقنية، نبتكر ونطوّر حلولًا رقمية متكاملة تعيد تعريف تجربة المستخدم، وتمكّن الشركات من تحقيق أقصى إمكاناتها في العصر الرقمي. نستمد ثقتنا ورؤيتنا من رؤية ولاة أمرنا."
                      : "We strive to be pioneers in the world of technology, innovating and developing integrated digital solutions that redefine the user experience and enable companies to achieve their maximum potential in the digital age. We derive our confidence and vision from the vision of our leaders."
                    }
                  </p>
                </div>

                {/* Mission Card */}
                <div className="relative bg-[#151515] rounded-2xl p-8 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-16 h-16 rounded-full flex items-center justify-center mb-6 text-black">
                    <MessageSquare size={30} strokeWidth={1.2} />
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-4 ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" ? "رسالتنا" : "Our Mission"}
                  </h3>
                  <p className={`text-gray-400 leading-relaxed ${locale === "ar" ? "text-right" : "text-left"}`}>
                    {locale === "ar" 
                      ? "نؤمن بأن التقنية هي مفتاح النجاح في الحاضر والمستقبل، لذلك نقدم حلولًا إبداعية ومتطورة في تصميم التطبيقات والمواقع، وتأسيس الشركات، وعمليات الأتمتة، وكل ما يتعلق بالتقنية، لضمان نمو مستدام وتحول رقمي فعّال."
                      : "We believe that technology is the key to success in the present and future, so we provide creative and advanced solutions in designing applications and websites, establishing companies, automation processes, and everything related to technology, to ensure sustainable growth and effective digital transformation."
                    }
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Services Section */}
          <section className="py-16 bg-[#151515]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {locale === "ar" ? "خبراتنا وخدماتنا" : "Our Expertise & Services"}
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  {locale === "ar"
                    ? "نقدم مجموعة شاملة من الخدمات المتخصصة في التقنية والتسويق الرقمي"
                    : "We provide a comprehensive range of specialized services in technology and digital marketing"}
                </p>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Visual & Brand Identity Design */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Palette size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "تصميم الهويات البصرية والتجارية"
                      : "Visual & Brand Identity Design"}
                  </h3>
                </div>
  
                {/* E-commerce Store Setup */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.ShoppingCart size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "تأسيس المتاجر الالكترونية"
                      : "E-commerce Store Setup"}
                  </h3>
                </div>
  
                {/* Social Media Management */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Share2 size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "إدارة حسابات السوشيل ميديا"
                      : "Social Media Management"}
                  </h3>
                </div>
  
                {/* Cybersecurity */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Shield size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar" ? "الأمن السيبراني" : "Cybersecurity"}
                  </h3>
                </div>
  
                {/* System Integration */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Settings size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar" ? "التكامل مع الأنظمة" : "System Integration"}
                  </h3>
                </div>
  
                {/* Legal Compliance & Guidance */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Scale size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "الامتثال والإرشاد القانوني"
                      : "Legal Compliance & Guidance"}
                  </h3>
                </div>
  
                {/* Process Automation */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Zap size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "أتمتة العمليات التشغيلية والتنفيذية"
                      : "Operational & Executive Process Automation"}
                  </h3>
                </div>
  
                {/* Brand Building */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Building size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "تأسيس وبناء العلامات التجارية"
                      : "Brand Building & Establishment"}
                  </h3>
                </div>
  
                {/* AI-Powered Solutions */}
                <div className="relative bg-[#242424] rounded-2xl p-6 flex flex-col h-full border-[1px] border-[#3c3c3c] hover:border-[#73e896]/40 transition-all duration-300">
                  <div className="bg-[#65DBA8] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-black">
                    <LucideIcons.Brain size={24} strokeWidth={1.2} />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white mb-2 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "ar"
                      ? "إنشاء حلول مدعمة بالذكاء الاصطناعي"
                      : "AI-Powered Solutions Development"}
                  </h3>
                </div>
              </div>
            </div>
          </section>
          
        </main>
      <Footer />
    </>
  );
}
