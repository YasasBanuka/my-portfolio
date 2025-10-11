import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";
import BlogPostClient from "./BlogPostClient";

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

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
