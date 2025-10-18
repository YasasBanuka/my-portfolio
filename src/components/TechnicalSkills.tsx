"use client";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Type definitions for skill proficiency levels
type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

// Skill interface defining the structure of each technical skill
type Skill = {
  id: string;
  name: string;
  logo: string;
  proficiency: ProficiencyLevel;
  color: string;
  gradient: string;
  description?: string; // Optional description field for tooltips
  yearsOfExperience?: number; // Optional years of experience
};

// Skill category interface for organizing skills into groups
type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  skills: Skill[];
};

// Comprehensive skill categories with detailed descriptions
const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      {
        id: "react",
        name: "React.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-blue-600",
        description: "Strong understanding of component-based architecture, hooks, state management, and modern React patterns",
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: "Intermediate",
        color: "yellow",
        gradient: "from-yellow-500 to-yellow-500",
        description: "Modern JavaScript with ES6+ features, async/await, modules, and functional programming concepts",
      },
      {
        id: "html5",
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        proficiency: "Expert",
        color: "red",
        gradient: "from-red-500 to-orange-500"
      },
      {
        id: "css3",
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        proficiency: "Expert",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        proficiency: "Intermediate",
        color: "cyan",
        gradient: "from-cyan-500 to-blue-500",
        description: "Utility-first CSS framework for rapid UI development with responsive design and custom components",
      },
      {
        id: "bootstrap",
        name: "Bootstrap",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
        proficiency: "Intermediate",
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        id: "vite",
        name: "Vite",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        proficiency: "Intermediate",
        color: "yellow",
        gradient: "from-yellow-500 to-orange-500"
      },
      {
        id: "elementor",
        name: "Elementor",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@14.11.0/icons/elementor.svg",
        proficiency: "Advanced",
        color: "gray",
        gradient: "from-gray-500 to-gray-500"
      }
    ]
  },
  {
    id: "backend",
    name: "Backend Development",
    icon: "⚙️",
    gradient: "from-emerald-500 to-teal-500",
    skills: [
      {
        id: "java-spring",
        name: "Java (Spring Boot)",
        logo: "https://spring.io/img/projects/spring-boot.svg",
        proficiency: "Advanced",
        color: "green",
        gradient: "from-green-500 to-green-500",
        description: "Enterprise Java development with Spring Boot, dependency injection, and microservices architecture",
      },
      {
        id: "spring-security",
        name: "Spring Security",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "hibernate",
        name: "Hibernate",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg",
        proficiency: "Intermediate",
        color: "gray",
        gradient: "from-gray-500 to-gray-500"
      },
      {
        id: "jpa",
        name: "JPA",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-blue-700"
      },
      {
        id: "nodejs",
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        proficiency: "Beginner",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "express",
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        proficiency: "Beginner",
        color: "gray",
        gradient: "from-gray-500 to-gray-600"
      },
      {
        id: "mysql",
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "h2",
        name: "H2 Database",
        logo: "https://www.h2database.com/html/images/h2-logo-2.png",
        proficiency: "Intermediate",
        color: "indigo",
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        id: "rest-api",
        name: "REST API",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
        proficiency: "Advanced",
        color: "gray",
        gradient: "from-gray-500 to-gray-500"
      },
      {
        id: "java-ee",
        name: "Java EE",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-600 to-blue-700"
      }
    ]
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "📱",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      {
        id: "react-native",
        name: "React Native",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "expo",
        name: "Expo",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
        proficiency: "Intermediate",
        color: "gray",
        gradient: "from-gray-500 to-gray-500"
      },
      {
        id: "android-sdk",
        name: "Android SDK",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "firebase-auth",
        name: "Firebase Auth",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
        proficiency: "Advanced",
        color: "yellow",
        gradient: "from-yellow-500 to-orange-500"
      },
      {
        id: "firebase-db",
        name: "Realtime Database",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
        proficiency: "Advanced",
        color: "orange",
        gradient: "from-orange-500 to-red-500"
      },
      {
        id: "payhere",
        name: "PayHere API",
        logo: "https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      }
    ]
  },
  {
    id: "cloud-databases",
    name: "Cloud & Databases",
    icon: "☁️",
    gradient: "from-sky-500 to-blue-500",
    skills: [
      {
        id: "aws-s3",
        name: "AWS S3",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        proficiency: "Beginner",
        color: "orange",
        gradient: "from-orange-500 to-yellow-500"
      },
      {
        id: "firebase",
        name: "Firebase",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
        proficiency: "Advanced",
        color: "yellow",
        gradient: "from-yellow-500 to-orange-500"
      },
      {
        id: "azure-vision",
        name: "Azure Custom Vision",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "mysql-cloud",
        name: "MySQL",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "sqlite",
        name: "SQLite",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
        proficiency: "Intermediate",
        color: "gray",
        gradient: "from-gray-500 to-slate-500"
      },
      {
        id: "h2-cloud",
        name: "H2 Database",
        logo: "https://www.h2database.com/html/images/h2-logo-2.png",
        proficiency: "Intermediate",
        color: "indigo",
        gradient: "from-indigo-500 to-purple-500"
      }
    ]
  },
  {
    id: "tools-frameworks",
    name: "Tools & Frameworks",
    icon: "🧩",
    gradient: "from-indigo-500 to-purple-500",
    skills: [
      {
        id: "git",
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        proficiency: "Advanced",
        color: "red",
        gradient: "from-red-500 to-orange-500"
      },
      {
        id: "github",
        name: "GitHub",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        proficiency: "Advanced",
        color: "gray",
        gradient: "from-gray-600 to-gray-800"
      },
      {
        id: "postman",
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        proficiency: "Advanced",
        color: "orange",
        gradient: "from-orange-500 to-red-500"
      },
      {
        id: "docker",
        name: "Docker",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        proficiency: "Beginner",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "arduino",
        name: "Arduino IDE",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-teal-500"
      },
      {
        id: "eclipse",
        name: "Eclipse",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eclipse/eclipse-original.svg",
        proficiency: "Advanced",
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        id: "intellij",
        name: "IntelliJ IDEA",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "netbeans",
        name: "NetBeans",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",
        proficiency: "Intermediate",
        color: "red",
        gradient: "from-red-500 to-pink-500"
      },
      {
        id: "glassfish",
        name: "GlassFish",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/GlassFish_logo.svg/330px-GlassFish_logo.svg.png",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "payara",
        name: "Payara",
        logo: "https://cdn.payara.fish/wp-content/uploads/2025/08/Payara_Server.svg",
        proficiency: "Intermediate",
        color: "orange",
        gradient: "from-orange-500 to-orange-500"
      }
    ]
  },
  {
    id: "methodologies",
    name: "Methodologies & Concepts",
    icon: "🔄",
    gradient: "from-teal-500 to-green-500",
    skills: [
      {
        id: "oop",
        name: "Object-Oriented Programming",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "rest-api-design",
        name: "RESTful API Design",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
        proficiency: "Advanced",
        color: "gray",
        gradient: "from-gray-500 to-gray-500"
      },
      {
        id: "agile-scrum",
        name: "Agile / Scrum",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-blue-500"
      },
      {
        id: "cicd",
        name: "CI/CD",
        logo: "https://s3.amazonaws.com/vipm-io-media-files-production/media/package-list-images/7d7747a7-68b1-4cd7-9527-19eb96be9d7c.png",
        proficiency: "Beginner",
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        id: "unit-testing",
        name: "Unit Testing (JUnit)",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "red",
        gradient: "from-red-500 to-pink-500"
      },
      {
        id: "auth-auth",
        name: "Authentication & Authorization",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerlad-500"
      },
      {
        id: "jwt",
        name: "JWT",
        logo: "https://www.jwt.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjwt-flower.f20616b0.png&w=1920&q=75",
        proficiency: "Beginner",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "spring-security-method",
        name: "Spring Security",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "sdlc",
        name: "Software Development Life Cycle",
        logo: "https://cdn2.iconfinder.com/data/icons/programming-76/512/SDLC-software-development-life_cycle-512.png",
        proficiency: "Intermediate",
        color: "purple",
        gradient: "from-purple-500 to-indigo-500"
      }
    ]
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

// Enhanced SkillCard component with tooltips, glow effects, and detailed hover animations
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();
  const [showTooltip, setShowTooltip] = useState(false);

  // Animation variants for the skill card
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  // Get proficiency level color coding
  const getProficiencyColor = (proficiency: ProficiencyLevel) => {
    switch (proficiency) {
      case "Expert": return "text-green-600 dark:text-green-400";
      case "Advanced": return "text-blue-600 dark:text-blue-400";
      case "Intermediate": return "text-yellow-600 dark:text-yellow-400";
      case "Beginner": return "text-gray-600 dark:text-gray-400";
      default: return "text-gray-600 dark:text-gray-400";
    }
  };


  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative"
    >
      {/* Main skill card with enhanced hover effects */}
      <motion.div
        className={`relative p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-400/20 hover:border-blue-300 dark:hover:border-blue-600`}
        whileHover={{ 
          scale: 1.05,
          y: -4,
          rotateY: 2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        style={{
          // Add subtle gradient background on hover
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)"
        }}
      >
        {/* Glow effect overlay */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${skill.gradient} blur-sm -z-10`} />
        
        {/* Skill Logo and Name */}
        <div className="flex flex-col items-center text-center space-y-3 relative z-10">
          {/* Logo container with enhanced styling */}
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-700 shadow-sm overflow-hidden border border-slate-200 dark:border-slate-600"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            <Image 
              src={skill.logo} 
              alt={`${skill.name} logo`}
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-110"
              onError={(e) => {
                // Fallback to a generic icon if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-2xl">💻</span>`;
                }
              }}
            />
          </motion.div>
          
          {/* Skill name and proficiency */}
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {skill.name}
            </h3>
            <div className={`text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
              {skill.proficiency}
            </div>
            {/* Years of experience indicator */}
            {skill.yearsOfExperience && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {skill.yearsOfExperience}+ years
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
            >
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800 dark:border-t-slate-700" />
              
              {/* Tooltip content */}
              <div className="bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs">
                <div className="font-semibold mb-1">{skill.name}</div>
                <div className="text-slate-300">{skill.description}</div>
                {skill.yearsOfExperience && (
                  <div className="text-slate-400 mt-1">
                    {skill.yearsOfExperience}+ years experience
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// Enhanced TabButton component for category navigation with responsive design
function TabButton({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: SkillCategory; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  // Responsive names - full on desktop, short on mobile/tablet for better UX
  const getDisplayName = (categoryId: string) => {
    switch (categoryId) {
      case "frontend": return "Frontend";
      case "backend": return "Backend";
      case "mobile": return "Mobile";
      case "cloud-databases": return "Cloud";
      case "tools-frameworks": return "Tools";
      case "methodologies": return "Methods";
      default: return category.name;
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
        isActive
          ? 'bg-blue-500 text-white shadow-lg'
          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 hover:bg-blue-500/20 hover:border-blue-500/50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-1.5">
        <span className="text-sm">{category.icon}</span>
        <span className="text-xs lg:text-sm">
          <span className="hidden lg:inline">{category.name}</span>
          <span className="lg:hidden">{getDisplayName(category.id)}</span>
        </span>
      </span>
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"
          layoutId="activeTab"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}

// CategoryNavigation component for pagination controls with visual indicators
function CategoryNavigation({ 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext 
}: {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  // Determine if navigation buttons should be enabled
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < totalItems - 1;

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
        {Array.from({ length: totalItems }).map((_, index) => (
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

// Main TechnicalSkills component - the heart of the skills showcase
export default function TechnicalSkills() {
  // State management for active category navigation
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  
  // Custom hook for reveal-once animation behavior
  const { ref, controls } = useRevealOnce<HTMLElement>();

  // Animation variants for the main section
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  // Animation variants for child elements (header, navigation, content)
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  // Navigation handlers with bounds checking
  const handlePrevious = () => {
    setActiveCategoryIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveCategoryIndex(prev => Math.min(skillCategories.length - 1, prev + 1));
  };

  // Get the currently active category for display
  const activeCategory = skillCategories[activeCategoryIndex];

  return (
    <section 
      id="skills"
      ref={ref}
      className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 dark:from-slate-900 dark:via-blue-900/10 dark:to-purple-900/10 overflow-hidden"
    >
      {/* Interactive Background Elements - Creates depth and visual interest */}
      <div className="absolute inset-0 z-0">
        {/* Animated tech pattern overlay */}
        <motion.div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="tech-grid" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <rect width="25" height="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="12.5" cy="12.5" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
          </svg>
        </motion.div>
        
        {/* Floating tech elements */}
        <motion.div 
          className="absolute top-20 right-20 w-32 h-32 opacity-5 dark:opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg blur-2xl" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 left-20 w-24 h-24 opacity-5 dark:opacity-10"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 3,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-2xl" />
        </motion.div>
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/2 left-1/3 w-20 h-20 opacity-5 dark:opacity-10"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-xl" />
        </motion.div>
      </div>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          className="relative z-10"
          initial="hidden"
          animate={controls}
          variants={sectionVariants}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Section Header with Title and Description */}
          <motion.div 
            className="mx-auto mb-12 max-w-3xl text-center"
            variants={childVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
              Technical Arsenal
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              The tools and technologies I use to design, build, and scale digital solutions.
            </p>
          </motion.div>

          {/* Category Tab Navigation - Allows users to switch between skill categories */}
          <motion.div 
            className="mb-8"
            variants={childVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-center gap-2">
              {skillCategories.map((category, index) => (
                <TabButton
                  key={category.id}
                  category={category}
                  isActive={activeCategoryIndex === index}
                  onClick={() => setActiveCategoryIndex(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Skills Display Area - Shows skills for the currently selected category */}
          <motion.div 
            className="min-h-[400px]"
            variants={childVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* AnimatePresence ensures smooth transitions between categories */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {activeCategory && (
                  <div className="space-y-6">
                    {/* Category Header with Icon and Title */}
                    <div className="flex items-center justify-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${activeCategory.gradient} shadow-lg`}>
                        <span className="text-2xl">{activeCategory.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {activeCategory.name}
                      </h3>
                    </div>

                    {/* Responsive Skills Grid - 2 cols mobile, 3 tablet, 4 desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                      {activeCategory.skills.map((skill, index) => (
                        <SkillCard 
                          key={skill.id} 
                          skill={skill} 
                          index={index} 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
        </motion.div>

          {/* Category Navigation Controls - Previous/Next buttons with pagination dots */}
          <CategoryNavigation
            currentIndex={activeCategoryIndex}
            totalItems={skillCategories.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />

          {/* Footer Decorative Element - Adds visual closure to the section */}
          <motion.div 
            className="mt-16 flex justify-center"
            variants={childVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
              <span>Always Learning & Growing</span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
            </div>
          </motion.div>
      </motion.div>
      </div>
    </section>
  );
}