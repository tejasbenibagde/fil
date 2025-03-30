import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
export const metadata = {
  title: "OpenUtils - Free Open Source File Utilities",
  description:
    "A collection of free, open-source tools to work with your files. No ads, no tracking, just utilities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <ScrollArea className="h-screen w-full">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </body>
      </html>
    </>
  );
}
