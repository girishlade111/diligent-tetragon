export type ProjectCategory = 'Brand' | 'Web' | 'Editorial' | 'Product';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  frameCode: string;
  frameNumber: string;
  takeNumber: number;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  subcategory: string;
  categoryLabel: string;
  role: string;
  teamSize: string;
  outcomeShort: string;
  summary: string;
  brief: string[];
  contributions: string[];
  designLabel: string;
  codeLanguage: string;
  codeSnippet: string;
  resultSummary: string;
  metrics: ProjectMetric[];
  heroImage: string;
  heroAlt: string;
  aspectRatio: string;
  relatedSlugs: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  nextSlug: string;
  seoTitle: string;
  seoDescription: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  index: string;
  takeNumber: number;
  gelNumber: string;
  gelColor: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverablesIntro: string;
  deliverables: string[];
  heroImage: string;
  relatedProjectSlugs: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export type LabCategory =
  | 'Experiment'
  | 'Side project'
  | 'Open source'
  | 'Concept'
  | 'Resource';

export interface LabExperiment {
  id: string;
  slug: string;
  frameCode: string;
  index: string;
  takeNumber: number;
  category: LabCategory;
  year: string;
  tools: string[];
  title: string;
  tagline: string;
  heroImage: string;
  demoUrl: string;
  sourceUrl: string;
  ideaParagraphs: string[];
  buildIntro: string;
  buildBullets: string[];
  codeSnippet: string;
  learnedIntro: string;
  learnedBullets: string[];
  pullQuote: string;
}

export type WritingCategory = 'Process' | 'Systems' | 'Notes' | 'Craft';

export interface WritingArticle {
  id: string;
  slug: string;
  index: string;
  takeNumber: number;
  title: string;
  category: WritingCategory;
  date: string;
  readingTime: string;
  excerpt: string;
  featured?: boolean;
  coverImage: string;
  coverCaption: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: { lead?: string; text: string }[];
    pullQuote?: string;
  }[];
}

export interface TestimonialItem {
  id: string;
  index: string;
  clientLabel: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rotation: string;
  tapeRotation: string;
}

export interface TimelineEvent {
  year: string;
  frameCode: string;
  title: string;
  image: string;
}

export interface BookingTicket {
  id: string;
  number: string;
  date: string;
  admitLabel: string;
  queryValue: string;
}
