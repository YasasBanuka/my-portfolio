import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';

// Dynamically import components lower down the page to improve initial load time
const TechnicalSkills = dynamic(() => import('@/components/TechnicalSkills'), { ssr: true });
const LeadershipVolunteering = dynamic(() => import('@/components/LeadershipVolunteering'), { ssr: true });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true });
const EducationTimeline = dynamic(() => import('@/components/EducationTimeline'), { ssr: true });
const ProfessionalExperienceTimeline = dynamic(() => import('@/components/ProfessionalExperienceTimeline'), { ssr: true });
const Certifications = dynamic(() => import('@/components/Certifications'), { ssr: true });
const Blog = dynamic(() => import('@/components/Blog'), { ssr: true });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true });

/**
 * Home Page Component
 * 
 * Main landing page for Yasas Banuka's portfolio website.
 * Optimized for SEO with comprehensive content about software engineering,
 * cloud computing, and community leadership experience in Sri Lanka.
 * 
 * SEO Features:
 * - Structured content hierarchy
 * - Keyword-rich content sections
 * - Local SEO optimization for Sri Lanka
 * - Comprehensive portfolio showcase
 */

export default function Home() {
  return (
    <>
      {/* Hidden SEO content for search engines */}
      <div className="sr-only">
        <h1>Yasas Banuka - Software Engineer & Community Leader from Sri Lanka</h1>
        <p>
          Yasas Banuka is a passionate software engineer and community leader based in Sri Lanka,
          specializing in full-stack development, cloud computing, and innovative solutions.
          As a volunteer and University of Vocational Technology graduate, Yasas builds
          scalable applications while mentoring developers and organizing tech events.
        </p>
        <p>
          Explore Yasas Banuka&apos;s portfolio featuring React.js projects, Java Spring Boot
          applications, Azure cloud solutions, and IoT innovations. Connect with this
          Sri Lankan software engineer for collaboration opportunities.
        </p>
      </div>

      <Navigation />
      <main id="main-content" className="relative">
        <Hero />
        <AboutMe />
        <TechnicalSkills />
        <Projects />
        <ProfessionalExperienceTimeline />
        <EducationTimeline />
        <LeadershipVolunteering />
        <Certifications />
        {/* <Testimonials /> */}
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
