import fs from 'fs';
import path from 'path';
import { getChapters, getChapterProblems } from './markdown';

const SITE_URL = process.env.SITE_URL || 'https://mastering-dsa.vercel.app';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemap(): string {
  const entries: SitemapEntry[] = [];

  // Home page
  entries.push({
    url: `${SITE_URL}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  });

  // Chapters
  const chapters = getChapters();
  chapters.forEach((chapter) => {
    entries.push({
      url: `${SITE_URL}${chapter.path}`,
      changefreq: 'weekly',
      priority: 0.8,
    });

    // Problems in chapters
    const problems = getChapterProblems(chapter.slug);
    problems.forEach((problem) => {
      entries.push({
        url: `${SITE_URL}${problem.path}`,
        changefreq: 'weekly',
        priority: 0.7,
      });
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach((entry) => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority) {
      xml += `    <priority>${entry.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

export function generateRobotsTxt(): string {
  return `# Robots.txt for Mastering DSA
User-agent: *
Allow: /
Allow: /sitemap.xml

Disallow: /_next/
Disallow: /api/

# Crawl-delay for respect
Crawl-delay: 1

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Additional user agents
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}
