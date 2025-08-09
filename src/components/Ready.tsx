"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import CompanyMarquee from "./CompanyMarquee";
import Button from "./Button";

export default function Ready() {
  const t = useTranslations("Ready");
  const tb = useTranslations("Header");

  const locale = useLocale();
  return (
    <div className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-screen">
          <Image
            src="https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/young-woman-customer-support-posing-in-the-office.jpg"
            alt="Developers working"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/10"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 flex-grow flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Content - Card */}
              <div className="bg-black/30 backdrop-blur-sm p-14 rounded-xl">
                <h1 className="text-3xl md:text-4xl font-medium text-white mb-4">
                  {t("ready")} {t("build")} <br />
                  <span className="gradient-text"> {t("great")}</span>
                  <br />
                  {t("together")}
                </h1>

                <p className="text-gray-300 mb-8 max-w-lg">
                  {t("description")}
                </p>
                  <Button
                    link="https://wa.me/966549292268"
                    content={tb("getStarted")}
                    size="md"
                    className={locale === "ar" ? "font-bold" : "font-medium"}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
