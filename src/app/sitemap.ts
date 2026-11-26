import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { ARTICLES } from '@/content/articles';
import { EXPERIMENTS } from '@/content/experiments';
import { PROJECTS } from '@/content/projects';
import { SERVICES } from '@/content/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const now = new Date('2026-11-26T00:00:00.000Z');

  const staticRoutes = [
    '',
    '/work',
    '/about',
    '/resume',
    '/services',
    '/lab',
    '/writing',
    '/uses',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${base}${route || '/'}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = PROJECTS.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const labRoutes = EXPERIMENTS.map((l) => ({
    url: `${base}/lab/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const writingRoutes = ARTICLES.map((a) => ({
    url: `${base}/writing/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...serviceRoutes,
    ...labRoutes,
    ...writingRoutes,
  ];
}
