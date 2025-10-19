import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechnicalSkills from '@/components/TechnicalSkills';
import LeadershipVolunteering from '@/components/LeadershipVolunteering';
import Projects from '@/components/Projects';
import EducationTimeline from '@/components/EducationTimeline';
import ProfessionalExperienceTimeline from '@/components/ProfessionalExperienceTimeline';
import Certifications from '@/components/Certifications';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

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
          As an IEEE volunteer and University of Vocational Technology graduate, Yasas builds 
          scalable applications while mentoring developers and organizing tech events.
        </p>
        <p>
          Explore Yasas Banuka&apos;s portfolio featuring React.js projects, Java Spring Boot 
          applications, Azure cloud solutions, and IoT innovations. Connect with this 
          Sri Lankan software engineer for collaboration opportunities.
        </p>
      </div>
      
      <Navigation />
      <main className="relative">
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
