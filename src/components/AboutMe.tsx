'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1
    },
    animate: {
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  const AnimatedIcon = ({ emoji, delay }: { emoji: string; delay: number }) => (
    <motion.span
      className="inline-block text-2xl mx-2"
      variants={iconVariants}
      initial="hidden"
      animate={isVisible ? ["visible", "animate"] : "hidden"}
      transition={{ delay }}
    >
      {emoji}
    </motion.span>
  );

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto">
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
              {/* Placeholder for professional photo */}
              <div className="w-full max-w-md mx-auto lg:mx-0 aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                  Y
                </div>
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
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
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Who I Am
            </motion.h2>

            {/* Main paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              I&apos;m a passionate dual-degree undergraduate in Software and Network Engineering, 
              driven by an insatiable curiosity for technology and innovation. My journey spans 
              across full-stack development, cloud computing, and artificial intelligence, 
              where I constantly explore the intersection of these transformative fields.
            </motion.p>

            {/* Tech interests paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              What excites me most is the endless possibilities at the crossroads of software 
              engineering and network systems. Whether I&apos;m architecting scalable cloud solutions, 
              developing intelligent applications, or optimizing network infrastructures, I bring 
              a holistic approach that bridges theory and practical implementation.
            </motion.p>

            {/* Leadership and volunteer paragraph */}
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              Beyond technical expertise, I&apos;m deeply committed to community leadership and 
              social impact. As an active IEEE volunteer, I organize tech events and mentor 
              fellow students. My involvement in anti-ragging activism reflects my belief in 
              creating inclusive environments. I also co-founded TechSpark 1.0, a platform 
              that connects aspiring developers with industry professionals.
            </motion.p>

            {/* Personality icons */}
            <motion.div
              className="flex items-center pt-4"
              variants={itemVariants}
            >
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300 mr-4">
                My essence:
              </span>
              <AnimatedIcon emoji="⚡" delay={0.2} />
              <AnimatedIcon emoji="💡" delay={0.4} />
              <AnimatedIcon emoji="🚀" delay={0.6} />
            </motion.div>

            {/* Call to action */}
            <motion.div
              className="pt-6"
              variants={itemVariants}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  Let&apos;s Connect
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
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

