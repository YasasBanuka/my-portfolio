"use client";

import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type LeadershipRole = {
  id: string;
  title: string;
  organization: string;
  period: string;
  summary: string;
  logo: string;
  gradient: string;
  journey: JourneyStep[];
  achievements: string[];
  photos: string[];
};

type JourneyStep = {
  year: string;
  month?: string;
  position: string;
  description: string;
  highlight?: boolean;
};

type Photo = {
  id: string;
  src: string;
  alt: string;
  rotation: number;
  zIndex: number;
  position: { x: number; y: number };
  size: "sm" | "md" | "lg";
};

const leadershipRoles: LeadershipRole[] = [
  {
    id: "lead-1",
    title: "Student Volunteer",
    organization: "IEEE Student Branch of University of Vocational Technology",
    period: "Jan 2025 - Present",
    summary: "Actively contributing to IEEE through impactful initiatives, leadership roles, and event organizing that empower the tech community at UoVT.",
    logo: "/logos/ieee-logo.png",
    gradient: "from-blue-500 to-purple-600",
    journey: [
      {
        year: "2025",
        month: "January",
        position: "Student Member",
        description: "Joined IEEE Student Branch of UoVT and actively engaged in volunteer initiatives."
      },
      {
        year: "2025",
        month: "July",
        position: "Chair – TechSpark 1.0",
        description: "Conceptualized, initiated, and led TechSpark 1.0 — a collaborative workshop with the Microsoft Student Ambassadors focused on Cloud Computing and APIs. Led an organizing committee to deliver a professional and well-received event with 100+ participants."
      },
      {
        year: "2025",
        month: "August",
        position: "Lead Organizer – Xtreme Ignite 1.0 Awareness Session",
        description: "Brought together a motivated team to execute the IEEE Xtreme pre-event for 50+ participants."
      },
      {
        year: "2025",
        month: "August",
        position: "Publicity Lead – JamboreeIEEE (Inter-University Event)",
        description: "Led a publicity team spanning 6 universities across Sri Lanka to promote JamboreeIEEE, a multi-institutional collaboration fostering tech awareness and networking."
      },
      {
        year: "2025",
        month: "August",
        position: "Volunteer of the Month – IEEE SB UoVT",
        description: "Recognized as Volunteer of the Month for outstanding leadership, initiative, and consistent contribution to IEEE activities."
      },
      {
        year: "2025",
        month: "October",
        position: "Lead Organizer – Xtreme Ignite 1.0 Coding Competition",
        description: "Designed and executed the first-ever coding competition at UoVT, drawing 100+ participants."
      },
      {
        year: "2025",
        month: "October",
        position: "IEEE Xtreme Ambassador – UoVT",
        description: "Selected as IEEE Xtreme Ambassador to represent and motivate students to take part in the global coding competition, mentoring peers and encouraging teamwork."
      },
      {
        year: "2025",
        month: "October",
        position: "Chair – IEEE Day",
        description: "Leading the IEEE Day 2025 celebration at UoVT, aimed at inspiring new members and highlighting the impact of technology-driven volunteering."
      }
    ],
    achievements: [
      "Built and led high-performing teams across multiple IEEE projects and collaborations.",
      "Founded and chaired TechSpark 1.0, one of UoVT’s most successful IEEE collaborations.",
      "Organized the first-ever coding competition at UoVT, empowering students to collaborate and compete.",
      "Collaborated with industry professionals for knowledge sharing",
      "Recognized as Volunteer of the Month for leadership excellence and team contribution.",
      "Represented UoVT as an IEEE Xtreme Ambassador, mentoring peers and fostering team spirit."
    ],
    photos: ["/leadership/ieee-xtreme-ignite-coding-competition-group-photo.jpg", "/leadership/ieee-bluewaves-workshop-group-photo.jpg", "/leadership/ieee-techspark-workshop-group-photo.jpg"]
  },
  {
    id: "lead-2",
    title: "Co-Director of Service",
    organization: "Leo Club of Colombo Grand Circle",
    period: "Dec 2024 – Present",
    summary: "Building leadership through service and teamwork to create real social impact.",
    logo: "/logos/leo-club-logo.png",
    gradient: "from-orange-500 to-red-600",
    journey: [
      {
        year: "2024",
        month: "December",
        position: "Member",
        description: "Joined the Leo Club to participate in service projects and community-building efforts."
      },
      {
        year: "2025",
        month: "July",
        position: "Co-Director of Service",
        description: "Collaborated with fellow directors to plan and support service-based initiatives, strengthening coordination and teamwork among members."
      }
    ],
    achievements: [
      "Developed leadership and communication skills through volunteering.",
      "Supported multiple community initiatives with a strong focus on teamwork and empathy."
    ],
    photos: ["/leadership/leo-club-colombo-grand-circle-service-event.jpg"]
  },
  {
    id: "lead-3",
    title: "Member",
    organization: "Robotic and Innovators Club – Mahinda Rajapaksha College",
    period: "2017 - 2020",
    summary: "Discovered my passion for leadership and mentoring through hands-on innovation and teamwork.",
    logo: "/logos/mrc-logo.png",
    gradient: "from-purple-500 to-pink-600",
    journey: [
      {
        year: "2017",
        month: "",
        position: "Member",
        description: "Joined Robotics & Innovators Club as a member."
      },
      {
        year: "2018",
        month: "",
        position: "Trainer – IoT Workshop",
        description: "Volunteered as a trainer at the IoT Workshop organized by the Ministry of Education. Worked as a trainer to teach students IoT fundamentals through interactive sessions."
      }
    ],
    achievements: [
      "Served as one of the youngest trainers in a national IoT workshop.",
      "Laid the foundation for future leadership through collaboration and knowledge sharing."
    ],
    photos: ["/leadership/ministry-education-iot-workshop-participants.jpg", "/leadership/ministry-education-iot-workshop-training-session.jpg"]
  }
];

const photos: Photo[] = [
  {
    id: "photo-1",
    src: "/leadership/ieee-xtreme-ignite-coding-competition-event.jpg",
    alt: "IEEE Xtreme Ignite 1.0 Coding Competition Event",
    rotation: 3,
    zIndex: 4,
    position: { x: 20, y: 10 },
    size: "lg"
  },
  {
    id: "photo-2",
    src: "/leadership/ieee-techspark-cloud-computing-workshop.jpg",
    alt: "IEEE TechSpark Cloud Computing Workshop Organization",
    rotation: -2,
    zIndex: 3,
    position: { x: 60, y: 30 },
    size: "md"
  },
  {
    id: "photo-3",
    src: "/leadership/university-vocational-technology-open-day-event.jpg",
    alt: "University of Vocational Technology Open Day Event",
    rotation: 1,
    zIndex: 5,
    position: { x: 10, y: 60 },
    size: "md"
  },
  {
    id: "photo-4",
    src: "/leadership/ministry-education-iot-workshop-participants.jpg",
    alt: "Ministry of Education IoT Workshop Training Session",
    rotation: -3,
    zIndex: 2,
    position: { x: 70, y: 5 },
    size: "sm"
  },
  {
    id: "photo-5",
    src: "/leadership/leo-club-colombo-grand-circle-service-event.jpg",
    alt: "Leo Club Colombo Grand Circle Community Service Event",
    rotation: 2,
    zIndex: 1,
    position: { x: 37, y: 70 },
    size: "lg"
  },
  {
    id: "photo-6",
    src: "/leadership/microsoft-student-ambassadors-event.jpg",
    alt: "Microsoft Student Ambassadors Event",
    rotation: -1,
    zIndex: 6,
    position: { x: 72, y: 50 },
    size: "md"
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

function LeadershipCard({ role, index, onClick }: { role: LeadershipRole; index: number; onClick: () => void }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const variants = {
    hidden: { opacity: 0, y: 50, x: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15 
      } 
    },
  } as const;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="group relative w-full mb-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02]">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="relative p-6 lg:p-8">
          {/* Header with logo */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 shadow-lg flex-shrink-0 overflow-hidden">
              <Image
                src={role.logo}
                alt={`${role.organization} logo`}
                width={56}
                height={56}
                className="object-contain p-2"
                onError={(e) => {
                  // Fallback to organization initial if logo fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-lg font-bold text-slate-600 dark:text-slate-300">${role.organization.charAt(0)}</span>`;
                  }
                }}
              />
            </div>
            <div className="flex-1">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Leadership
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {role.title}
              </h3>
              <p className="text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300">
                {role.organization}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {role.period}
              </p>
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            {role.summary}
          </p>

          {/* Click indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Click to view journey</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${role.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
    </motion.div>
  );
}

// Leadership Modal Component
function LeadershipModal({ 
  role, 
  isOpen, 
  onClose,
  onPhotoClick
}: { 
  role: LeadershipRole | null; 
  isOpen: boolean; 
  onClose: () => void;
  onPhotoClick: (photo: string) => void;
}) {
  if (!role) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header */}
              <div className={`relative p-8 lg:p-12 bg-gradient-to-br ${role.gradient} text-white`}>
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                    <Image
                      src={role.logo}
                      alt={`${role.organization} logo`}
                      width={64}
                      height={64}
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-2xl font-bold text-white">${role.organization.charAt(0)}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                      {role.title}
                    </h2>
                    <p className="text-xl font-semibold mb-2 opacity-90">
                      {role.organization}
                    </p>
                    <p className="text-lg opacity-80">
                      {role.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 space-y-8">
                {/* Journey Timeline */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Leadership Journey
                  </h3>
                  <div className="space-y-6">
                    {role.journey.map((step, index) => (
                      <motion.div
                        key={index}
                        className={`relative flex gap-6 p-6 rounded-xl border-l-4 ${
                          step.highlight 
                            ? `border-l-4 bg-gradient-to-r ${role.gradient} bg-opacity-10 border-l-current` 
                            : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.highlight 
                              ? `bg-gradient-to-br ${role.gradient} text-white` 
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                          }`}>
                            <span className="text-sm font-bold">{step.year.slice(-2)}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              {step.month} {step.year}
                            </span>
                            {step.highlight && (
                              <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <h4 className={`text-lg font-bold mb-2 ${
                            step.highlight 
                              ? 'text-slate-900 dark:text-slate-100' 
                              : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {step.position}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Key Achievements
                  </h3>
                  <div className="grid gap-4">
                    {role.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.gradient} mt-2 flex-shrink-0`}></div>
                        <p className="text-slate-700 dark:text-slate-300">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Moments & Memories
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                      {role.photos.map((photo, index) => (
                        <motion.div
                          key={index}
                          className="relative h-48 w-64 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0 cursor-pointer"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => onPhotoClick(photo)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={photo}
                            alt={`${role.organization} activity`}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                                    <div class="text-center">
                                      <div class="text-3xl mb-2">📸</div>
                                      <div class="text-sm text-slate-500 dark:text-slate-400 px-2">
                                        Leadership Moment
                                      </div>
                                    </div>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PhotoCollage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const parallaxValues = [y1, y2, y3, y4, y5, y6];

  const getSizeClasses = (size: Photo["size"]) => {
    switch (size) {
      case "sm": return "w-32 h-24 lg:w-40 lg:h-32";
      case "md": return "w-40 h-32 lg:w-48 lg:h-36";
      case "lg": return "w-48 h-36 lg:w-56 lg:h-44";
      default: return "w-40 h-32 lg:w-48 lg:h-36";
    }
  };

  // Ensure consistent rendering between server and client
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Desktop Version - Original Floating Photos */}
      <div ref={containerRef} className="hidden lg:block relative h-[500px] w-full overflow-hidden">
        {isClient && photos.map((photo, index) => {
          const variants = {
            hidden: { opacity: 0, scale: 0.8, rotate: photo.rotation - 10 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              rotate: photo.rotation,
              transition: { 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.2 
              } 
            },
          } as const;

          return (
            <motion.div
              key={photo.id}
              initial="hidden"
              animate="visible"
              variants={variants}
              style={{
                position: "absolute",
                left: `${photo.position.x}%`,
                top: `${photo.position.y}%`,
                zIndex: photo.zIndex,
                y: parallaxValues[index]
              }}
              className={`group cursor-pointer ${getSizeClasses(photo.size)}`}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-200 dark:bg-slate-700">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                          <div class="text-center">
                            <div class="text-2xl mb-2">📸</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 px-2">
                              ${photo.alt}
                            </div>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center p-3">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-slate-800/90 rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm">
                      <p className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center max-w-full">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Version - All 6 Photos Grid Layout */}
      <div className="lg:hidden">
        <motion.div
          className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Mobile Grid Layout - 3x2 Grid */}
          <div className="grid grid-cols-3 gap-2">
            {/* Row 1 - 3 photos */}
            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[0].src}
                alt={photos[0].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-blue-600 dark:text-blue-300 px-1">
                            ${photos[0].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>
            
            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[1].src}
                alt={photos[1].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-purple-600 dark:text-purple-300 px-1">
                            ${photos[1].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>

            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[2].src}
                alt={photos[2].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-green-600 dark:text-green-300 px-1">
                            ${photos[2].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>

            {/* Row 2 - 3 photos */}
            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[3].src}
                alt={photos[3].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-orange-600 dark:text-orange-300 px-1">
                            ${photos[3].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>

            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[4].src}
                alt={photos[4].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-800 dark:to-red-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-red-600 dark:text-red-300 px-1">
                            ${photos[4].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>

            <motion.div
              className="relative h-24 rounded-lg overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={photos[5].src}
                alt={photos[5].alt}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900 flex items-center justify-center">
                        <div class="text-center">
                          <div class="text-lg mb-1">📸</div>
                          <div class="text-xs text-indigo-600 dark:text-indigo-300 px-1">
                            ${photos[5].alt}
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </motion.div>
          </div>

          {/* Mobile Title Overlay */}
          <motion.div
            className="mt-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                Leadership Moments
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Community impact through volunteer work
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function LeadershipVolunteering() {
  const [selectedRole, setSelectedRole] = useState<LeadershipRole | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure particles only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (role: LeadershipRole) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRole(null), 300);
  };

  return (
    <section id="leadership" className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated volunteer elements */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 opacity-5 dark:opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 opacity-5 dark:opacity-10"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl" />
        </motion.div>
        
        {/* Floating leadership elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-24 h-24 opacity-5 dark:opacity-10"
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
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-500 rounded-lg blur-2xl" />
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.03),transparent_50%)]"></div>
        
        {/* Floating Particles - Client Side Only */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(14)].map((_, i) => {
              // Use deterministic values based on index to prevent hydration mismatch
              const left = ((i * 7.1) % 100);
              const top = ((i * 11.4) % 100);
              const duration = 5 + ((i * 0.3) % 3);
              const delay = ((i * 0.5) % 2);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-500/60 dark:bg-green-400/70 rounded-full shadow-lg"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    y: [0, -90, 0],
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.2, 0.4],
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
            className="absolute top-1/4 left-1/3 w-44 h-44 bg-green-500/10 dark:bg-green-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div 
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-4">
            Community Impact
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Making a positive impact through community leadership and volunteer work.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Leadership Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {leadershipRoles.map((role, index) => (
              <LeadershipCard 
                key={role.id} 
                role={role} 
                index={index} 
                onClick={() => handleCardClick(role)}
              />
            ))}
          </motion.div>

          {/* Right Column - Photo Collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PhotoCollage />
          </motion.div>
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
            <span>Building Communities & Creating Impact</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </div>
      
      {/* Modal */}
      <LeadershipModal
        role={selectedRole}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPhotoClick={setSelectedPhoto}
      />
      
      {/* Photo Popup Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={selectedPhoto} 
                alt="Full size photo" 
                width={800} 
                height={600} 
                className="rounded-lg max-w-full max-h-full object-contain" 
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
