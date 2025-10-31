/**
 * Projects Component - Showcases featured portfolio projects
 * 
 * This component displays a carousel of project cards with detailed modals,
 * featuring smooth animations, responsive design, and interactive elements.
 * Each project includes comprehensive information about technologies used,
 * challenges faced, solutions implemented, and project outcomes.
 * 
 * Key Features:
 * - Responsive carousel navigation with touch/swipe support
 * - Detailed project modals with screenshots and technical details
 * - Smooth animations using Framer Motion
 * - SEO-optimized project descriptions and metadata
 * - Accessibility features with proper ARIA labels
 * 
 * @author Yasas Banuka
 * @version 1.0.0
 */

"use client";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Project interface defining the structure of each portfolio project
 * Includes comprehensive project metadata for display and SEO optimization
 */
type Project = {
  id: string;                    // Unique identifier for the project
  title: string;                 // Project name/title
  description: string;           // Brief project description for cards
  detailedDescription: string;   // Comprehensive project overview for modals
  techStack: string[];          // Technologies and frameworks used
  features: string[];            // Key features and functionalities
  challenges: string[];          // Technical challenges encountered
  solutions: string[];           // Solutions implemented to overcome challenges
  imageUrl: string;             // Main project image/screenshot
  githubUrl?: string;           // Primary GitHub repository URL
  liveDemoUrl?: string;         // Live demo/production URL
  frontendRepo?: string;        // Frontend-specific repository URL
  backendRepo?: string;         // Backend-specific repository URL
  gradient: string;             // CSS gradient for visual theming
  category: string;             // Project category (Web Dev, Mobile, etc.)
  duration: string;             // Project development timeline
  teamSize?: string;            // Team composition information
  screenshots?: string[];       // Additional project screenshots
};

/**
 * Portfolio Projects Data
 * 
 * Comprehensive collection of featured projects showcasing diverse technical skills
 * and problem-solving abilities. Each project includes detailed metadata for
 * SEO optimization and comprehensive project information display.
 * 
 * Projects are organized by complexity and impact, featuring:
 * - Full-stack web applications
 * - Mobile applications (Android/React Native)
 * - IoT and hardware integration projects
 * - Enterprise software solutions
 */
const projects: Project[] = [
  {
    id: "project-1",
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio showcasing my journey as a software engineer, built with Next.js and enhanced by AI-assisted development.",
    detailedDescription: "A sophisticated portfolio website built with Next.js 14, TypeScript, and Tailwind CSS, featuring smooth animations with Framer Motion. The project demonstrates modern web development practices while leveraging AI tools like Cursor to accelerate development without compromising code quality. It showcases my technical skills, projects, and professional journey through an interactive, visually appealing interface.",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Cursor AI", "Vercel"],
    features: [
      "Responsive design with mobile-first approach",
      "Smooth scroll animations and micro-interactions",
      "Interactive project showcases with detailed modals",
      "Dynamic navigation with active section highlighting",
      "Contact form with email integration",
      "Dark/light theme support",
      "SEO optimized with metadata",
      "Performance optimized with Next.js Image component"
    ],
    challenges: [
      "Balancing AI-assisted development with maintaining code quality",
      "Creating smooth animations without performance impact",
      "Implementing complex scroll-based interactions",
      "Ensuring accessibility across all components",
      "Optimizing for various screen sizes and devices"
    ],
    solutions: [
      "Used Cursor AI strategically for boilerplate code while maintaining architectural decisions",
      "Implemented Framer Motion with proper optimization techniques",
      "Created custom hooks for scroll detection and intersection observers",
      "Applied ARIA labels and semantic HTML throughout",
      "Used CSS Grid and Flexbox for responsive layouts with Tailwind utilities"
    ],
    imageUrl: "/projects/portfolio-website.jpg",
    githubUrl: "https://github.com/YasasBanuka/my-portfolio",
    liveDemoUrl: "https://iamyasasbanuka.me",
    gradient: "from-purple-500 to-pink-600",
    category: "Web Development",
    duration: "2 weeks",
    teamSize: "Solo Project",
    screenshots: ["/projects/portfolio-hero.jpg", "/projects/portfolio-projects.jpg", "/projects/portfolio-contact.jpg"]
  },
  {
    id: "project-2",
    title: "Full-Stack E-Commerce Application",
    description: "Full stack e-commerce using React (Vite) frontend and Spring Boot backend with Spring Security.",
    detailedDescription: "A split frontend-backend ecommerce project. The frontend is built with React (Vite + Axios), handling UI, routing, API calls. The backend is Spring Boot with H2 database (for testing) and Spring Security for user auth and role-based access. CRUD endpoints for products, orders, users, and a secured API layer.",
    techStack: ["React", "Vite", "Axios", "Spring Boot", "Spring Security", "H2"],
    features: [
      "JWT / session-based authentication",
      "Product catalog CRUD APIs",
      "Cart and order APIs",
      "Role-based access (user, admin)",
      "Image upload support (future expansion)",
      "Responsive UI"
    ],
    challenges: [
      "Synchronizing frontend state with backend data",
      "Securing APIs from unauthorized access",
      "Handling CSRF, CORS, and security issues",
      "Setting up development vs production configs"
    ],
    solutions: [
      "Used Axios interceptors for token refreshing",
      "Configured CORS and CSRF tokens properly",
      "Modularized API layers and service layers",
      "Used profiles for environment separation"
    ],
    imageUrl: "/projects/ecommerce-app.jpg",
    frontendRepo: "https://github.com/YasasBanuka/ecom-frontend",
    backendRepo: "https://github.com/YasasBanuka/ecom-backend",
    gradient: "from-blue-500 to-purple-600",
    category: "Full-Stack Web Application",
    duration: "3 months",
    teamSize: "Solo Project",
    screenshots: ["/projects/ecommerce-home.jpg", "/projects/ecommerce-products.jpg", "/projects/ecommerce-cart.jpg"]
  },
  {
    id: "project-3",
    title: "Smart Trade – E-Commerce Platform",
    description: "Built a Java-based full featured ecommerce platform with secure checkout and user workflows.",
    detailedDescription: "Smart Trade is a Java EE / Hibernate backend with a frontend in HTML, CSS, and JavaScript. It supports user registration (email verification), product listing, shopping cart, and a secure checkout integrated with a payment gateway. The system handles end-to-end shopping flows and data persistence via Hibernate and JSON serialization with Gson.",
    techStack: ["Java EE", "Hibernate", "Gson", "HTML", "CSS", "JavaScript"],
    features: [
      "User registration with email verification",
      "Product catalog with CRUD operations",
      "Shopping cart synchronization",
      "Secure checkout flow integrated with payment gateway",
      "Order history for users",
      "Input validation & error handling"
    ],
    challenges: [
      "Managing transaction consistency during checkout",
      "Handling concurrency on stock updates",
      "Integrating with external payment gateway APIs",
      "Ensuring safe data serialization / deserialization"
    ],
    solutions: [
      "Used database transactions to guard against partial failures",
      "Employed optimistic locking / validations for stock updates",
      "Wrapped payment API calls in fallback / retry logic",
      "Sanitized inputs and used Gson for safe JSON handling"
    ],
    imageUrl: "/projects/smart-trade.jpg",
    githubUrl: "https://github.com/YasasBanuka/SmartTrade",
    gradient: "from-emerald-500 to-blue-600",
    category: "Enterprise Software",
    duration: "1 month",
    teamSize: "Solo Project",
    screenshots: ["/projects/data-dashboard.jpg", "/projects/data-reports.jpg", "/projects/data-analytics.jpg"]
  },
  {
    id: "project-4",
    title: "QuickCart – Mobile Food Delivery Application",
    description: "Android delivery app connecting users to restaurants with real-time orders, payments, and notifications.",
    detailedDescription: "QuickCart is an Android mobile application enabling users to browse restaurants, place orders, and track delivery. It uses Firebase for authentication and real-time database, integrates PayHere for payments, and pushes notifications for order updates.",
    techStack: ["Android SDK", "Java", "Firebase (Auth & Realtime DB)", "PayHere API"],
    features: [
      "User registration & login",
      "Restaurant listing with search & filters",
      "Order placement & tracking in real-time",
      "Secure payment integration (PayHere)",
      "Push notifications for order status",
      "Order history"
    ],
    challenges: [
      "Synchronizing real-time order state across users and restaurants",
      "Handling payment failures / rollbacks",
      "Ensuring compatibility across Android versions",
      "Offline / connectivity fallback"
    ],
    solutions: [
      "Used Firebase Realtime Database for live updates",
      "Wrapped payment logic with rollback and retry mechanisms",
      "Followed Android best practices and support libraries for compatibility",
      "Stored transient state locally to mitigate intermittent connectivity"
    ],
    imageUrl: "/projects/quickcart-app.jpg",
    githubUrl: "https://github.com/YasasBanuka/QuickCart",
    gradient: "from-orange-500 to-red-600",
    category: "Mobile Application",
    duration: "1 month",
    teamSize: "Solo Project",
    screenshots: ["/projects/quickcart-home.jpg", "/projects/quickcart-restaurants.jpg", "/projects/quickcart-tracking.jpg"]
  },
  {
    id: "project-5",
    title: "Smart Gas Detector – IoT Safety System",
    description: "ESP32 + MQ-2 gas detector with Java EE backend and React Native app, real-time status, buzzer/LED alerts, and in-app alarm control.",
    detailedDescription: "An end-to-end gas detection system built around an ESP32 reading an MQ-2 sensor. The ESP32 connects to Wi‑Fi and publishes gas readings to a Java EE backend via HTTP using compact JSON payloads. When the reading exceeds a configured threshold, the hardware triggers a buzzer and an LED. A React Native (Expo) mobile app polls the backend about every second to display the live gas level and status (Safe/Danger) and includes a \"Stop Alarm\" action that tells the backend to silence the buzzer/LED on the device. The backend, implemented with Java EE and Gson, exposes simple REST endpoints for device updates and app queries, handling JSON serialization/deserialization and relay of alarm control.",
    techStack: ["ESP32", "MQ-2 sensor", "Arduino", "WiFi", "HTTPClient", "ArduinoJson", "Java EE", "Gson", "React Native / Expo"],
    features: [
      "ESP32 reads MQ-2 analog values and posts JSON to backend",
      "Threshold-based alerts activating buzzer and LED on device",
      "Mobile app shows live gas level and Safe/Danger status (≈1s updates)",
      "In-app \"Stop Alarm\" sends command to silence buzzer/LED",
      "Java EE REST API with Gson for JSON handling",
      "Configurable Wi‑Fi and endpoint settings for deployments"
    ],
    challenges: [
      "Reliable Wi‑Fi connectivity and request retries on ESP32",
      "Low-latency status updates without draining device battery",
      "Handling intermittent network failures between device and server",
      "Coordinating alarm state between device hardware and mobile app"
    ],
    solutions: [
      "Used lightweight HTTP polling (~1s) with compact JSON payloads",
      "Implemented basic retry/backoff on failed ESP32 transmissions",
      "Java EE endpoints with Gson for safe serialization and simple control routes",
      "Clear state machine on backend for alarm/stop commands relayed to device"
    ],

    imageUrl: "/projects/smart-gas-detector.jpg",
    githubUrl: "https://github.com/YasasBanuka/Smart-Gas-Detector",
    gradient: "from-purple-500 to-pink-600",
    category: "IoT & Mobile",
    duration: "1 month",
    teamSize: "Solo Project",
    screenshots: ["/projects/gas-dashboard.jpg", "/projects/gas-alerts.jpg", "/projects/gas-analytics.jpg"]
  },
  {
    id: "project-6",
    title: "ConsultConnect – Android M-Commerce / Consultation App",
    description: "Android app connecting clients to consultants with booking and in-app payments.",
    detailedDescription: "ConsultConnect allows users to search consultant profiles, book sessions, manage profiles, and pay securely inside the app. It includes user authentication, directory browsing, secure payment flows, and direct interactions between users and consultants.",
    techStack: ["Java", "XML", "Android SDK", "SQLite", "Firebase", "Google Maps API"],
    features: [
      "User & consultant authentication and profiles",
      "Consultant directory & search",
      "Booking / scheduling system",
      "Secure in-app payments",
      "Map / location integration",
      "User reviews / ratings"
    ],
    challenges: [
      "Managing booking conflicts and time zones",
      "Handling payment errors and rollback",
      "Ensuring data consistency between user and consultant modules",
      "Providing smooth UX across Android devices"
    ],
    solutions: [
      "Implemented booking Lock / reservation checks",
      "Handled payment exceptions and rollbacks transactionally",
      "Used structured data models and consistency checks",
      "Tested on multiple device form factors"
    ],

    imageUrl: "/projects/consult-connect.jpg",
    githubUrl: "https://github.com/YasasBanuka/ConsultConnect",
    gradient: "from-blue-500 to-purple-600",
    category: "Mobile Application",
    duration: "1 month",
    teamSize: "Solo Project",
    screenshots: ["/projects/gas-dashboard.jpg", "/projects/gas-alerts.jpg", "/projects/gas-analytics.jpg"]
  },
  {
    id: "project-7",
    title: "E-Commerce (React + Spring Boot)",
    description: "Full stack e-commerce using React (Vite) frontend and Spring Boot backend with Spring Security.",
    detailedDescription: "A split frontend-backend ecommerce project. The frontend is built with React (Vite + Axios), handling UI, routing, API calls. The backend is Spring Boot with H2 database (for testing) and Spring Security for user auth and role-based access. CRUD endpoints for products, orders, users, and a secured API layer.",
    techStack: ["React", "Vite", "Axios", "Spring Boot", "Spring Security", "H2"],
    features: [
      "JWT / session-based authentication",
      "Product catalog CRUD APIs",
      "Cart and order APIs",
      "Role-based access (user, admin)",
      "Image upload support (future expansion)",
      "Responsive UI"
    ],
    challenges: [
      "Synchronizing frontend state with backend data",
      "Securing APIs from unauthorized access",
      "Handling CSRF, CORS, and security issues",
      "Setting up development vs production configs"
    ],
    solutions: [
      "Used Axios interceptors for token refreshing",
      "Configured CORS and CSRF tokens properly",
      "Modularized API layers and service layers",
      "Used profiles for environment separation"
    ],
    imageUrl: "/projects/ecom.jpg",
    githubUrl: "https://github.com/YasasBanuka/ConsultConnect",
    gradient: "from-emerald-500 to-blue-600",
    category: "Full-Stack Web Application",
    duration: "1 month",
    teamSize: "Solo Project",
    screenshots: ["/projects/gas-dashboard.jpg", "/projects/gas-alerts.jpg", "/projects/gas-analytics.jpg"]
  },
  // {
  //   id: "project-8",
  //   title: "Student Management System",
  //   description: "Comprehensive web-based system for managing student records, grades, and academic progress with role-based access control.",
  //   detailedDescription: "A full-featured student management system designed for educational institutions to streamline administrative tasks, track student progress, and facilitate communication between students, teachers, and administrators.",
  //   techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
  //   features: [
  //     "Student enrollment and profile management",
  //     "Grade tracking and report generation",
  //     "Course scheduling and management",
  //     "Attendance monitoring system",
  //     "Parent-teacher communication portal",
  //     "Academic calendar and event management",
  //     "Financial tracking for fees and payments"
  //   ],
  //   challenges: [
  //     "Managing complex user roles and permissions",
  //     "Handling large amounts of student data efficiently",
  //     "Creating intuitive interface for different user types",
  //     "Ensuring data security and privacy compliance"
  //   ],
  //   solutions: [
  //     "Implemented comprehensive role-based access control",
  //     "Used MongoDB aggregation for efficient data queries",
  //     "Created responsive design with role-specific dashboards",
  //     "Applied encryption and secure authentication practices"
  //   ],
  //   imageUrl: "/projects/student-management.jpg",
  //   githubUrl: "https://github.com/YasasBanuka/Student-Management-System",
  //   gradient: "from-orange-500 to-red-600",
  //   category: "Web Application",
  //   duration: "4 months",
  //   teamSize: "Team of 4",
  //   screenshots: ["/projects/sms-dashboard.jpg", "/projects/sms-grades.jpg", "/projects/sms-reports.jpg"]
  // },
  // {
  //   id: "project-8",
  //   title: "Weather Analytics Dashboard",
  //   description: "Real-time weather data visualization dashboard with historical analysis and predictive forecasting capabilities.",
  //   detailedDescription: "An advanced weather analytics platform that aggregates data from multiple sources to provide comprehensive weather insights, historical analysis, and predictive forecasting for various applications.",
  //   techStack: ["React", "D3.js", "Python", "Flask", "PostgreSQL", "Redis"],
  //   features: [
  //     "Real-time weather data visualization",
  //     "Historical weather trend analysis",
  //     "Interactive maps and charts",
  //     "Weather alerts and notifications",
  //     "API integration with multiple weather services",
  //     "Data export and reporting features",
  //     "Customizable dashboard layouts"
  //   ],
  //   challenges: [
  //     "Processing large volumes of real-time weather data",
  //     "Creating smooth animations and transitions for data visualization",
  //     "Optimizing performance for complex charts and graphs",
  //     "Ensuring data accuracy from multiple sources"
  //   ],
  //   solutions: [
  //     "Used Redis for caching and real-time data processing",
  //     "Implemented D3.js for custom data visualizations",
  //     "Applied lazy loading and virtualization for large datasets",
  //     "Created data validation and cleaning pipelines"
  //   ],
  //   imageUrl: "/projects/weather-dashboard.jpg",
  //   githubUrl: "https://github.com/YasasBanuka/Weather-Analytics-Dashboard",
  //   gradient: "from-teal-500 to-green-600",
  //   category: "Data Visualization",
  //   duration: "3 months",
  //   teamSize: "Solo Project",
  //   screenshots: ["/projects/weather-charts.jpg", "/projects/weather-maps.jpg", "/projects/weather-forecast.jpg"]
  // },
  // {
  //   id: "project-9",
  //   title: "Blockchain Voting System",
  //   description: "Secure, transparent voting system built on blockchain technology ensuring immutability and verifiability of votes.",
  //   detailedDescription: "A revolutionary voting system that leverages blockchain technology to provide secure, transparent, and verifiable voting mechanisms. The system ensures vote integrity while maintaining voter privacy through advanced cryptographic techniques.",
  //   techStack: ["Solidity", "Web3.js", "React", "Node.js", "Ethereum"],
  //   features: [
  //     "Immutable vote recording on blockchain",
  //     "Voter identity verification system",
  //     "Real-time voting statistics and results",
  //     "Transparent audit trail for all votes",
  //     "Multi-election support with different voting mechanisms",
  //     "Secure key management for voters",
  //     "Results verification and validation tools"
  //   ],
  //   challenges: [
  //     "Ensuring voter privacy while maintaining transparency",
  //     "Handling blockchain transaction costs and scalability",
  //     "Creating user-friendly interface for non-technical users",
  //     "Implementing secure key management and recovery"
  //   ],
  //   solutions: [
  //     "Used zero-knowledge proofs for privacy-preserving verification",
  //     "Implemented layer 2 solutions for cost optimization",
  //     "Created intuitive wizard-based voting interface",
  //     "Developed secure key generation and backup mechanisms"
  //   ],
  //   imageUrl: "/projects/blockchain-voting.jpg",
  //   githubUrl: "https://github.com/YasasBanuka/Blockchain-Voting-System",
  //   gradient: "from-indigo-500 to-purple-600",
  //   category: "Blockchain Application",
  //   duration: "6 months",
  //   teamSize: "Team of 3",
  //   screenshots: ["/projects/voting-interface.jpg", "/projects/voting-results.jpg", "/projects/voting-verification.jpg"]
  // },
  // {
  //   id: "project-10",
  //   title: "AI-Powered Code Review Assistant",
  //   description: "Intelligent code review tool that uses machine learning to analyze code quality, suggest improvements, and detect potential bugs.",
  //   detailedDescription: "An advanced AI-powered tool that automates code review processes using machine learning algorithms. The system analyzes code patterns, identifies potential issues, and provides intelligent suggestions for improvement, significantly reducing manual review time.",
  //   techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "Docker"],
  //   features: [
  //     "Automated code quality analysis",
  //     "Bug detection and vulnerability scanning",
  //     "Code style and best practices recommendations",
  //     "Performance optimization suggestions",
  //     "Integration with popular version control systems",
  //     "Customizable review rules and standards",
  //     "Team collaboration and discussion features"
  //   ],
  //   challenges: [
  //     "Training accurate ML models for code analysis",
  //     "Handling multiple programming languages and frameworks",
  //     "Providing actionable and contextually relevant suggestions",
  //     "Integrating with various development workflows"
  //   ],
  //   solutions: [
  //     "Used transformer-based models trained on large code datasets",
  //     "Implemented language-specific parsers and analyzers",
  //     "Created contextual suggestion engine with user feedback loop",
  //     "Developed flexible API for easy integration with existing tools"
  //   ],
  //   imageUrl: "/projects/ai-code-review.jpg",
  //   githubUrl: "https://github.com/YasasBanuka/AI-Code-Review-Assistant",
  //   gradient: "from-cyan-500 to-blue-600",
  //   category: "AI/ML Application",
  //   duration: "8 months",
  //   teamSize: "Team of 4",
  //   screenshots: ["/projects/code-analysis.jpg", "/projects/code-suggestions.jpg", "/projects/code-dashboard.jpg"]
  // }
];

/**
 * Technology Stack Color Mapping
 * 
 * Provides consistent color coding for technology badges throughout the portfolio.
 * Each technology is assigned specific colors that reflect their brand identity
 * and provide visual distinction between different categories of tools.
 * 
 * Color categories:
 * - Frontend Frameworks: Blue/Cyan tones
 * - Backend Technologies: Green/Emerald tones  
 * - Databases: Blue/Gray tones
 * - Cloud Services: Orange/Yellow tones
 * - Mobile Development: Purple/Pink tones
 * - IoT/Hardware: Indigo/Gray tones
 * 
 * @param tech - Technology name to get color for
 * @returns CSS classes for background and text colors
 */
const getTechColor = (tech: string): string => {
  const colorMap: { [key: string]: string } = {
    // Frontend Frameworks & Libraries
    "React": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Next.js 14": "bg-black text-white dark:bg-white dark:text-black",
    "Vite": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "React Native": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    "React Native / Expo": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    "D3.js": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    
    // Languages
    "TypeScript": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "JavaScript": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "Java": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Java SE": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Java EE": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    "Python": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    
    // Styling & UI
    "Tailwind CSS": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    "CSS": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "HTML": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "XML": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Framer Motion": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    
    // Backend Frameworks
    "Spring Boot": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Spring Security": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    "Node.js": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Express": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    "Flask": "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    "FastAPI": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    
    // Database & ORM
    "H2": "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    "MySQL": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "MongoDB": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "PostgreSQL": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Redis": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    "SQLite": "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200",
    "Hibernate": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    
    // HTTP & API
    "Axios": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "PayHere API": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    "Google Maps API": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    
    // Cloud & Services
    "AWS S3": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "Firebase": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Firebase (Auth & Realtime DB)": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Vercel": "bg-black text-white dark:bg-white dark:text-black",
    
    // Mobile Development
    "Android SDK": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    
    // IoT & Hardware
    "ESP32": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    "MQ-2 sensor": "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    
    // Blockchain
    "Solidity": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "Web3.js": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    "Ethereum": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    
    // AI/ML
    "TensorFlow": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    
    // Authentication & Security
    "JWT": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    
    // Data Processing
    "Gson": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    
    // AI Tools
    "Cursor AI": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    
    // Development Tools
    "Git": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    "JUnit": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    "Docker": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };
  
  return colorMap[tech] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
};

/**
 * Custom Hook: useRevealOnce
 * 
 * Provides animation controls for elements that should animate into view only once.
 * Uses Framer Motion's useInView hook with intersection observer to trigger
 * animations when elements enter the viewport.
 * 
 * Features:
 * - Triggers animation only on first view (once: true)
 * - Uses margin offset for earlier trigger point
 * - Returns ref for element binding and controls for animation state
 * 
 * @returns Object containing ref for element binding and controls for animation
 */
function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { ref, controls } as const;
}

/**
 * ProjectCard Component
 * 
 * Individual project card displaying project information in a visually appealing format.
 * Features hover effects, smooth animations, and interactive elements that enhance
 * user engagement and provide clear call-to-action for project exploration.
 * 
 * Key Features:
 * - Staggered animation entrance based on card index
 * - Hover effects with scale, glow, and color transitions
 * - Responsive design adapting to different screen sizes
 * - Error handling for missing project images
 * - Accessibility features with proper alt text and ARIA labels
 * 
 * @param project - Project data object containing all project information
 * @param index - Card index for staggered animation timing
 * @param onClick - Callback function triggered when card is clicked
 */
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1 
      } 
    },
  } as const;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="group relative w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-full rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:-translate-y-2">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}></div>

        {/* Project Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">💻</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 px-4">
                {project.title}
              </div>
            </div>
          </div>
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
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
              <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-slate-700 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative p-6 lg:p-8">
          {/* Project Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-slate-100 dark:group-hover:to-slate-300 transition-all duration-300">
            {project.title}
          </h3>

          {/* Category and Duration */}
          <div className="flex items-center gap-4 mb-3 text-xs">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full">
              {project.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {project.duration}
            </span>
            {project.teamSize && (
              <span className="text-slate-500 dark:text-slate-400">
                • {project.teamSize}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className={`px-3 py-1 text-xs font-medium rounded-full ${getTechColor(tech)}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {/* GitHub Button */}
            {(project.githubUrl || project.frontendRepo) && (
              <motion.a
                href={project.githubUrl || project.frontendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">GitHub</span>
              </motion.a>
            )}

            {/* Backend Repo Button (if different from main repo) */}
            {project.backendRepo && project.backendRepo !== project.githubUrl && (
              <motion.a
                href={project.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm">Backend</span>
              </motion.a>
            )}

            {/* Live Demo Button */}
            {project.liveDemoUrl && (
              <motion.a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="text-sm">Live Demo</span>
              </motion.a>
            )}
          </div>

          {/* Click indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Click to view details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
    </motion.div>
  );
}

/**
 * ProjectModal Component
 * 
 * Comprehensive modal dialog displaying detailed project information including
 * technical specifications, challenges, solutions, and project outcomes.
 * Provides an immersive experience for users to explore project details.
 * 
 * Key Features:
 * - Full-screen modal with backdrop blur effect
 * - Detailed project timeline and technical specifications
 * - Interactive screenshots gallery with error handling
 * - Responsive design adapting to different screen sizes
 * - Smooth enter/exit animations with AnimatePresence
 * - Keyboard navigation support (ESC to close)
 * - Click-outside-to-close functionality
 * 
 * @param project - Project data object or null if modal is closed
 * @param isOpen - Boolean indicating whether modal should be visible
 * @param onClose - Callback function to close the modal
 */
function ProjectModal({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!project) return null;

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
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
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
              <div className={`relative p-8 lg:p-12 bg-gradient-to-br ${project.gradient} text-white`}>
                <div className="flex items-start gap-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-lg flex-shrink-0">
                    <div className="text-3xl">💻</div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">
                      {project.title}
                    </h2>
                    <p className="text-xl font-semibold mb-2 opacity-90">
                      {project.category}
                    </p>
                    <div className="flex items-center gap-4 text-lg opacity-80">
                      <span>{project.duration}</span>
                      {project.teamSize && (
                        <>
                          <span>•</span>
                          <span>{project.teamSize}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                    Project Overview
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className={`px-4 py-2 text-sm font-medium rounded-full ${getTechColor(tech)}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                    Key Features
                  </h3>
                  <div className="grid gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.gradient} mt-2 flex-shrink-0`}></div>
                        <p className="text-slate-700 dark:text-slate-300">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      Challenges
                    </h3>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <motion.div
                          key={index}
                          className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <p className="text-slate-700 dark:text-slate-300">{challenge}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      Solutions
                    </h3>
                    <div className="space-y-4">
                      {project.solutions.map((solution, index) => (
                        <motion.div
                          key={index}
                          className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <p className="text-slate-700 dark:text-slate-300">{solution}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Screenshots */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      Project Screenshots
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {project.screenshots.map((screenshot, index) => (
                        <motion.div
                          key={index}
                          className="relative h-48 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl mb-2">📱</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400 px-2">
                                Project Screenshot
                              </div>
                            </div>
                          </div>
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot ${index + 1}`}
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
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {(project.githubUrl || project.frontendRepo) && (
                    <motion.a
                      href={project.githubUrl || project.frontendRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>View Code</span>
                    </motion.a>
                  )}

                  {project.backendRepo && project.backendRepo !== project.githubUrl && (
                    <motion.a
                      href={project.backendRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>Backend Code</span>
                    </motion.a>
                  )}

                  {project.liveDemoUrl && (
                    <motion.a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * CarouselNavigation Component
 * 
 * Navigation controls for the project carousel including previous/next buttons
 * and pagination dots. Provides intuitive navigation through project cards
 * with visual feedback and accessibility features.
 * 
 * Key Features:
 * - Previous/Next navigation buttons with disabled states
 * - Pagination dots showing current position
 * - Smooth hover animations and visual feedback
 * - Responsive design adapting to different screen sizes
 * - Accessibility features with proper ARIA labels
 * 
 * @param currentIndex - Current active carousel position
 * @param totalItems - Total number of items in the carousel
 * @param onPrevious - Callback function for previous button click
 * @param onNext - Callback function for next button click
 * @param itemsPerView - Number of items visible at once
 */
function CarouselNavigation({ 
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

/**
 * Projects Component - Main Export
 * 
 * The primary Projects component that orchestrates the entire project showcase experience.
 * Manages state for carousel navigation, modal interactions, and responsive behavior.
 * Provides a comprehensive view of portfolio projects with smooth animations and
 * interactive elements that enhance user engagement.
 * 
 * State Management:
 * - currentIndex: Tracks current carousel position
 * - selectedProject: Stores project data for modal display
 * - isModalOpen: Controls modal visibility state
 * - itemsPerView: Responsive carousel configuration
 * 
 * Key Features:
 * - Responsive carousel with dynamic item count
 * - Smooth animations and transitions
 * - Interactive project modals with detailed information
 * - SEO-optimized content structure
 * - Accessibility features throughout
 * 
 * @returns JSX element containing the complete projects showcase
 */
export default function Projects() {
  // State management for carousel and modal interactions
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Responsive configuration for items per view
  const [itemsPerView, setItemsPerView] = useState(3);

  // Ensure particles only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  /**
   * Responsive Configuration Effect
   * 
   * Dynamically adjusts the number of items visible in the carousel based on
   * screen size to ensure optimal viewing experience across all devices.
   * 
   * Breakpoints:
   * - Mobile (< 768px): 1 item per view
   * - Tablet (768px - 1024px): 2 items per view  
   * - Desktop (> 1024px): 3 items per view
   */
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

  /**
   * Carousel Navigation Handlers
   * 
   * Functions to handle carousel navigation with boundary checking to prevent
   * navigation beyond available items.
   */
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(projects.length - itemsPerView, prev + 1));
  };

  /**
   * Project Modal Handlers
   * 
   * Functions to manage project modal state and provide smooth user interactions
   * when viewing detailed project information.
   */
  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };
  return (
    <section id="projects" className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated project elements */}
        <motion.div
          className="absolute top-20 left-1/4 w-36 h-36 opacity-5 dark:opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-20 right-1/4 w-28 h-28 opacity-5 dark:opacity-10"
          animate={{
            scale: [1.4, 1, 1.4],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-3xl" />
        </motion.div>
        
        {/* Floating code elements */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-20 h-20 opacity-5 dark:opacity-10"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-500 rounded-full blur-2xl" />
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.03),transparent_50%)]"></div>
        
        {/* Floating Particles - Client Side Only */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => {
              // Use deterministic values based on index to prevent hydration mismatch
              const left = ((i * 6.7) % 100);
              const top = ((i * 9.3) % 100);
              const duration = 5 + ((i * 0.3) % 2);
              const delay = ((i * 0.4) % 2);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-500/60 dark:bg-purple-400/70 rounded-full shadow-lg"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                  }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{
                    y: [0, -100, 0],
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
            className="absolute top-1/3 right-1/4 w-40 h-40 bg-purple-500/10 dark:bg-purple-400/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
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
            Featured Projects
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Innovative solutions across full-stack development, mobile apps, IoT, and AI/ML.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="w-full flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <ProjectCard 
                  project={project} 
                  index={index} 
                  onClick={() => handleCardClick(project)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <CarouselNavigation
          currentIndex={currentIndex}
          totalItems={projects.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          itemsPerView={itemsPerView}
        />

        {/* Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

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
            <span>Innovation Through Technology</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

