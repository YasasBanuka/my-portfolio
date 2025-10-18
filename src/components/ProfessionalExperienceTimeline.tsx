"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

type ProfessionalEntry = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string[];
  type: "full-time" | "freelance" | "contract" | "internship";
  logo: string;
};

const professionalEntries: ProfessionalEntry[] = [
  {
    id: "prof-1",
    role: "Web Developer",
    organization: "Western Digital Computer Systems & Electronics (PVT) LTD",
    duration: "Jul 2023 – Apr 2024",
    description: [
      "Developed and maintained company websites using WordPress, HTML, CSS, PHP, and JavaScript.",
      "Improved site usability and engagement through UI optimization and SEO campaigns.",
      "Managed social media and boosted digital presence."
    ],
    type: "full-time",
    logo: "/logos/wdcse.png"
  },
  {
    id: "prof-2",
    role: "Freelance Web Developer",
    organization: "Freelancer.com",
    duration: "Sep 2021 – Jun 2023",
    description: [
      "Built responsive, client-centric websites for international clients in e-commerce, travel, and services industries.",
      "Handled front-end and CMS integrations with strong client feedback.",
      "Gained experience in working independently, managing projects end-to-end."
    ],
    type: "freelance",
    logo: "/logos/freelancer.png"
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

function ProfessionalItem({ entry, index }: { entry: ProfessionalEntry; index: number }) {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "full-time": return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "freelance": return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "contract": return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
      case "internship": return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300";
      default: return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "full-time": return "Full-time";
      case "freelance": return "Freelance";
      case "contract": return "Contract";
      case "internship": return "Internship";
      default: return "Unknown";
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
          {/* Company Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
            <Image
              src={entry.logo}
              alt={`${entry.organization} logo`}
              width={48}
              height={48}
              className="object-contain p-1"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-lg font-bold text-slate-600 dark:text-slate-300">${entry.organization.charAt(0)}</span>`;
                }
              }}
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {entry.role}
            </h3>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-3">
              {entry.organization}
            </p>
            <ul className="space-y-1">
              {entry.description.map((bullet, bulletIndex) => (
                <li key={bulletIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-2"></span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:items-end gap-2">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {entry.duration}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(entry.type)}`}>
            {getTypeText(entry.type)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

export default function ProfessionalExperienceTimeline() {
  const { ref, controls } = useRevealOnce<HTMLElement>();

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
      id="experience"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.03),transparent_50%)]"></div>
      
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
            Professional Journey
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Real-world experience in web development and digital solutions.
          </p>
        </motion.div>

        {/* Professional List */}
        <motion.div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ul className="space-y-6">
            {professionalEntries.map((entry, index) => (
              <ProfessionalItem 
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
            <span>Professional Growth</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}