'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Suspense, useRef } from 'react';
import FloatingCube from './FloatingCube';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950"
    >
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0">
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
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-slate-900/20 to-purple-900/20" />}>
          <FloatingCube />
        </Suspense>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-10" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-5 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity }}
      >
        {/* Name */}
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl"
          variants={itemVariants}
          style={{
            textShadow: '0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
          }}
        >
          Yasas Banuka
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
          style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
          }}
        >
          Leading Where Vision Meets Action
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          A passionate software & network engineering student who doesn&apos;t just code – I build communities, 
          solve real problems, and inspire fellow students to make a difference through technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 border border-blue-500/30 hover:border-blue-400/50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToContact}
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Let&apos;s Work Together
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </motion.button>

          <motion.button
            className="group relative px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </span>
            <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

