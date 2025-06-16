"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Category } from "@/lib/models/category";
import Button from "./Button";

export default function ProjectsSection() {
  const locale = useLocale();
  const t = useTranslations("Projects");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const allCategories = await response.json();
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-[#151515] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="project" className="bg-[#151515] text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-2">
            {t("inspired")}{" "}
            <span className="gradient-text">
              {t("ourProjects")}
              {locale == "ar" ? "؟" : "?"}{" "}
            </span>{" "}
            {t("letsCreate")}
          </h2>
          <h3 className="text-3xl md:text-4xl">{t("yours")}</h3>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No categories to display yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-[#242424] p-6 rounded-lg border border-gray-700 hover:border-green-400 transition-all duration-300 group"
              >
                {/* Category Title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-green-400 transition-colors">
                  {category.name[locale] || category.name["en"]}
                </h3>

                {/* Category Description */}
                <p
                  className="text-gray-400 mb-6 leading-relaxed"
                  style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
                >
                  {category.description?.[locale] ||
                    category.description?.["en"] ||
                    `Explore our ${category.name["en"].toLowerCase()} projects and solutions`}
                </p>

                {/* Button */}
                <Button
                  link={`/projects?category=${category.slug}`}
                  content={`View ${category.name["en"]} Projects`}
                  size="md"
                  icon={
                    <LucideIcons.ArrowRight
                      className={`h-4 w-4 ${locale === "ar" ? "rotate-180" : ""}`}
                    />
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        {categories.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              link="/projects"
              content={t("allProjects")}
              size="lg"
              icon={
                <LucideIcons.ArrowRight
                  className={`h-5 w-5 ${locale === "ar" ? "rotate-180" : ""}`}
                />
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
