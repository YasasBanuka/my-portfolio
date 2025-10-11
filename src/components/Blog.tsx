"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { getAllBlogPosts, BlogPost } from "@/data/blog";

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { ref, controls } as const;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="group relative"
    >
      <Link href={`/blog/${post.id}`}>
        <motion.div
          className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          whileHover={{ 
            scale: 1.02,
            y: -4
          }}
        >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
            {post.category}
          </span>
        </div>

        {/* Blog image */}
        {post.image && (
          <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 px-2">
                  Blog Post Image
                </div>
              </div>
            </div>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Meta info */}
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Read more indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium">
            <span>Read More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l6 6m0 0l-6 6m6-6H4" />
            </svg>
          </div>
        </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const { ref, controls } = useRevealOnce<HTMLElement>();
  const blogPosts = getAllBlogPosts().slice(0, 6); // Show only first 6 posts on homepage

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section 
      id="blog"
      ref={ref}
      className="relative mx-auto max-w-7xl px-4 py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_50%)]"></div>
      
      <motion.div 
        className="relative z-10"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        {/* Header */}
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          variants={childVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            Blog & Articles
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Sharing insights, tutorials, and thoughts on software development, 
            technology trends, and industry best practices.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={childVariants}
        >
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              post={post} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div 
          className="mt-12 flex justify-center"
          variants={childVariants}
        >
          <Link href="/blog">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Articles
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          variants={childVariants}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Sharing Knowledge & Insights</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
