import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog - Yasas Banuka",
  description: "Read insights, tutorials, and thoughts on software engineering, technology, and career development from Yasas Banuka.",
  keywords: ["Blog", "Software Engineering", "Technology", "Career", "Tutorials", "Yasas Banuka"],
  openGraph: {
    title: "Blog - Yasas Banuka",
    description: "Read insights, tutorials, and thoughts on software engineering, technology, and career development.",
    type: "website",
    url: "https://iamyasasbanuka.me/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Yasas Banuka",
    description: "Read insights, tutorials, and thoughts on software engineering, technology, and career development.",
  },
  alternates: {
    canonical: "https://iamyasasbanuka.me/blog",
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}

