"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Button from "./Button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("HeroSection");
  const locale = useLocale();

  return (
    <div
      suppressHydrationWarning
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://template.creativemox.com/webiso/wp-content/uploads/sites/23/2024/06/podcaster-using-a-laptop.jpg" // You'll need to add this image to your public folder
            alt="Background"
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
          <span className="">{t("one")}</span> <br />
          <span className="gradient-text font-bold h-[53px]">{t("two")}</span>
        </h1>

        <p className="max-w-2xl text-lg mb-12 mx-auto">{t("description")}</p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            link="https://wa.me/966549292268"
            content={t("getStarted")}
            size="md"
            className={locale === "ar" ? "font-bold" : "font-medium"}
          />
          <Button
            link="/#project"
            content={t("explorePortfolio")}
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
  );
}
