"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type ProfessionalEntry = {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  description: string[];
  icon: string;
};

const professionalEntries: ProfessionalEntry[] = [
  {
    id: "prof-1",
    role: "Web Developer",
    organization: "Western Digital Computer Systems & Electronics (PVT) LTD",
    location: "Hybrid",
    duration: "Jul 2023 – Apr 2024",
    description: [
      "Developed and maintained company websites using WordPress, HTML, CSS, PHP, and JavaScript.",
      "Improved site usability and engagement through UI optimization and SEO campaigns.",
      "Managed social media and boosted digital presence."
    ],
    icon: "💼"
  },
  {
    id: "prof-2",
    role: "Freelance Web Developer",
    organization: "Freelancer.com",
    location: "Remote",
    duration: "Sep 2021 – Jun 2023",
    description: [
      "Built responsive, client-centric websites for international clients in e-commerce, travel, and services industries.",
      "Handled front-end and CMS integrations with strong client feedback.",
      "Gained experience in working independently, managing projects end-to-end."
    ],
    icon: "🚀"
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

function ProfessionalDot({ icon }: { icon: string }) {
  return (
    <div className="relative z-10 flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 shadow-xl ring-4 ring-white dark:ring-slate-900 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950 hover:scale-110 transition-transform duration-300 cursor-pointer">
      <span className="text-lg lg:text-xl" aria-hidden>
        {icon}
      </span>
    </div>
  );
}

function ProfessionalCard({
  entry,
  align,
}: {
  entry: ProfessionalEntry;
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
      className="relative w-full rounded-2xl border-l-4 border-emerald-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-slate-900/90 dark:border-emerald-400 hover:scale-[1.02] hover:border-emerald-600 dark:hover:border-emerald-300"
    >
      <div className="p-6 lg:p-8">
        {/* Experience badge */}
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
          <span>Experience</span>
          <span>•</span>
          <span>{entry.duration}</span>
        </div>

        {/* Role title - Enhanced font sizes for desktop */}
        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3 leading-tight">
          {entry.role}
        </h3>

        {/* Organization and location */}
        <div className="mb-4">
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium mb-1">
            {entry.organization}
          </p>
          <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400 font-medium">
            {entry.location}
          </p>
        </div>

        {/* Description bullets */}
        <ul className="space-y-2">
          {entry.description.map((bullet, index) => (
            <li key={index} className="flex items-start gap-2 text-sm lg:text-base leading-6 lg:leading-7 text-slate-600 dark:text-slate-300">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-2"></span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Enhanced decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 rounded-b-2xl opacity-70"></div>
    </motion.div>
  );
}

export default function ProfessionalExperienceTimeline() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.03),transparent_50%)]"></div>
      
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
            Professional Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Building digital solutions and delivering value through web development, 
            from corporate environments to freelance projects across diverse industries.
          </p>
        </motion.div>

        {/* Timeline - Expanded width for desktop */}
        <div className="relative mx-auto max-w-[90%] lg:max-w-[85%]">
          {/* Enhanced Vertical line with gradient */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full -translate-x-1/2 md:block">
            <div className="h-full w-1 bg-gradient-to-b from-emerald-400 via-blue-500 to-emerald-400 dark:from-emerald-500 dark:via-blue-600 dark:to-emerald-500 rounded-full shadow-lg"></div>
          </div>

          <ul className="space-y-16 md:space-y-20">
            {professionalEntries.map((entry, index) => {
              const align: "left" | "right" = index % 2 === 0 ? "left" : "right";
              return (
                <li key={entry.id} className="relative flex flex-col md:flex-row md:items-center">
                  {/* Connector and dot on md+ */}
                  <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block z-20">
                    <ProfessionalDot icon={entry.icon} />
                  </div>

                  {/* On mobile, dot above card */}
                  <div className="mb-4 flex items-center gap-4 md:hidden">
                    <ProfessionalDot icon={entry.icon} />
                    <div className="h-px flex-1 bg-gradient-to-r from-emerald-300 to-blue-400 dark:from-emerald-600 dark:to-blue-500"></div>
                  </div>

                  {/* Card container with improved spacing */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${align === "left" ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}>
                    <ProfessionalCard entry={entry} align={align} />
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
            <span>Building Digital Excellence</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

