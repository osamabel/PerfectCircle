"use client";

import { Globe, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Button from "./Button";
import FormButton from "./FormButton";

export default function ConsultationSection() {
  const t = useTranslations("Consultation");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Success! Clear the form
      setFormData({
        name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
      });

      setSubmitStatus("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setErrorMessage((error as Error).message || t("errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#151515] lg:h-[460px] text-white py-8 md:py-24"
    >
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row gap-y-[40px]">
        {/* Left side - Service Icons */}
        <div className="lg:w-[60%] mb-10 lg:mb-0 lg:pr-8 flex flex-col lg:flex-row gap-[30px] ">
          <div className="mb-8">
            <div className="w-14 h-14">
              <Globe
                strokeWidth={1.2}
                style={{ color: "var(--lightgreen)" }}
                size={50}
              />
            </div>
            <h3 className="text-2xl mb-4">{t("designTitle")}</h3>
            <p className="text-gray-400">{t("designDescription")}</p>
          </div>

          <div>
            <div className="w-14 h-14">
              <Settings
                strokeWidth={1.2}
                style={{ color: "var(--lightgreen)" }}
                size={50}
              />
            </div>
            <h3 className="text-2xl mb-4">{t("maintenanceTitle")}</h3>
            <p className="text-gray-400">{t("maintenanceDescription")}</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="lg:w-[40%] lg:pl-8 lg:transform lg:-translate-y-[40%]">
          <div className="bg-white text-black p-8 rounded-lg relative">
            <h2 className="text-3xl font-medium mb-6">{t("formTitle")}</h2>

            {submitStatus === "success" ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p className="font-medium">Thank you for your message!</p>
                <p>
                  We've received your inquiry and will get back to you soon.
                </p>
                <FormButton
                  content="Send another message"
                  size="sm"
                  onClick={() => setSubmitStatus("idle")}
                />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-2">
                    <label htmlFor="name" className="block mb-1 font-medium">
                      {t("nameLabel")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                      placeholder={t("namePlaceholder")}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="company" className="block mb-2 font-medium">
                      {t("companyLabel")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                      placeholder={t("companyPlaceholder")}
                    />
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      {t("phoneLabel")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                      placeholder={t("phonePlaceholder")}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      {t("emailLabel")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6]"
                      placeholder={t("emailPlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    {t("messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-2 bg-[#e9e9e9] rounded-md border-[1px] border-[#d6d6d6] "
                    placeholder={t("messagePlaceholder")}
                    required
                  ></textarea>
                </div>

                {submitStatus === "error" && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error sending message</p>
                    <p>{errorMessage || t("errorMessage")}</p>
                  </div>
                )}

                <FormButton
                  type="submit"
                  content={isSubmitting ? t("submitting") : t("submitButton")}
                  fullWidth={true}
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : undefined
                  }
                />
              </form>
            )}

            <div
              style={{ color: "var(--lightgreen)" }}
              className="hidden lg:block absolute left-[-20px] bottom-[-16px] transform -rotate-90 origin-left"
            >
              <span className="text-2xl font-medium tracking-widest uppercase">
                {t("sideText")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
