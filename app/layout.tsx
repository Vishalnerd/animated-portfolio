// src/app/layout.tsx
import { Architects_Daughter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/app/components/LenisProvider";
import CustomCursor from "@/app/components/CustomCursor";

const handwritten = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sketch",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Vishal's - Portfolio",
  description:
    "A sketchy, notebook-style developer portfolio showcasing projects, skills, and journey",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${handwritten.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink selection:bg-marker selection:text-ink">
        {/* Paper texture overlay */}
        <div className="notebook-overlay" />
        <CustomCursor />

        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
