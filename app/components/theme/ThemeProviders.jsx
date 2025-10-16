"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProviders({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
