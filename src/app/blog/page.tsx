"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostsByCategory, BlogPost } from "@/data/blog";

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
          className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full"
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

function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: { 
  categories: string[]; 
  activeCategory: string; 
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === 'All'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
        }`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { ref, controls } = useRevealOnce<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  const allPosts = getAllBlogPosts();
  const categories = ['All', ...Array.from(new Set(allPosts.map(post => post.category)))];

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPosts(allPosts);
    } else {
      setFilteredPosts(getBlogPostsByCategory(activeCategory));
    }
  }, [activeCategory, allPosts]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
              Blog & Articles
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Insights, tutorials, and thoughts on software development, 
              technology trends, and industry best practices.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CategoryFilter
              categories={categories.slice(1)}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section 
        ref={ref}
        className="relative mx-auto max-w-7xl px-4 pb-20"
      >
        <motion.div 
          className="relative z-10"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
        >
          {/* Blog Posts Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={childVariants}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                index={index} 
              />
            ))}
          </motion.div>

          {/* No posts message */}
          {filteredPosts.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={childVariants}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                No posts found
              </h3>
              <p className="text-slate-500 dark:text-slate-500">
                Try selecting a different category or check back later for new content.
              </p>
            </motion.div>
          )}

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
    </div>
  );
}
