"use client";

import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeProvider({ children, ...props }: any) {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
  }, []);

  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
