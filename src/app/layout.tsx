import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Titania Sync",
  description: "Plataforma de seguimiento y gestión de compromisos ambientales SEIA. Análisis inteligente de la Matriz de Compromisos Ambientales.",
  icons: {
    icon: "/t.png",
    shortcut: "/t.png",
    apple: "/t.png",
  },
  openGraph: {
    images: ["/fotos/IA-6.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/fotos/IA-6.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
