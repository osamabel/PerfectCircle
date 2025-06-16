"use client";

import { ReactNode } from "react";

interface FormButtonProps {
  content: string;
  icon?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export default function FormButton({
  content,
  icon,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  disabled = false,
  onClick,
}: FormButtonProps) {
  // Base styles that are consistent across all buttons
  const baseStyles =
    "font-medium rounded-full transition-all duration-300 inline-flex items-center justify-center";

  // Variant styles
  const variantStyles = {
    primary:
      "cursor-pointer bg-[#65DBA8] border-[1px] border-transparent text-black hover:bg-transparent hover:border-[#73e896]/40 hover:text-[#65DBA8]",
    secondary:
      "cursor-pointer border-[1px] border-white text-white hover:bg-white hover:text-black",
  };

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";

  // Disabled styles
  const disabledStyles = disabled ? "opacity-70 cursor-not-allowed" : "";

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`;

  return (
    <button
      type={type}
      className={combinedStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}
