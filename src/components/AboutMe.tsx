'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
/**
 * AboutMe Component - Main Component Function
 * 
 * Manages intersection observer for scroll-triggered animations and renders
 * the complete about section with professional photo, biography content,
 * and interactive elements.
 * 
 * @returns JSX element containing the complete about section
 */
const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };



  return (
    <section id="about" className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated volunteer photo overlays */}
        <motion.div 
          className="absolute top-10 right-10 w-64 h-64 opacity-5 dark:opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-10 w-48 h-48 opacity-5 dark:opacity-10"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Floating volunteer elements */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-32 h-32 opacity-5 dark:opacity-10"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-lg blur-2xl" />
        </motion.div>
        
        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="currentColor" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Professional Photo */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="relative group">
              {/* Professional Photo */}
              <div className="w-full max-w-md mx-auto lg:mx-0 aspect-square rounded-2xl shadow-2xl overflow-hidden">
                <Image 
                  src="/images/about/yasas-banuka-professional-headshot-portrait.jpg" 
                  alt="Yasas Banuka - Software Engineer and Student Leader Professional Headshot" 
                  width={400} 
                  height={400}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              
              {/* Floating icons around the photo */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <span className="text-xl">💻</span>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <span className="text-xl">🌐</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Biography Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Headline */}
            <motion.h2
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2"
              variants={itemVariants}
            >
              Beyond the Code
            </motion.h2>

            {/* Main paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              I&apos;m a software & network engineering student who believes technology 
              should solve real problems while inspiring others to think bigger. 
              My journey spans full-stack development, cloud computing, and 
              community leadership.
            </motion.p>

            {/* Tech interests paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              What drives me is mentoring fellow students and organizing events that 
              spark innovation. I combine strong technical skills with a collaborative 
              mindset, always focused on creating meaningful impact.
            </motion.p>

            {/* Leadership and volunteer paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              As a student influencer, I&apos;m passionate about creating inclusive spaces 
              where everyone can discover their potential in tech and contribute 
              to something greater than themselves.
            </motion.p>

            {/* Personality descriptors */}
            <motion.div
              className="flex items-center pt-4"
              variants={itemVariants}
            >
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300 mr-4">
                My essence:
              </span>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
                  Community Builder
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                  Student Leader
                </span>
              </div>
            </motion.div>

            {/* Call to action */}
            <motion.div
              className="pt-6"
              variants={itemVariants}
            >
              <motion.button
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://linkedin.com/in/yasasbanuka', '_blank')}
              >
                Let&apos;s Connect
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default AboutMe;

