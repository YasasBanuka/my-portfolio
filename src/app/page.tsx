import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechnicalSkills from '@/components/TechnicalSkills';
import LeadershipVolunteering from '@/components/LeadershipVolunteering';
import Projects from '@/components/Projects';
import EducationTimeline from '@/components/EducationTimeline';
import ProfessionalExperienceTimeline from '@/components/ProfessionalExperienceTimeline';
import Certifications from '@/components/Certifications';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <Hero />
        <AboutMe />
        <TechnicalSkills />
        <LeadershipVolunteering />
        <Projects />
        <ProfessionalExperienceTimeline />
        <EducationTimeline />
        <Certifications />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
