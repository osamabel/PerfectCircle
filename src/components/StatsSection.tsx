"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Button from "./Button";

export default function StatsSection() {
  const t = useTranslations("Stats");

  return (
    <section className="bg-[#151515] text-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-16">
          {/* Text content */}
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              {t("innovative")} <br className="hidden md:block" />
              <span className="gradient-text">{t("modernBusinesses")}</span>
            </h2>

            <p className="text-gray-400 mb-8 max-w-xl">{t("description")}</p>

            <Button link="/services" content={t("learnMore")} size="md" />
          </div>

          {/* Stats cards */}
          <div className="md:w-1/2 flex flex-col lg:flex-row gap-6">
            {/* Traffic increase stat */}
            <div className="bg-[#1A1A1A] rounded-lg p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-4xl font-medium text-white">+60%</h3>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "var(--lightgreen)" }}
                >
                  <path
                    d="M20 8.33334L20 31.6667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33331 20L20 8.33334L31.6666 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-xl text-gray-400 mt-1">
                {t("trafficIncrease")}
              </p>

              <div className="border-t border-gray-700 my-4"></div>

              <p className="text-gray-400 mt-auto">{t("trafficDescription")}</p>
            </div>

            {/* Revenue increase stat */}
            <div className="border-[#2e2e2e] border-[1px] rounded-lg p-10 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-4xl font-medium text-white">+30%</h3>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "var(--lightgreen)" }}
                >
                  <path
                    d="M20 8.33334L20 31.6667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33331 20L20 8.33334L31.6666 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-xl text-gray-400 mt-1">
                {t("revenueIncrease")}
              </p>

              <div className="border-t border-gray-700 my-4"></div>

              <p className="text-gray-400 mt-auto">{t("revenueDescription")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
