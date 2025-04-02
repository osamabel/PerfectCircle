// components/CustomImage.tsx
import React from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;  // Add the priority property
}

export default function CustomImage({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  fill,
  priority  // Include in component props
}: CustomImageProps) {
  // If the image is from uploads directory, use the API route
  const imageSrc = src.startsWith('/uploads') 
    ? `/api/check-file?path=${src}`
    : src;
  
  // Define style based on props
  const style: React.CSSProperties = {};
  
  if (width) style.width = `${width}px`;
  if (height) style.height = `${height}px`;
  
  // Handle fill property similar to Next.js Image
  if (fill) {
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    style.width = '100%';
    style.height = '100%';
  }
  
  // The priority prop in Next.js Image is used for preloading
  // For regular img tags, we can't exactly replicate this behavior
  // but we can add it as a data attribute for documentation
  const dataAttributes: Record<string, string> = {};
  if (priority) {
    dataAttributes['data-priority'] = 'true';
    // Optionally, you could add a preload link for this image
    // but that would require modifying the document head
  }
  
  return (
    <img 
      src={imageSrc} 
      alt={alt}
      className={className}
      style={style}
      {...dataAttributes}
      loading={priority ? "eager" : "lazy"}
    />
  );
}