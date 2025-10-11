"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

type ContactLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
  color: string;
  gradient: string;
};

const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "ybanuka2003@gmail.com",
    url: "mailto:ybanuka2003@gmail.com",
    icon: "📧",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "linkedin",
    label: "linkedin.com/in/yasasbanuka",
    url: "https://linkedin.com/in/yasasbanuka",
    icon: "🔗",
    color: "blue",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    id: "github",
    label: "github.com/YasasBanuka",
    url: "https://github.com/YasasBanuka",
    icon: "💻",
    color: "gray",
    gradient: "from-gray-600 to-gray-800"
  },
  {
    id: "website",
    label: "iamyasasbanuka.me",
    url: "https://iamyasasbanuka.me",
    icon: "🌐",
    color: "purple",
    gradient: "from-purple-500 to-pink-500"
  }
];

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { ref, controls } as const;
}

function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real application, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const { ref, controls } = useRevealOnce<HTMLFormElement>();

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.form
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={formVariants}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      {/* Name Field */}
      <motion.div
        custom={0}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Name
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg"
          placeholder="Your full name"
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div
        custom={1}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Email
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:shadow-lg"
          placeholder="your.email@example.com"
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Message Field */}
      <motion.div
        custom={2}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none group-hover:shadow-lg"
          placeholder="Tell me about your project or just say hello!"
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        custom={3}
        variants={fieldVariants}
        className="pt-4"
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <span>✅</span>
                Message Sent!
              </>
            ) : submitStatus === 'error' ? (
              <>
                <span>❌</span>
                Try Again
              </>
            ) : (
              <>
                <span>🚀</span>
                Send Message
              </>
            )}
          </span>
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

function ContactLinks() {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex flex-wrap justify-center gap-6 mt-12"
    >
      {contactLinks.map((link, index) => (
        <motion.a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={linkVariants}
          className="group flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
          whileHover={{ 
            scale: 1.05,
            y: -2
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Icon with gradient background */}
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
            <span className="text-2xl">{link.icon}</span>
          </div>
          
          {/* Link text */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {link.label.split('.')[0]}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-500">
              {link.label.includes('.') ? link.label.split('.').slice(1).join('.') : link.label}
            </span>
          </div>

          {/* Hover arrow */}
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.div>
        </motion.a>
      ))}
    </motion.div>
  );
}

export default function Contact() {
  const { ref, controls } = useRevealOnce<HTMLElement>();

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative mx-auto max-w-7xl px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
      <motion.div 
        className="relative z-10 text-center"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        {/* Header */}
        <motion.div 
          className="mb-16"
          variants={childVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            Let's Connect
          </h2>
          <motion.p 
            className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium"
            variants={childVariants}
          >
            Let's build something impactful together 🚀
          </motion.p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={childVariants}
          className="mb-16"
        >
          <ContactForm />
        </motion.div>

        {/* Contact Links */}
        <motion.div
          variants={childVariants}
        >
          <ContactLinks />
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-20 flex justify-center"
          variants={childVariants}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Ready to collaborate</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
