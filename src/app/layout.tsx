/**
 * Root Layout Component
 * 
 * Defines the root layout structure for the entire application including
 * global metadata, font configuration, and HTML structure. Optimized for
 * SEO with comprehensive meta tags, Open Graph data, and structured data.
 * 
 * SEO Features:
 * - Comprehensive meta tags for search engines
 * - Open Graph tags for social media sharing
 * - Structured data for rich snippets
 * - Optimized font loading with Google Fonts
 * - Semantic HTML structure
 */

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

// Font configuration with optimized loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

/**
 * Comprehensive SEO metadata configuration
 * 
 * Includes all essential meta tags for search engine optimization,
 * social media sharing, and structured data markup.
 */
export const metadata: Metadata = {
  // Metadata base for resolving relative URLs
  metadataBase: new URL("https://iamyasasbanuka.me"),
  
  // Primary meta tags
  title: {
    default: "Yasas Banuka - Software Engineer & Student Leader",
    template: "%s | Yasas Banuka Portfolio"
  },
  description: "Software & Network Engineering student specializing in full-stack development, cloud computing, and community leadership. IEEE volunteer, student influencer, and passionate problem-solver building scalable solutions.",
  
  // SEO keywords
  keywords: [
    "Yasas Banuka",
    "Software Engineer",
    "Full Stack Developer", 
    "Cloud Computing",
    "Network Engineering",
    "IEEE Volunteer",
    "Student Leader",
    "React Developer",
    "Java Spring Boot",
    "Azure Cloud",
    "DevOps",
    "Mobile Development",
    "IoT Projects",
    "Portfolio",
    "Sri Lanka Developer"
  ],
  
  // Author and creator information
  authors: [{ 
    name: "Yasas Banuka",
    url: "https://iamyasasbanuka.me"
  }],
  creator: "Yasas Banuka",
  
  // Open Graph metadata for social media
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamyasasbanuka.me",
    siteName: "Yasas Banuka Portfolio",
    title: "Yasas Banuka - Software Engineer & Student Leader",
    description: "Software & Network Engineering student specializing in full-stack development, cloud computing, and community leadership. IEEE volunteer, student influencer, and passionate problem-solver.",
    images: [
      {
        url: "/images/about/yasas-banuka-professional-headshot-square.jpg",
        width: 1200,
        height: 630,
        alt: "Yasas Banuka - Software Engineer and Student Leader Professional Headshot"
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Yasas Banuka - Software Engineer & Student Leader",
    description: "Software & Network Engineering student specializing in full-stack development, cloud computing, and community leadership.",
    images: ["/images/about/yasas-banuka-professional-headshot-square.jpg"],
    creator: "@yasasbanuka"
  },
  
  // Additional SEO metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification tags
  verification: {
    google: "7_d4q4alzR7Xi3SDZw8G_2GMORoHhVw9ClLR9iyR0H0", // actual verification code
  },
  
  // Additional metadata
  category: "Technology",
  classification: "Portfolio Website",
  
  // Canonical URL
  alternates: {
    canonical: "https://iamyasasbanuka.me",
  },
  
  // App metadata
  applicationName: "Yasas Banuka Portfolio",
  generator: "Next.js",
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  
  // Manifest
  manifest: "/manifest.json",
};

/**
 * Viewport configuration
 * 
 * Separated from metadata as per Next.js 14+ recommendations
 * for better performance and proper handling of viewport settings.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
