"use client";

import { useEffect } from 'react';

export default function DirectionProvider({
  lang,
  children,
}: {
  lang: string;
  children: React.ReactNode;
}) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  useEffect(() => {
    // Update the html dir attribute
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.className = dir;
  }, [dir, lang]);
  
  return <>{children}</>;
}