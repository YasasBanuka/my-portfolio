"use client";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  image: string;
  testimonial: string;
  rating: number;
  project?: string;
  date?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Dr. Sarah Johnson",
    role: "Project Manager",
    company: "TechCorp Solutions",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    testimonial: "Yasas delivered an exceptional React Native application that exceeded our expectations. His attention to detail, clean code practices, and ability to meet tight deadlines made him an invaluable team member. The app has received outstanding user feedback.",
    rating: 5,
    project: "Mobile E-commerce App",
    date: "December 2023"
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    role: "Senior Developer",
    company: "InnovateLab",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoft/microsoft-original.svg",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    testimonial: "Working with Yasas on our Spring Boot backend was a pleasure. His expertise in Java, Spring Security, and database optimization helped us build a robust, scalable system. He's a true professional who goes above and beyond.",
    rating: 5,
    project: "Enterprise Management System",
    date: "November 2023"
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    company: "CreativeStudio",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/adobe/adobe-original.svg",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    testimonial: "Yasas transformed our design mockups into a beautiful, responsive web application using React and Tailwind CSS. His frontend skills are outstanding, and he always ensures pixel-perfect implementation. Highly recommended!",
    rating: 5,
    project: "Portfolio Website",
    date: "October 2023"
  },
  {
    id: "testimonial-4",
    name: "David Thompson",
    role: "CTO",
    company: "StartupXYZ",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    testimonial: "Yasas helped us build our MVP from scratch using modern technologies. His full-stack expertise, problem-solving skills, and dedication to quality made him an essential part of our development team. The project was delivered on time and within budget.",
    rating: 5,
    project: "SaaS Platform",
    date: "September 2023"
  },
  {
    id: "testimonial-5",
    name: "Lisa Wang",
    role: "Product Owner",
    company: "DataFlow Inc",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    testimonial: "Yasas integrated Firebase authentication and real-time database into our mobile app seamlessly. His understanding of cloud technologies and mobile development best practices is impressive. The app is now live with thousands of active users.",
    rating: 5,
    project: "Social Media App",
    date: "August 2023"
  },
  {
    id: "testimonial-6",
    name: "James Wilson",
    role: "Lead Developer",
    company: "CodeCraft",
    companyLogo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    testimonial: "Yasas contributed significantly to our open-source project. His code quality, documentation skills, and collaborative approach made him a valuable team member. He's always willing to help and share knowledge with the team.",
    rating: 5,
    project: "Open Source Library",
    date: "July 2023"
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

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className="group relative"
    >
      <motion.div
        className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
        whileHover={{ 
          scale: 1.02,
          y: -4
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Quote icon */}
        <div className="absolute top-4 right-4 text-4xl text-blue-500/20 dark:text-blue-400/20">
          &ldquo;
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>

        {/* Testimonial text */}
        <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-sm lg:text-base">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>

        {/* Project info */}
        {testimonial.project && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              {testimonial.project}
            </span>
          </div>
        )}

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-700">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name} profile`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-semibold text-lg">${testimonial.name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              {testimonial.name}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              {testimonial.role}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {testimonial.companyLogo && (
                <div className="w-4 h-4 rounded overflow-hidden">
                  <Image
                    src={testimonial.companyLogo}
                    alt={`${testimonial.company} logo`}
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <span className="text-slate-500 dark:text-slate-500 text-xs font-medium">
                {testimonial.company}
              </span>
            </div>
            {testimonial.date && (
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">
                {testimonial.date}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TestimonialNavigation({ 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext, 
  itemsPerView 
}: {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  itemsPerView: number;
}) {
  const maxIndex = Math.max(0, totalItems - itemsPerView);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <motion.button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          canGoPrevious 
            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
        }`}
        whileHover={canGoPrevious ? { scale: 1.1 } : {}}
        whileTap={canGoPrevious ? { scale: 0.9 } : {}}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Dots indicator */}
      <div className="flex gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => {/* Handle dot click */}}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-600 w-8' 
                : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
            }`}
          />
        ))}
      </div>

      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          canGoNext 
            ? 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700' 
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
        }`}
        whileHover={canGoNext ? { scale: 1.1 } : {}}
        whileTap={canGoNext ? { scale: 0.9 } : {}}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const { ref, controls } = useRevealOnce<HTMLElement>();

  // Responsive items per view
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
    setCurrentIndex(prev => Math.min(testimonials.length - itemsPerView, prev + 1));
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
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.03),transparent_50%)]"></div>
      
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
            What People Say
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Testimonials from clients, colleagues, and collaborators who have worked with me on various projects.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <TestimonialCard 
                  testimonial={testimonial} 
                  index={index} 
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <TestimonialNavigation
          currentIndex={currentIndex}
          totalItems={testimonials.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          itemsPerView={itemsPerView}
        />

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          variants={childVariants}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Trusted by Professionals</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
