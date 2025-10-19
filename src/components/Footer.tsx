"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import FloatingCube from './FloatingCube';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      transition: { duration: 0.6 },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 overflow-hidden">
      {/* 3D Background with Floating Cubes */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-slate-900/20 to-purple-900/20" />}>
          <FloatingCube />
        </Suspense>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-10" />

      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        
        {/* Floating footer elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"
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
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-5 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <motion.div
        className="relative z-20 max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* Personal Tagline */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
        >
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl scale-110"></div>
            
            {/* Main tagline container */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 leading-tight">
                Leading Where Vision Meets Action
              </h3>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                <p className="text-lg sm:text-xl text-gray-300 font-medium italic">
                  Yasas Banuka
                </p>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={scrollToTop}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-white/10"
          variants={itemVariants}
        >
          <p className="text-gray-400 text-m">
            © {new Date().getFullYear()} Yasas Banuka. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with Next.js, React, and lots of ☕
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
        {[...Array(15)].map((_, i) => {
          // Use deterministic values based on index to prevent hydration mismatch
          const left = ((i * 5.7) % 100);
          const top = ((i * 9.2) % 100);
          const duration = 3 + ((i * 0.4) % 2);
          const delay = ((i * 0.6) % 2);
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
