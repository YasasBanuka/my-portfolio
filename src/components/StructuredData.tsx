/**
 * Structured Data Component
 * 
 * Provides JSON-LD structured data markup for better search engine
 * understanding and rich snippets in search results. Includes
 * Person schema, Organization schema, and Portfolio schema.
 */

import Script from 'next/script';

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Yasas Banuka",
    "alternateName": "Yasas",
    "description": "Software & Network Engineering student specializing in full-stack development, cloud computing, and community leadership. IEEE volunteer, student influencer, and passionate problem-solver building scalable solutions.",
    "url": "https://iamyasasbanuka.me",
    "image": "https://iamyasasbanuka.me/images/about/yasas-banuka-professional-headshot-square.jpg",
    "sameAs": [
      "https://linkedin.com/in/yasasbanuka",
      "https://github.com/YasasBanuka",
      "https://twitter.com/yasasbanuka"
    ],
    "jobTitle": "Software Engineer & Student Leader",
    "worksFor": {
      "@type": "Organization",
      "name": "University of Vocational Technology"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Vocational Technology"
    },
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Development",
      "Cloud Computing",
      "Network Engineering",
      "React.js",
      "Java Spring Boot",
      "Azure Cloud",
      "DevOps",
      "Mobile Development",
      "IoT Projects"
    ],
    "award": [
      "IEEE Volunteer of the Month",
      "Microsoft Azure Fundamentals (AZ-900)",
      "DevOps Fundamentals Certification",
      "Advanced React Development Certificate"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "IEEE Student Branch of University of Vocational Technology"
      },
      {
        "@type": "Organization", 
        "name": "Leo Club of Colombo Grand Circle"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK",
      "addressRegion": "Sri Lanka"
    },
    "nationality": "Sri Lankan"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Yasas Banuka Portfolio",
    "alternateName": "iamyasasbanuka.me",
    "url": "https://iamyasasbanuka.me",
    "description": "Professional portfolio showcasing software engineering projects, certifications, and community leadership experience.",
    "author": {
      "@type": "Person",
      "name": "Yasas Banuka"
    },
    "inLanguage": "en-US",
    "copyrightYear": "2025",
    "genre": "Portfolio Website"
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Yasas Banuka Software Engineering Portfolio",
    "description": "Comprehensive portfolio showcasing full-stack development projects, cloud computing expertise, and community leadership initiatives.",
    "creator": {
      "@type": "Person",
      "name": "Yasas Banuka"
    },
    "dateCreated": "2025",
    "dateModified": new Date().toISOString().split('T')[0],
    "url": "https://iamyasasbanuka.me",
    "keywords": [
      "Software Engineer",
      "Full Stack Developer",
      "Cloud Computing",
      "React.js",
      "Java Spring Boot",
      "Azure Cloud",
      "DevOps",
      "Mobile Development",
      "IoT Projects",
      "Sri Lanka Developer"
    ]
  };

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema)
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema)
        }}
      />
    </>
  );
}
