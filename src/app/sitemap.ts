/**
 * Sitemap Configuration
 * 
 * Generates a dynamic sitemap for search engine optimization.
 * Includes all main pages and sections of the portfolio website
 * with proper priority and change frequency settings.
 */

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iamyasasbanuka.me'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}
