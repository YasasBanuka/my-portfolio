import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.id);
  
  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name, url: "https://iamyasasbanuka.me" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.image ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
    alternates: {
      canonical: `https://iamyasasbanuka.me/blog/${post.id}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
