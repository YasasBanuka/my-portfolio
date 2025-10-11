"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blog";

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </motion.div>

          {/* Post header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-12"
          >
            {/* Category badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 mb-6">
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span>{post.author.name}</span>
              </div>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Featured image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-64 lg:h-80 w-full rounded-2xl overflow-hidden mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <div className="text-lg text-slate-500 dark:text-slate-400">
                    Featured Image
                  </div>
                </div>
              </div>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="relative px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div 
              className="text-slate-700 dark:text-slate-300 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">$1</code>').replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 mt-8">$1</h1>').replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-6">$1</h2>').replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 mt-4">$1</h3>').replace(/^\*\*([^*]+)\*\*: (.*$)/gm, '<p class="mb-4"><strong class="text-slate-900 dark:text-slate-100">$1:</strong> $2</p>').replace(/^\* (.*$)/gm, '<li class="mb-2">$1</li>').replace(/^(\d+)\. (.*$)/gm, '<li class="mb-2">$1. $2</li>')
              }}
            />
          </motion.div>

          {/* Author bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  About {post.author.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex justify-center"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Posts
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
