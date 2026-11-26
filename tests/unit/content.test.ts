import { describe, expect, it } from 'vitest';
import { ARTICLES } from '@/content/articles';
import { BOOKING_TICKETS, WORKFLOW_STAGES } from '@/content/booking';
import { EXPERIMENTS } from '@/content/experiments';
import { PRIVACY_SECTIONS, TERMS_SECTIONS } from '@/content/legal';
import { PROJECTS } from '@/content/projects';
import { RESUME_EXPERIENCE } from '@/content/resume';
import { SERVICES } from '@/content/services';
import { TESTIMONIALS } from '@/content/testimonials';
import { TIMELINE_EVENTS } from '@/content/timeline';
import { TOOLKIT_ITEMS } from '@/content/tools';
import { USES_GROUPS } from '@/content/uses';

describe('Portfolio content integrity', () => {
  it('contains all 8 portfolio case studies with valid slugs and metrics', () => {
    expect(PROJECTS).toHaveLength(8);
    const slugs = new Set(PROJECTS.map((p) => p.slug));
    expect(slugs.size).toBe(8);
    for (const project of PROJECTS) {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.metrics).toHaveLength(3);
      expect(project.heroImage).toMatch(/^\/assets\//);
    }
  });

  it('contains all 4 services with 5 deliverables and 3 FAQs each', () => {
    expect(SERVICES).toHaveLength(4);
    for (const svc of SERVICES) {
      expect(svc.deliverables).toHaveLength(5);
      expect(svc.faqs).toHaveLength(3);
      expect(svc.gelColor).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it('contains all 6 lab experiments and 6 writing articles', () => {
    expect(EXPERIMENTS).toHaveLength(6);
    expect(ARTICLES).toHaveLength(6);
    for (const exp of EXPERIMENTS) {
      expect(exp.codeSnippet.length).toBeGreaterThan(20);
    }
    for (const art of ARTICLES) {
      expect(art.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('contains exact toolkit (12), testimonials (5), timeline (6), uses (16), resume (4), legal & booking', () => {
    expect(TOOLKIT_ITEMS).toHaveLength(12);
    expect(TESTIMONIALS).toHaveLength(5);
    expect(TIMELINE_EVENTS).toHaveLength(6);
    expect(RESUME_EXPERIENCE).toHaveLength(4);
    expect(WORKFLOW_STAGES).toHaveLength(4);
    expect(BOOKING_TICKETS).toHaveLength(3);
    expect(PRIVACY_SECTIONS).toHaveLength(9);
    expect(TERMS_SECTIONS).toHaveLength(10);
    const totalUses = USES_GROUPS.reduce((sum, g) => sum + g.items.length, 0);
    expect(totalUses).toBe(16);
  });
});
