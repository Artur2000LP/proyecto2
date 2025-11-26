import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/ui/Navigation';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "TICs - Inteligencia Artificial e Innovación Educativa",
  description: "Portafolio del curso de Inteligencia Artificial aplicada a la innovación educativa. Explora sesiones, herramientas y aplicaciones de IA en el aula.",
  keywords: "TICs, Inteligencia Artificial, Innovación Educativa, IA Educación, Herramientas IA, UNESCO, Abancay",
  authors: [{ name: "Curso TICs IA" }],
  creator: "Curso TICs IA",
  publisher: "Curso TICs IA",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://tics-ia-educacion.com",
    title: "TICs - Inteligencia Artificial e Innovación Educativa",
    description: "Portafolio del curso de IA aplicada a la educación. Sesiones completas, herramientas y aplicaciones prácticas.",
    siteName: "TICs IA Educación",
  },
  twitter: {
    card: "summary_large_image",
    title: "TICs - Inteligencia Artificial e Innovación Educativa",
    description: "Curso de IA aplicada a la educación con sesiones y herramientas prácticas",
    creator: "@TicsIAEducacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased font-sans`}
      >
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
