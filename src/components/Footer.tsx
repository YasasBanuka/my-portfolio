"use client";

import { motion } from "framer-motion";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer className="relative min-h-screen flex items-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Floating footer elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"
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

      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Personal Tagline */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
        >
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Driven by passion, powered by purpose.
          </h3>
          <p className="text-lg text-slate-400 font-medium">
            — Yasas Banuka
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center space-x-6 mb-8"
          variants={itemVariants}
        >
          {[
            { name: "LinkedIn", url: "https://linkedin.com/in/yasasbanuka", icon: "💼" },
            { name: "GitHub", url: "https://github.com/YasasBanuka", icon: "💻" },
            { name: "Medium", url: "https://medium.com/@yasasbanuka", icon: "📝" },
            { name: "Email", url: "mailto:ybanuka2003@gmail.com", icon: "📧" },
          ].map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              title={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-slate-700/50"
          variants={itemVariants}
        >
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Yasas Banuka. Built with passion and purpose.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
