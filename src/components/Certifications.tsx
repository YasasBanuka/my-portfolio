"use client";

import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Certification = {
  id: string;
  title: string;
  organization: string;
  description: string;
  icon: string;
  logo: string;
  color: string;
  gradient: string;
  imageUrl: string;
  verificationUrl: string;
  issuedDate: string;
  credentialId?: string;
};

const certifications: Certification[] = [
  {
    id: "cert-1",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    organization: "KodeKloud",
    description: "Validated foundational cloud computing knowledge and Azure services understanding.",
    icon: "☁️",
    logo: "/logos/kodekloud-logo.png",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    imageUrl: "/certificates/AZ900.jpg",
    verificationUrl: "https://learn.kodekloud.com/certificate/f942ef5d-f89f-4cc7-af17-58366e7753c7",
    issuedDate: "Feb 2025",
    credentialId: "f942ef5d-f89f-4cc7-af17-58366e7753c7"
  },
  {
    id: "cert-2",
    title: "Azure 101 - Unlocking the Power of the Cloud",
    organization: "Microsoft Learn Student Ambassadors, Sri Lanka",
    description: "Introduced to Azure fundamentals, services, and practical cloud deployment workflows.",
    icon: "🔷",
    logo: "/logos/mlsa-logo.png",
    color: "blue",
    gradient: "from-blue-500 to-indigo-500",
    imageUrl: "/certificates/azure-101.jpg",
    verificationUrl: "",
    issuedDate: "Jul 2025"
  },
  {
    id: "cert-3",
    title: "Azure OpenAI Services in GitHub Models",
    organization: "Microsoft Learn Student Ambassadors, Sri Lanka",
    description: "Explored Azure OpenAI integration with GitHub Models for modern AI-driven development.",
    icon: "🧠",
    logo: "/logos/mlsa-logo.png",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    imageUrl: "/certificates/azure-openai.jpg",
    verificationUrl: "",
    issuedDate: "Mar 2025"
  },
  {
    id: "cert-4",
    title: "Build an Image Classifier with Azure Custom Vision",
    organization: "Microsoft Learn Student Ambassadors, Sri Lanka",
    description: "Developed an AI-powered image classifier using Azure Custom Vision and DPAPI secure storage.",
    icon: "🤖",
    logo: "/logos/mlsa-logo.png",
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    imageUrl: "/certificates/azure-custom-vision.jpg",
    verificationUrl: "",
    issuedDate: "Jun 2025",
    credentialId: "MSC2025062150"
  },
  {
    id: "cert-5",
    title: "Fundamentals of DevOps",
    organization: "KodeKloud",
    description: "Learned the core principles of CI/CD, automation, and containerized deployment workflows.",
    icon: "⚙️",
    logo: "/logos/kodekloud-logo.png",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
    imageUrl: "/certificates/devops-fundamentals.jpg",
    verificationUrl: "https://learn.kodekloud.com/certificate/8772c139-a794-40fc-a48c-2816b12568f4",
    issuedDate: "Feb 2025",
    credentialId: "8772c139-a794-40fc-a48c-2816b12568f4"
  },
  {
    id: "cert-6",
    title: "DevOps Pre-Requisite Course",
    organization: "KodeKloud",
    description: "Covered DevOps foundations including Linux, Git, and automation basics.",
    icon: "🧩",
    logo: "/logos/kodekloud-logo.png",
    color: "teal",
    gradient: "from-teal-500 to-green-500",
    imageUrl: "/certificates/devops-prereq.jpg",
    verificationUrl: "https://learn.kodekloud.com/certificate/695e1bdf-7edf-42ed-8cc2-106aa1f38cd7",
    issuedDate: "Feb 2025",
    credentialId: "695e1bdf-7edf-42ed-8cc2-106aa1f38cd7"
  },
  {
    id: "cert-7",
    title: "12 Factor App",
    organization: "KodeKloud",
    description: "Mastered 12-factor app methodology for building scalable, cloud-native applications.",
    icon: "🏗️",
    logo: "/logos/kodekloud-logo.png",
    color: "amber",
    gradient: "from-amber-500 to-yellow-500",
    imageUrl: "/certificates/12factor.jpg",
    verificationUrl: "https://learn.kodekloud.com/certificate/9bde3365-4de7-446c-8a34-f856ddaf943f",
    issuedDate: "Feb 2025",
    credentialId: "9bde3365-4de7-446c-8a34-f856ddaf943f"
  },
  {
    id: "cert-8",
    title: "Learning Linux Basics Course & Labs",
    organization: "KodeKloud",
    description: "Gained practical Linux experience, file system management, and shell scripting knowledge.",
    icon: "🐧",
    logo: "/logos/kodekloud-logo.png",
    color: "gray",
    gradient: "from-gray-500 to-slate-500",
    imageUrl: "/certificates/linux-basics.jpg",
    verificationUrl: "https://learn.kodekloud.com/certificate/f82ba6e0-c79d-40c9-951a-be9fadcfaeb6",
    issuedDate: "Feb 2025",
    credentialId: "f82ba6e0-c79d-40c9-951a-be9fadcfaeb6"
  },
  {
    id: "cert-9",
    title: "Postman API Fundamentals Student Expert",
    organization: "Postman",
    description: "Certified in API testing, environment setup, and request automation with Postman.",
    icon: "📡",
    logo: "/logos/postman.webp",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    imageUrl: "/certificates/postman.jpg",
    verificationUrl: "https://badgr.com/public/assertions/BDpZVSqFRY67yUTlaihvRw?identity__email=ybanuka2003%40gmail.com",
    issuedDate: "Feb 2025",
    credentialId: "67ae42475e30cd4f64d294da"
  },
  {
    id: "cert-10",
    title: "GenAI 101 with Pieces",
    organization: "Pieces",
    description: "Explored fundamentals of generative AI tools and prompt engineering workflows.",
    icon: "💡",
    logo: "/logos/pieces-logo.png",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    imageUrl: "/certificates/genai-101.jpg",
    verificationUrl: "https://badgr.com/public/assertions/tRUiHUAsSKGs_U7w_Cnq5g?identity__email=ybanuka2003@gmail.com",
    issuedDate: "Feb 2025",
    credentialId: "67aed9e5157e9b171a2af6e4"
  },
  {
    id: "cert-11",
    title: "Advanced React",
    organization: "Meta",
    description: "Mastered hooks, context, routing, and testing for scalable React applications.",
    icon: "⚛️",
    logo: "/logos/meta-logo.png",
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
    imageUrl: "/certificates/advanced-react.jpg",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/HVC9FTYHHY5S",
    issuedDate: "May 2024",
    credentialId: "HVC9FTYHHY5S"
  },
  {
    id: "cert-12",
    title: "React Basics",
    organization: "Meta",
    description: "Learned React fundamentals; components, JSX, state, and props for dynamic web apps.",
    icon: "⚛️",
    logo: "/logos/meta-logo.png",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    imageUrl: "/certificates/react-basics.jpg",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/HY6VLSSE4ZCE",
    issuedDate: "May 2024",
    credentialId: "HY6VLSSE4ZCE"
  },
  {
    id: "cert-13",
    title: "Principles of UX/UI Design",
    organization: "Meta",
    description: "Learned user-centered design, prototyping, and usability testing with Figma.",
    icon: "🎨",
    logo: "/logos/meta-logo.png",
    color: "rose",
    gradient: "from-rose-500 to-pink-500",
    imageUrl: "/certificates/uxui-meta.jpg",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/TR43HLD1J1Q8",
    issuedDate: "Oct 2024",
    credentialId: "TR43HLD1J1Q8"
  },
  {
    id: "cert-14",
    title: "Neuro Selling Accelerator Certification",
    organization: "Inotrend Int.",
    description: "Explored human psychology and persuasive communication in digital product contexts.",
    icon: "🧠",
    logo: "/logos/inotrend-logo.png",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    imageUrl: "/certificates/neuro-selling.jpg",
    verificationUrl: "https://inotrend.net/ht5ee7es0t.html",
    issuedDate: "Feb 2024",
    credentialId: "ht5ee7es0t"
  },
  {
    id: "cert-15",
    title: "SLIM Brand Management Certificate",
    organization: "Sri Lanka Institute of Marketing (SLIM)",
    description: "Awarded for dedication and contribution during the Brand Management workshop.",
    icon: "🏅",
    logo: "/logos/slim-logo.png",
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
    imageUrl: "/certificates/slim-brand.jpg",
    verificationUrl: "",
    issuedDate: "Dec 2023",
    credentialId: "SN:30305"
  },
  {
    id: "cert-16",
    title: "Smart School Certificate",
    organization: "Ministry of Education - Sri Lanka",
    description: "Recognized for exceptional service as a trainer in a robotics and IoT workshop.",
    icon: "🤖",
    logo: "/logos/ministry-education-logo.png",
    color: "indigo",
    gradient: "from-indigo-500 to-blue-500",
    imageUrl: "/certificates/smart-school.jpg",
    verificationUrl: "",
    issuedDate: "Jan 2018"
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

// Carousel Card Component
function CertificationCard({ certification, index }: { certification: Certification; index: number }) {
  const { ref, controls } = useRevealOnce<HTMLDivElement>();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
      className="group relative w-full max-w-sm mx-auto cursor-pointer"
    >
      <div className="relative h-full rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-2">
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${certification.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${certification.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10`}></div>

        {/* Certificate Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
            {isImageLoading && (
              <div className="animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{certification.icon}</span>
                </div>
              </div>
            )}
          </div>
          <Image
            src={certification.imageUrl}
            alt={`${certification.title} Certificate`}
            fill
            className={`object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
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
          {/* Icon and organization badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-xl bg-white dark:bg-slate-100 shadow-lg overflow-hidden border border-slate-200 dark:border-slate-300">
              <Image
                src={certification.logo}
                alt={`${certification.organization} logo`}
                width={56}
                height={56}
                className="object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-xl lg:text-2xl" aria-hidden>${certification.icon}</span>`;
                  }
                }}
              />
            </div>
            <div className="flex-1 ml-4">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Certification
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                {certification.issuedDate}
              </div>
            </div>
          </div>

          {/* Certification title */}
          <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-600 dark:group-hover:from-slate-100 dark:group-hover:to-slate-300 transition-all duration-300">
            {certification.title}
          </h3>

          {/* Organization */}
          <p className="text-sm lg:text-base font-semibold text-slate-600 dark:text-slate-300 mb-4">
            {certification.organization}
          </p>

          {/* Description */}
          <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {certification.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${certification.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
    </motion.div>
  );
}

// Modal Component
function CertificationModal({ 
  certification, 
  isOpen, 
  onClose 
}: { 
  certification: Certification | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!certification) return null;

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
            className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                <Image
                  src={certification.imageUrl}
                  alt={`${certification.title} Certificate`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-100 shadow-lg overflow-hidden border border-slate-200 dark:border-slate-300">
                    <Image
                      src={certification.logo}
                      alt={`${certification.organization} logo`}
                      width={48}
                      height={48}
                      className="object-contain p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-2xl" aria-hidden>${certification.icon}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Certification
                    </div>
                    <div className="text-sm text-slate-400 dark:text-slate-500">
                      {certification.issuedDate}
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                  {certification.title}
                </h2>

                <p className="text-lg font-semibold text-slate-600 dark:text-slate-300 mb-6">
                  {certification.organization}
                </p>

                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  {certification.description}
                </p>

                {certification.credentialId && (
                  <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Credential ID
                    </div>
                    <div className="text-sm font-mono text-slate-700 dark:text-slate-300">
                      {certification.credentialId}
                    </div>
                  </div>
                )}

                {/* Verification Button */}
                <motion.a
                  href={certification.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Verify Certificate
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Carousel Navigation Component
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

export default function Certifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);

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
    setCurrentIndex(prev => Math.min(certifications.length - itemsPerView, prev + 1));
  };

  const handleCardClick = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCertification(null), 300);
  };

  return (
    <section id="certifications" className="relative min-h-screen flex items-center py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      
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
            Certifications & Achievements
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Industry-recognized certifications in cloud computing, DevOps, and web technologies.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {certifications.map((certification, index) => (
              <div
                key={certification.id}
                className="w-full flex-shrink-0 px-4"
                style={{ width: `${100 / itemsPerView}%` }}
                onClick={() => handleCardClick(certification)}
              >
                <CertificationCard certification={certification} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation */}
        <CarouselNavigation
          currentIndex={currentIndex}
          totalItems={certifications.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          itemsPerView={itemsPerView}
        />

        {/* Modal */}
        <CertificationModal
          certification={selectedCertification}
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
            <span>Always Learning & Growing</span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-slate-300 dark:to-slate-600"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}