/**
 * Robots.txt Configuration
 * 
 * Provides instructions to web crawlers about which pages
 * can be accessed and indexed. Optimized for SEO with
 * proper sitemap references and crawl directives.
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/static/chunks/',
        '/_next/static/css/',
        '/_next/static/js/',
        '/private/',
        '/*.json$',
        '/*.ico$',
        '/*.svg$',
        '/*.png$',
        '/*.jpg$',
        '/*.jpeg$',
        '/*.gif$',
        '/*.webp$',
        '/*.pdf$',
      ],
    },
    sitemap: 'https://iamyasasbanuka.me/sitemap.xml',
  }
}
