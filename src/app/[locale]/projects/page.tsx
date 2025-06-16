"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProjectWithCategory } from "@/lib/models/project";
import { Category } from "@/lib/models/category";
import CustomImage from "@/components/CustomImageProps";

export default function ProjectsPage() {
  const locale = useLocale();
  const t = useTranslations("Projects");
  const searchParams = useSearchParams();
  const [projects, setProjects] = useState<ProjectWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Get category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategorySlug(categoryParam);
    }
  }, [searchParams]);

  // Fetch published projects and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch projects and categories in parallel
        const [projectsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/categories"),
        ]);

        if (!projectsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [allProjects, allCategories] = await Promise.all([
          projectsResponse.json(),
          categoriesResponse.json(),
        ]);

        // Filter published projects only
        const publishedProjects = allProjects.filter(
          (project: ProjectWithCategory) => project.status === "published"
        );

        setProjects(publishedProjects);
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter projects by category
  const filteredProjects = selectedCategorySlug
    ? projects.filter((project) => {
        return (
          project.category && project.category.slug === selectedCategorySlug
        );
      })
    : projects;

  // Get selected category name for display
  const selectedCategory = categories.find(
    (cat) => cat.slug === selectedCategorySlug
  );

  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="bg-[#242424] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {t("ourProjects")}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {locale === "ar"
                ? "مجموعة من المشاريع التي نفتخر بها ونعرضها لإظهار خبرتنا ومهاراتنا"
                : "A collection of projects we are proud to showcase demonstrating our expertise and skills"}
            </p>
          </div>
        </section>

        {/* Category filter */}
        {categories.length > 0 && (
          <section className="bg-gray-100 py-6">
            <div className="container mx-auto px-4">
              <div
                className="flex items-center gap-4 overflow-x-auto pb-2"
                style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
              >
                <button
                  onClick={() => setSelectedCategorySlug(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    selectedCategorySlug === null
                      ? "bg-[#65DBA8] text-black"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {locale === "ar" ? "الكل" : "All"}
                </button>

                {categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategorySlug(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      selectedCategorySlug === category.slug
                        ? "bg-[#65DBA8] text-black"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category.name[locale] || category.name["en"]}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects grid */}
        <section className="py-16 bg-[#151515]">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-500">
                  {selectedCategorySlug
                    ? locale === "ar"
                      ? `لا توجد مشاريع في فئة "${selectedCategory?.name[locale] || selectedCategory?.name["en"] || selectedCategorySlug}"`
                      : `No projects found in category "${selectedCategory?.name[locale] || selectedCategory?.name["en"] || selectedCategorySlug}"`
                    : locale === "ar"
                      ? "لا توجد مشاريع متاحة حاليًا"
                      : "No projects available at the moment"}
                </h3>
                {selectedCategorySlug && (
                  <button
                    onClick={() => setSelectedCategorySlug(null)}
                    className="mt-4 text-[#65DBA8] hover:underline"
                  >
                    {locale === "ar"
                      ? "عرض جميع المشاريع"
                      : "View all projects"}
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="relative rounded-lg overflow-hidden group"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    {/* Project Image */}
                    <div className="aspect-video w-full overflow-hidden bg-[#151515] h-[500px]">
                      <div className="h-full w-full relative">
                        {project.featured_image ? (
                          <CustomImage
                            src={project.featured_image}
                            alt={project.title[locale] || ""}
                            fill
                            className={`object-cover transition-transform duration-500 ${
                              hoveredProject === project.id
                                ? "scale-110"
                                : "scale-100"
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Info */}
                    <div
                      className={`absolute inset-x-0 bottom-0 bg-[#242424]  p-6 transition-all duration-300 ease-in-out ${
                        hoveredProject === project.id
                          ? "translate-y-0"
                          : "translate-y-[calc(100%-100px)]"
                      }`}
                    >
                      <div className="mb-2">
                        <span className="text-gray-400 text-sm">
                          {project.category
                            ? project.category.name[locale] ||
                              project.category.name["en"]
                            : ""}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-white">
                        {project.title[locale] || project.title["en"]}
                      </h3>
                      <p
                        className={`text-gray-400 mb-6 line-clamp-2 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}`}
                        style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
                      >
                        {project.description[locale] ||
                          project.description["en"]}
                      </p>

                      {/* Button that appears on hover */}
                      <div
                        className={`transition-opacity duration-300 ${
                          hoveredProject === project.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <Link
                          href={`/projects/${project.slug}`}
                          style={{ backgroundColor: "var(--lightgreen)" }}
                          className="bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-3 rounded-full inline-block text-center transition duration-300"
                        >
                          {t("learnMore")}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-[#242424] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {locale === "ar"
                ? "هل لديك مشروع تريد تنفيذه؟"
                : "Have a project in mind?"}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              {locale === "ar"
                ? "نحن هنا لمساعدتك في تحويل أفكارك إلى حقيقة. دعنا نتعاون لإنشاء شيء مميز."
                : "We are here to help you turn your ideas into reality. Let's collaborate to create something exceptional."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-black bg-[#65DBA8] hover:bg-green-500 transition-colors"
            >
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
