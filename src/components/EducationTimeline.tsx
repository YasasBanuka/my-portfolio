"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  icon: string;
};

const educationEntries: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Engineering (Hons) in Software Engineering",
    institution: "IIC University of Technology",
    duration: "Aug 2021 – 2025",
    description: "Focusing on enterprise software systems, Spring Boot, and modern web development. Strengthened backend, API design, and system integration skills.",
    icon: "🎓"
  },
  {
    id: "edu-2", 
    degree: "Bachelor of Technology in Network Engineering",
    institution: "University of Vocational Technology (UoVT)",
    duration: "May 2024 – Present",
    description: "Building strong foundation in networking, cybersecurity, and cloud infrastructure — complementing software engineering expertise.",
    icon: "🌐"
  },
  {
    id: "edu-3",
    degree: "G.C.E. Advanced Level (Technology Stream)",
    institution: "Mahinda Rajapaksha College, Homagama",
    duration: "Jan 2014 – Jan 2022", 
    description: "Studied technology stream with focus on ICT and engineering fundamentals. Member of Robotics & Innovators Club.",
    icon: "🔬"
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

function EducationDot({ icon }: { icon: string }) {
  return (
    <div className="relative z-10 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl ring-4 ring-white dark:ring-slate-900 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950">
      <span className="text-lg lg:text-xl" aria-hidden>
        {icon}
      </span>
    </div>
  );
}

function EducationCard({
  entry,
  align,
}: {
  entry: EducationEntry;
  align: "left" | "right";
}) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const isLeft = align === "left";
  const variants = {
    hidden: { opacity: 0, y: 32, x: isLeft ? -32 : 32 },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1 
      } 
    },
  } as const;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="relative w-full rounded-2xl border-l-4 border-blue-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-900/90 dark:border-blue-400 hover:scale-[1.02] hover:border-blue-600 dark:hover:border-blue-300"
    >
      <div className="p-6 lg:p-8">
        {/* Degree badge */}
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          <span>Education</span>
          <span>•</span>
          <span>{entry.duration}</span>
        </div>

        {/* Degree title - Enhanced font sizes for desktop */}
        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3 leading-tight">
          {entry.degree}
        </h3>

        {/* Institution - Enhanced font sizes for desktop */}
        <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium mb-4">
          {entry.institution}
        </p>

        {/* Description */}
        <p className="text-sm lg:text-base leading-6 lg:leading-7 text-slate-600 dark:text-slate-300">
          {entry.description}
        </p>
      </div>

      {/* Enhanced decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-b-2xl opacity-70"></div>
    </motion.div>
  );
}

export default function EducationTimeline() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.03),transparent_50%)]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Academic Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            My evolution as an engineer through structured learning, practical application, 
            and continuous growth in software and network engineering.
          </p>
        </motion.div>

        {/* Timeline - Expanded width for desktop */}
        <div className="relative mx-auto max-w-[90%] lg:max-w-[85%]">
          {/* Enhanced Vertical line with gradient */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="h-full w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400 dark:from-blue-500 dark:via-purple-600 dark:to-blue-500 rounded-full shadow-lg"></div>
          </div>

          <ul className="space-y-16 md:space-y-20">
            {educationEntries.map((entry, index) => {
              const align: "left" | "right" = index % 2 === 0 ? "left" : "right";
              return (
                <li key={entry.id} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Connector and dot on md+ */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block z-20">
                    <EducationDot icon={entry.icon} />
                  </div>

                  {/* On mobile, dot above card */}
                  <div className="mb-4 flex items-center gap-4 md:hidden">
                    <EducationDot icon={entry.icon} />
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-purple-400 dark:from-blue-600 dark:to-purple-500"></div>
                  </div>

                  {/* Card container with improved spacing */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${align === "left" ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}>
                    <EducationCard entry={entry} align={align} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Continuous Learning & Growth</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
