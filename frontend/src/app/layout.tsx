import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Harmony Surgitech - Advanced Surgical Solutions",
  description: "Leading provider of high-quality surgical instruments and medical equipment for healthcare professionals worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
