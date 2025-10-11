"use client";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ProficiencyLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

type Skill = {
  id: string;
  name: string;
  logo: string;
  proficiency: ProficiencyLevel;
  color: string;
  gradient: string;
};

type SkillCategory = {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  skills: Skill[];
};

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
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-blue-600"
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: "Advanced",
        color: "orange",
        gradient: "from-orange-500 to-red-500"
      },
      {
        id: "html5",
        name: "HTML5",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        proficiency: "Advanced",
        color: "red",
        gradient: "from-red-500 to-orange-500"
      },
      {
        id: "css3",
        name: "CSS3",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        proficiency: "Advanced",
        color: "cyan",
        gradient: "from-cyan-500 to-blue-500"
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
        logo: "https://elementor.com/mark/wp-content/uploads/2021/10/cropped-Elementor-Logo-Symbol-Red-32x32.png",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Advanced",
        color: "red",
        gradient: "from-red-500 to-orange-500"
      },
      {
        id: "spring-security",
        name: "Spring Security",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        proficiency: "Advanced",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "hibernate",
        name: "Hibernate",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg",
        proficiency: "Intermediate",
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
      },
      {
        id: "jpa",
        name: "JPA",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-indigo-500"
      },
      {
        id: "nodejs",
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "express",
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        proficiency: "Intermediate",
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: "Advanced",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
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
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-purple-500"
      },
      {
        id: "expo",
        name: "Expo",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
        proficiency: "Intermediate",
        color: "purple",
        gradient: "from-purple-500 to-pink-500"
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
        logo: "https://www.payhere.lk/downloads/images/payhere_logo.png",
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
        proficiency: "Intermediate",
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoft/microsoft-original.svg",
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "payara",
        name: "Payara",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        proficiency: "Intermediate",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
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
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: "Advanced",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "agile-scrum",
        name: "Agile / Scrum",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg",
        proficiency: "Intermediate",
        color: "orange",
        gradient: "from-orange-500 to-yellow-500"
      },
      {
        id: "cicd",
        name: "CI/CD",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
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
        proficiency: "Advanced",
        color: "indigo",
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        id: "jwt",
        name: "JWT",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        proficiency: "Advanced",
        color: "blue",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        id: "spring-security-method",
        name: "Spring Security",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
        proficiency: "Advanced",
        color: "green",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        id: "sdlc",
        name: "Software Development Life Cycle",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
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

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

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
      className="group relative"
    >
      <motion.div
        className="relative p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        whileHover={{ 
          scale: 1.02,
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Skill Logo and Name */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-700 shadow-sm overflow-hidden">
            <img 
              src={skill.logo} 
              alt={`${skill.name} logo`}
              className="w-8 h-8 object-contain"
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
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
              {skill.name}
            </h3>
            <div className={`text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
              {skill.proficiency}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TabButton({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: SkillCategory; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  // Responsive names - full on desktop, short on mobile/tablet
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

export default function TechnicalSkills() {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const { ref, controls } = useRevealOnce<HTMLElement>();

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

  const handlePrevious = () => {
    setActiveCategoryIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveCategoryIndex(prev => Math.min(skillCategories.length - 1, prev + 1));
  };

  const activeCategory = skillCategories[activeCategoryIndex];

  return (
    <section 
      id="skills"
      ref={ref}
      className="relative mx-auto max-w-7xl px-4 py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
      <motion.div 
        className="relative z-10"
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
      >
        {/* Header */}
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center"
          variants={childVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            Technical Arsenal
          </h2>
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            The tools and technologies I use to design, build, and scale digital solutions.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="mb-8"
          variants={childVariants}
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

        {/* Skills Display Area */}
        <motion.div 
          className="min-h-[400px]"
          variants={childVariants}
        >
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
                  {/* Category Header */}
                  <div className="flex items-center justify-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${activeCategory.gradient} shadow-lg`}>
                      <span className="text-2xl">{activeCategory.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {activeCategory.name}
                    </h3>
                  </div>

                  {/* Skills Grid */}
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

        {/* Category Navigation */}
        <CategoryNavigation
          currentIndex={activeCategoryIndex}
          totalItems={skillCategories.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 flex justify-center"
          variants={childVariants}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-slate-300 dark:to-slate-600"></span>
            <span>Always Learning & Growing</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}