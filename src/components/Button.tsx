"use client";

import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface ButtonProps {
  link: string;
  content: string;
  icon?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function Button({
  link,
  content,
  icon,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
}: ButtonProps) {
  const locale = useLocale();

  // Base styles that are consistent across all buttons
  const baseStyles =
    "cursor-pointer font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center";

  // Variant styles
  const variantStyles = {
    primary:
      "bg-[#65DBA8] border-[1px] border-transparent text-black hover:bg-transparent hover:border-[#73e896]/40 hover:text-[#65DBA8]",
    secondary:
      "border-[1px] border-white text-white hover:bg-white hover:text-black",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <Link href={link} className={combinedStyles}>
      {content}
      {icon && (
        <span className={locale === "ar" ? "mr-2" : "ml-2"}>{icon}</span>
      )}
    </Link>
  );
}
