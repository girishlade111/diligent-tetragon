export interface ResumeExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  summary: string;
  highlights: string[];
  defaultExpanded?: boolean;
}

export const RESUME_PROFILE =
  'Product designer and front-end developer with 9 years of shipping web and mobile products. I take work from research and flows to a production-ready design system in React, so the thing that ships is the thing we designed. Based in Berlin, working with teams in Europe and the US.';

export const RESUME_EXPERIENCE: ResumeExperienceItem[] = [
  {
    id: 'mara-voss-studio',
    period: '2023 — now',
    role: 'Independent product designer & developer',
    company: 'Mara Voss Studio',
    summary: 'Product design and front-end for startups and brands in Europe and the US.',
    highlights: [
      'Designed and built 14 product UIs and marketing sites for seed to Series B teams',
      'Set up Figma-to-React design systems that client teams now run on their own',
      'Average project from kickoff to launch: 7 weeks',
    ],
    defaultExpanded: true,
  },
  {
    id: 'loop-bank',
    period: '2020 — 2023',
    role: 'Lead product designer',
    company: 'Loop Bank',
    summary: 'Led design of the mobile app from beta to 1.2M users.',
    highlights: [
      'Took the mobile app from private beta to 1.2M users and a 4.7 App Store rating',
      'Led a team of four designers and ran weekly critique with engineering',
      'Cut onboarding drop-off by 38% with a rebuilt identity check flow',
    ],
    defaultExpanded: false,
  },
  {
    id: 'pulse-analytics',
    period: '2018 — 2020',
    role: 'Design engineer',
    company: 'Pulse Analytics',
    summary: 'Built the design system in Figma and React.',
    highlights: [
      'Built the Pulse UI kit: 140 React components documented in Storybook',
      'Shipped the dashboard redesign used by 3,000 companies',
      'Introduced design tokens shared by web and iOS',
    ],
    defaultExpanded: false,
  },
  {
    id: 'studio-north',
    period: '2016 — 2018',
    role: 'Designer',
    company: 'Studio North',
    summary: 'Brand and web projects for cultural clients.',
    highlights: [
      'Brand and web projects for museums, festivals and publishers',
      'First production front-end work: HTML, CSS and a lot of GSAP',
    ],
    defaultExpanded: false,
  },
];

export const RESUME_SKILLS = {
  design: [
    'Product strategy',
    'UX research',
    'Interaction design',
    'Design systems',
    'Prototyping',
    'Motion design',
  ],
  code: [
    'React & Next.js',
    'TypeScript',
    'CSS & Tailwind',
    'Framer Motion & GSAP',
    'Accessibility (WCAG 2.2)',
    'Storybook & testing',
  ],
  tools: ['Figma', 'Framer', 'Rive', 'VS Code', 'Git', 'Linear', 'Notion'],
};

export const RESUME_EDUCATION = [
  {
    period: '2012 — 2016',
    degree: 'BA Interaction Design',
    school: 'HfG Schwäbisch Gmünd',
    note: 'Thesis on motion in interfaces.',
  },
];

export const RESUME_AWARDS = [
  {
    year: '2024',
    title: 'Site of the Day',
    organization: 'Webcraft Awards',
    note: 'For the Atlas docs site.',
  },
];

export const RESUME_LANGUAGES = [
  { name: 'German', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Spanish', level: 'Conversational' },
];
