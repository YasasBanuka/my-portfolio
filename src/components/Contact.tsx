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
    label: "LinkedIn",
    url: "https://linkedin.com/in/yasasbanuka",
    icon: "linkedin",
    color: "blue",
    gradient: "from-blue-600 to-blue-700"
  },
  {
    id: "github",
    label: "GitHub",
    url: "https://github.com/YasasBanuka",
    icon: "github",
    color: "gray",
    gradient: "from-gray-600 to-gray-800"
  },
  {
    id: "medium",
    label: "Medium",
    url: "https://medium.com/@yasasbanuka",
    icon: "medium",
    color: "green",
    gradient: "from-green-500 to-emerald-500"
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
      transition: { duration: 0.6 }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
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
      className="w-full lg:w-3/4 space-y-8"
    >
      {/* Name Field */}
      <motion.div
        custom={0}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Name
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-400 dark:group-hover:border-slate-500"
          placeholder="Your full name"
          whileFocus={{ scale: 1.01 }}
          whileHover={{ scale: 1.005 }}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div
        custom={1}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Email
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 group-hover:border-slate-400 dark:group-hover:border-slate-500"
          placeholder="your.email@example.com"
          whileFocus={{ scale: 1.01 }}
          whileHover={{ scale: 1.005 }}
        />
      </motion.div>

      {/* Message Field */}
      <motion.div
        custom={2}
        variants={fieldVariants}
        className="relative group"
      >
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-6 py-4 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 resize-none group-hover:border-slate-400 dark:group-hover:border-slate-500"
          placeholder="Tell me about your project or just say hello!"
          whileFocus={{ scale: 1.01 }}
          whileHover={{ scale: 1.005 }}
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
            scale: 1.02,
            y: -1
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
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  const renderIcon = (icon: string) => {
    switch (icon) {
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
          </svg>
        );
      default:
        return <span className="text-xl">{icon}</span>;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full lg:w-1/4 flex flex-col items-center lg:items-start"
    >
      {/* Header */}
      <motion.div 
        className="text-center lg:text-left mb-8"
        variants={linkVariants}
      >
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Connect
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Let&apos;s stay connected
        </p>
      </motion.div>

      {/* Social Media Icons - Clean Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 w-full lg:w-auto">
        {contactLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            className="group flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              x: 5
            }}
            whileTap={{ scale: 0.98 }}
            title={link.label}
          >
            {/* Icon with gradient background */}
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${link.gradient} group-hover:shadow-lg transition-all duration-300 text-white`}>
              {renderIcon(link.icon)}
            </div>
            
            {/* Platform name - hidden on mobile, visible on desktop */}
            <span className="hidden lg:block text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>
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
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
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
            Let&apos;s Connect
          </h2>
          <motion.p 
            className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium"
            variants={childVariants}
          >
            Let&apos;s build something impactful together 🚀
          </motion.p>
        </motion.div>

        {/* Contact Form and Social Links Side by Side */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Contact Form - Left Side (More Space) */}
          <motion.div
            variants={childVariants}
            className="w-full lg:w-3/4"
          >
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Send me a message
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                Let&apos;s discuss your project or just say hello. I&apos;d love to hear from you!
              </p>
            </div>
            <ContactForm />
          </motion.div>

          {/* Social Links - Right Side (Less Space) */}
          <motion.div
            variants={childVariants}
            className="w-full lg:w-1/4"
          >
            <ContactLinks />
          </motion.div>
        </div>

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
