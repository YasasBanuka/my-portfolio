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
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0
    }
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group relative"
    >
      <Link href={`/blog/${post.id}`}>
        <motion.div
          className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden h-full"
          whileHover={{ 
            scale: 1.05,
            y: -8,
            rotateY: 2,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
        >
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0"
            whileHover={{ 
              opacity: 1,
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Category badge with animation */}
          <motion.div 
            className="absolute top-4 right-4 z-10"
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-800 dark:text-blue-300 shadow-sm">
              {post.category}
            </span>
          </motion.div>

          {/* Blog image with enhanced effects */}
          {post.image && (
            <motion.div 
              className="relative h-48 w-full rounded-xl overflow-hidden mb-6"
            >
              <motion.img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-4xl mb-2">📝</div>
                          <div class="text-sm text-slate-500 dark:text-slate-400 px-2">
                            Blog Post Image
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )}

          {/* Content with staggered animations */}
          <div className="relative z-10">
            {/* Meta info with animation */}
            <motion.div 
              className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <span>{post.date}</span>
              <span className="text-slate-300">•</span>
              <span>{post.readTime}</span>
            </motion.div>

            {/* Title with enhanced styling */}
            <motion.h3 
              className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {post.title}
            </motion.h3>

            {/* Excerpt with fade-in */}
            <motion.p 
              className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {post.excerpt}
            </motion.p>

            {/* Tags with individual animations */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-600 dark:text-slate-300 shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 + tagIndex * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Interactive read indicator */}
          <motion.div 
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
              <span>Read</span>
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l6 6m0 0l-6 6m6-6H4" />
              </motion.svg>
            </div>
          </motion.div>
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

export default function BlogPageClient() {
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
