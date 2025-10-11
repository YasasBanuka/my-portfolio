import Hero from '@/components/Hero';
import AboutMe from '@/components/AboutMe';
import TechnicalSkills from '@/components/TechnicalSkills';
import LeadershipVolunteering from '@/components/LeadershipVolunteering';
import Projects from '@/components/Projects';
import EducationTimeline from '@/components/EducationTimeline';
import ProfessionalExperienceTimeline from '@/components/ProfessionalExperienceTimeline';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutMe />
      <TechnicalSkills />
      <LeadershipVolunteering />
      <Projects />
      <ProfessionalExperienceTimeline />
      <EducationTimeline />
      <Certifications />
      <Contact />
    </main>
  );
}
