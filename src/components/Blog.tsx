"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

export default function Blog() {
  const { ref, controls } = useRevealOnce<HTMLElement>();
  const blogPosts = getAllBlogPosts().slice(0, 6); // Show only first 6 posts on homepage
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isClient, setIsClient] = useState(false);

  // Ensure particles only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(blogPosts.length - itemsPerView, prev + 1));
  };

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
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_50%)]"></div>
      
      {/* Floating Particles - Client Side Only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(13)].map((_, i) => {
            // Use deterministic values based on index to prevent hydration mismatch
            const left = ((i * 7.7) % 100);
            const top = ((i * 12.3) % 100);
            const duration = 5 + ((i * 0.3) % 3);
            const delay = ((i * 0.4) % 2);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-500/60 dark:bg-purple-400/70 rounded-full shadow-lg"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  y: [0, -85, 0],
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.2, 0.4],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-pink-500/10 dark:bg-pink-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
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
            Insights, tutorials, and thoughts on software development and technology trends.
          </p>
        </motion.div>

        {/* Blog Posts Carousel */}
        <motion.div 
          className="relative overflow-hidden"
          variants={childVariants}
        >
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className="w-full flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <BlogCard 
                  post={post} 
                  index={index} 
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Carousel Navigation */}
        <motion.div 
          className="flex items-center justify-center gap-4 mt-8"
          variants={childVariants}
        >
          <motion.button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex === 0 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          {/* Dots indicator */}
          <div className="flex gap-2">
            {Array.from({ length: Math.max(1, blogPosts.length - itemsPerView + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={currentIndex >= blogPosts.length - itemsPerView}
            className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
              currentIndex >= blogPosts.length - itemsPerView 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            whileHover={currentIndex < blogPosts.length - itemsPerView ? { scale: 1.1 } : {}}
            whileTap={currentIndex < blogPosts.length - itemsPerView ? { scale: 0.9 } : {}}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
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
      </div>
    </section>
  );
}
