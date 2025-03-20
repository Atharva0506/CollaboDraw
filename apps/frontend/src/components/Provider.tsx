"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@repo/ui";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
     {children}
      <Toaster />
    </SessionProvider>
  );
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}