"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  status: "completed" | "ongoing";
  logo: string;
};

const educationEntries: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Engineering (Hons) in Software Engineering",
    institution: "IIC University of Technology",
    duration: "Aug 2021 – 2025",
    description: "Focusing on enterprise software systems, Spring Boot, and modern web development. Strengthened backend, API design, and system integration skills.",
    status: "ongoing",
    logo: "/logos/iic-logo.png"
  },
  {
    id: "edu-2", 
    degree: "Bachelor of Technology in Network Engineering",
    institution: "University of Vocational Technology (UoVT)",
    duration: "May 2024 – Present",
    description: "Building strong foundation in networking, cybersecurity, and cloud infrastructure — complementing software engineering expertise.",
    status: "ongoing",
    logo: "/logos/uovt-logo.png"
  },
  {
    id: "edu-3",
    degree: "G.C.E. Advanced Level (Technology Stream)",
    institution: "Mahinda Rajapaksha College, Homagama",
    duration: "Jan 2014 – Jan 2022", 
    description: "Studied technology stream with focus on ICT and engineering fundamentals. Member of Robotics & Innovators Club.",
    status: "completed",
    logo: "/logos/mrc-logo.png"
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

function EducationItem({ entry, index }: { entry: EducationEntry; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLLIElement>();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: index * 0.1 
      } 
    }
  };

  return (
    <motion.li
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0 last:pb-0"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Institution Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
            <Image
              src={entry.logo}
              alt={`${entry.institution} logo`}
              width={48}
              height={48}
              className="object-contain p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-lg font-bold text-slate-600 dark:text-slate-300">${entry.institution.charAt(0)}</span>`;
                }
              }}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {entry.degree}
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-2">
              {entry.institution}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {entry.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {entry.duration}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            entry.status === "completed" 
              ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300" 
              : "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
          }`}>
            {entry.status === "completed" ? "Completed" : "Ongoing"}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export default function EducationTimeline() {
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
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section 
      id="education"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      
      {/* Floating Particles - Client Side Only */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => {
            // Use deterministic values based on index to prevent hydration mismatch
            const left = ((i * 12.5) % 100);
            const top = ((i * 18.7) % 100);
            const duration = 7 + ((i * 0.5) % 2);
            const delay = ((i * 0.7) % 2);
            
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
                  y: [0, -70, 0],
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
          className="absolute top-1/6 left-1/6 w-28 h-28 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/6 right-1/6 w-32 h-32 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div 
          className="relative z-10"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        {/* Header */}
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Academic Foundation
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            My academic foundation in software and network engineering.
          </p>
        </motion.div>

        {/* Education List */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ul className="space-y-6">
            {educationEntries.map((entry, index) => (
              <EducationItem 
                key={entry.id} 
                entry={entry} 
                index={index} 
              />
            ))}
          </ul>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Continuous Learning</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}