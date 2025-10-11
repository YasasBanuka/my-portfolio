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
    title: "IEEE Student Volunteer",
    organization: "IEEE Sri Lanka Section",
    period: "2022 - Present",
    summary: "Leading tech events, workshops, and mentoring students in emerging technologies.",
    logo: "/logos/ieee-logo.png",
    gradient: "from-blue-500 to-purple-600",
    journey: [
      {
        year: "2022",
        month: "March",
        position: "Student Member",
        description: "Joined IEEE Sri Lanka Section as a student member, attending workshops and tech talks."
      },
      {
        year: "2022",
        month: "September",
        position: "Event Volunteer",
        description: "Started volunteering at IEEE events, helping with organization and logistics."
      },
      {
        year: "2023",
        month: "January",
        position: "Workshop Coordinator",
        description: "Coordinated multiple tech workshops on AI, IoT, and web development."
      },
      {
        year: "2024",
        month: "June",
        position: "Student Mentor",
        description: "Mentoring junior students in emerging technologies and career guidance.",
        highlight: true
      }
    ],
    achievements: [
      "Organized 15+ tech workshops and events",
      "Mentored 50+ students in emerging technologies",
      "Led community initiatives for innovation culture",
      "Collaborated with industry professionals for knowledge sharing"
    ],
    photos: ["/leadership/ieee-workshop.jpg", "/leadership/ieee-mentoring.jpg", "/leadership/ieee-event.jpg"]
  },
  {
    id: "lead-2",
    title: "Co-Founder & Chair",
    organization: "TechSpark 1.0",
    period: "2023 - Present",
    summary: "Co-founded platform connecting aspiring developers with industry professionals.",
    logo: "/logos/techspark-logo.png",
    gradient: "from-emerald-500 to-blue-600",
    journey: [
      {
        year: "2023",
        month: "March",
        position: "Co-Founder",
        description: "Co-founded TechSpark 1.0 with vision to bridge industry-academia gap."
      },
      {
        year: "2023",
        month: "May",
        position: "Event Director",
        description: "Organized first hackathon with 100+ participants from multiple universities."
      },
      {
        year: "2023",
        month: "October",
        position: "Community Builder",
        description: "Built community of 500+ developers and industry professionals."
      },
      {
        year: "2024",
        month: "January",
        position: "Chair & Strategic Lead",
        description: "Leading strategic initiatives and partnerships with tech companies.",
        highlight: true
      }
    ],
    achievements: [
      "Co-founded platform with 500+ active members",
      "Organized 8+ hackathons and tech talks",
      "Connected 200+ students with industry mentors",
      "Established partnerships with 10+ tech companies"
    ],
    photos: ["/leadership/techspark-hackathon.jpg", "/leadership/techspark-networking.jpg", "/leadership/techspark-event.jpg"]
  },
  {
    id: "lead-3",
    title: "Robotics Club Member",
    organization: "Mahinda Rajapaksha College",
    period: "2018 - 2022",
    summary: "Active member participating in competitions and mentoring junior students.",
    logo: "/logos/robotics-club-logo.png",
    gradient: "from-purple-500 to-pink-600",
    journey: [
      {
        year: "2018",
        month: "January",
        position: "Club Member",
        description: "Joined Robotics & Innovators Club as a beginner member."
      },
      {
        year: "2019",
        month: "March",
        position: "Competition Participant",
        description: "Participated in first robotics competition at school level."
      },
      {
        year: "2020",
        month: "September",
        position: "Team Lead",
        description: "Led robotics team for inter-school competitions."
      },
      {
        year: "2021",
        month: "January",
        position: "Mentor",
        description: "Started mentoring junior students in robotics and programming.",
        highlight: true
      }
    ],
    achievements: [
      "Participated in 10+ robotics competitions",
      "Mentored 30+ junior students",
      "Led team to 3rd place in national competition",
      "Developed innovative robotic solutions"
    ],
    photos: ["/leadership/robotics-competition.jpg", "/leadership/robotics-mentoring.jpg", "/leadership/robotics-project.jpg"]
  },
  {
    id: "lead-4",
    title: "Leo Club Member",
    organization: "Leo Club of Homagama",
    period: "2019 - 2022",
    summary: "Community service volunteer focusing on youth development and social impact.",
    logo: "/logos/leo-club-logo.png",
    gradient: "from-orange-500 to-red-600",
    journey: [
      {
        year: "2019",
        month: "February",
        position: "Club Member",
        description: "Joined Leo Club of Homagama as a community service volunteer."
      },
      {
        year: "2020",
        month: "June",
        position: "Project Volunteer",
        description: "Led community service projects focusing on environmental initiatives."
      },
      {
        year: "2021",
        month: "March",
        position: "Youth Coordinator",
        description: "Coordinated youth development programs and charity events."
      },
      {
        year: "2025",
        month: "January",
        position: "Service Director",
        description: "Appointed as Service Director, leading all community service initiatives.",
        highlight: true
      }
    ],
    achievements: [
      "Organized 20+ community service projects",
      "Led environmental conservation initiatives",
      "Coordinated charity events raising $5000+",
      "Mentored youth in leadership development"
    ],
    photos: ["/leadership/leo-service.jpg", "/leadership/leo-charity.jpg", "/leadership/leo-youth.jpg"]
  }
];

const photos: Photo[] = [
  {
    id: "photo-1",
    src: "/leadership/ieee-talk.jpg",
    alt: "IEEE Tech Talk Presentation",
    rotation: 3,
    zIndex: 4,
    position: { x: 20, y: 10 },
    size: "lg"
  },
  {
    id: "photo-2",
    src: "/leadership/techspark-chair.jpg",
    alt: "TechSpark Event Organization",
    rotation: -2,
    zIndex: 3,
    position: { x: 60, y: 30 },
    size: "md"
  },
  {
    id: "photo-3",
    src: "/leadership/jamboree-lead.jpg",
    alt: "Student Leadership at Jamboree",
    rotation: 1,
    zIndex: 5,
    position: { x: 10, y: 60 },
    size: "md"
  },
  {
    id: "photo-4",
    src: "/leadership/leo-service.jpg",
    alt: "Leo Club Community Service",
    rotation: -3,
    zIndex: 2,
    position: { x: 70, y: 5 },
    size: "sm"
  },
  {
    id: "photo-5",
    src: "/leadership/iot-trainer.jpg",
    alt: "IoT Workshop Training",
    rotation: 2,
    zIndex: 1,
    position: { x: 30, y: 70 },
    size: "lg"
  },
  {
    id: "photo-6",
    src: "/leadership/mentoring.jpg",
    alt: "Student Mentoring Session",
    rotation: -1,
    zIndex: 6,
    position: { x: 80, y: 50 },
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
  onClose 
}: { 
  role: LeadershipRole | null; 
  isOpen: boolean; 
  onClose: () => void; 
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {role.photos.map((photo, index) => (
                      <motion.div
                        key={index}
                        className="relative h-48 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-3xl mb-2">📸</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 px-2">
                              Leadership Moment
                            </div>
                          </div>
                        </div>
                        <Image
                          src={photo}
                          alt={`${role.organization} activity`}
                          fill
                          className="object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </motion.div>
                    ))}
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

  return (
    <div ref={containerRef} className="relative h-96 lg:h-[500px] w-full overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-purple-50/30 dark:from-slate-950/50 dark:via-slate-900/30 dark:to-slate-950/30 z-0"></div>
      
      {/* Floating photos */}
      {photos.map((photo, index) => {
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
              {/* Placeholder content */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-2">📸</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 px-2">
                    {photo.alt}
                  </div>
                </div>
              </div>
              
              {/* Actual image (when available) */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onError={(e) => {
                  // Keep placeholder visible on error
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function LeadershipVolunteering() {
  const [selectedRole, setSelectedRole] = useState<LeadershipRole | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (role: LeadershipRole) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRole(null), 300);
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_70%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
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
            Leadership & Volunteering
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Inspiring change through community, collaboration, and courage.
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

        {/* Mobile Photo Section */}
        <div className="lg:hidden mt-12">
          <motion.div
            className="relative h-80 w-full overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">📸</div>
                <div className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Leadership Moments
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Real photos of community impact and leadership
                </div>
              </div>
            </div>
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
      />
    </section>
  );
}
