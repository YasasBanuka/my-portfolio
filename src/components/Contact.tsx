"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
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
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS configuration - Replace these with your actual values
  const EMAILJS_SERVICE_ID = EMAILJS_CONFIG.SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = EMAILJS_CONFIG.TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = EMAILJS_CONFIG.PUBLIC_KEY;

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
    
    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
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
      className="w-full space-y-6"
    >
      {/* Name Field */}
      <motion.div
        custom={0}
        variants={fieldVariants}
        className="space-y-2"
      >
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Your name
        </label>
        <motion.input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Enter your full name"
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Email Field */}
      <motion.div
        custom={1}
        variants={fieldVariants}
        className="space-y-2"
      >
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email address
        </label>
        <motion.input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="your.email@example.com"
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Phone Field */}
      <motion.div
        custom={2}
        variants={fieldVariants}
        className="space-y-2"
      >
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Phone number
        </label>
        <motion.input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="+1 (555) 123-4567"
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Message Field */}
      <motion.div
        custom={3}
        variants={fieldVariants}
        className="space-y-2"
      >
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Message
        </label>
        <motion.textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Share your thoughts, ideas, or just say hello!"
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        custom={4}
        variants={fieldVariants}
        className="pt-4"
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Sending...
            </span>
          ) : submitStatus === 'success' ? (
            <span className="flex items-center justify-center gap-2">
              <span>✓</span>
              Message sent successfully! I&apos;ll get back to you soon.
            </span>
          ) : submitStatus === 'error' ? (
            <span className="flex items-center justify-center gap-2">
              <span>✕</span>
              Failed to send. Please try again.
            </span>
          ) : (
            "Send message"
          )}
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
      className="w-full"
    >
      {/* Desktop: Full links with text */}
      <div className="hidden lg:block space-y-4">
        {contactLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            className="group flex items-center gap-3 p-3 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            title={link.label}
          >
            {/* Simple icon */}
            <div className="flex h-8 w-8 items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              {renderIcon(link.icon)}
            </div>
            
            {/* Platform name */}
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Mobile: Only icons horizontally */}
      <div className="lg:hidden flex justify-center gap-6">
        {contactLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={linkVariants}
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            title={link.label}
          >
            <div className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
              {renderIcon(link.icon)}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { ref, controls } = useRevealOnce<HTMLElement>();
  const [isClient, setIsClient] = useState(false);

  // Ensure particles only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

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
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated contact elements */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 opacity-5 dark:opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 opacity-5 dark:opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Floating communication elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-24 h-24 opacity-5 dark:opacity-10"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-lg blur-2xl" />
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
      {/* Floating Particles - Client Side Only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(16)].map((_, i) => {
            // Use deterministic values based on index to prevent hydration mismatch
            const left = ((i * 6.25) % 100);
            const top = ((i * 10.5) % 100);
            const duration = 4 + ((i * 0.2) % 3);
            const delay = ((i * 0.3) % 2);
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-500/60 dark:bg-blue-400/70 rounded-full shadow-lg"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{
                  y: [0, -75, 0],
                  opacity: [0, 1, 0],
                  scale: [0.3, 1.2, 0.3],
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
          className="absolute top-1/5 right-1/5 w-48 h-48 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/5 left-1/5 w-36 h-36 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7,
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
            className="mb-16 text-center"
            variants={childVariants}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
              Let&apos;s Build Something Amazing
            </h2>
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-4"
              variants={childVariants}
            >
              Ready to collaborate on your next project? Let&apos;s turn your vision into reality.
            </motion.p>
            <motion.p 
              className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
              variants={childVariants}
            >
              Whether you&apos;re looking to discuss opportunities, share ideas, or just want to connect with a fellow tech enthusiast, I&apos;d love to hear from you!
            </motion.p>
          </motion.div>

          {/* Contact Form and Social Links Side by Side */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Contact Form - Left Side (3/4 width) */}
            <motion.div
              variants={childVariants}
              className="w-full lg:w-3/4"
            >
              <ContactForm />
            </motion.div>

            {/* Social Links - Right Side (1/4 width) */}
            <motion.div
              variants={childVariants}
              className="w-full lg:w-1/4"
            >
              <ContactLinks />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}