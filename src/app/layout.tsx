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
  title: "Yasas - Full Stack & Cloud Enthusiast",
  description: "Software & Network Engineering Undergraduate | Student Influencer | IEEE Volunteer | Building Scalable Products with Passion and Purpose",
  keywords: "Yasas, Full Stack Developer, Cloud Engineer, Software Engineer, Network Engineering, IEEE, Student Influencer, Portfolio",
  authors: [{ name: "Yasas" }],
  openGraph: {
    title: "Yasas - Full Stack & Cloud Enthusiast",
    description: "Software & Network Engineering Undergraduate | Student Influencer | IEEE Volunteer | Building Scalable Products with Passion and Purpose",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
