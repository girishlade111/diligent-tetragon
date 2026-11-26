import { ASSETS } from './assets';
import type { ServiceItem } from '@/types/portfolio';

export const SERVICES: ServiceItem[] = [
  {
    id: 'product-design',
    slug: 'product-design',
    index: '01',
    takeNumber: 17,
    gelNumber: '01',
    gelColor: '#FF5A3C',
    title: 'Product design',
    shortDesc: 'Apps and web products from first sketch to shipped release.',
    fullDesc:
      'I map the problem with you, sketch the flows, test them with real people and design every screen down to the empty states.',
    deliverablesIntro:
      'Every project ends with these files in your hands, in this order. Nothing stays in my drafts.',
    deliverables: [
      'User flows',
      'Wireframes',
      'Hi-fi screens',
      'Clickable prototype',
      'Usability tests',
    ],
    heroImage: ASSETS.services.productDesign,
    relatedProjectSlugs: ['rouge-packaging', 'loop-banking-app'],
    faqs: [
      {
        question: 'How much does it cost?',
        answer:
          'Most product projects land between €12k and €40k. After a first call you get a fixed quote with scope, timeline and price.',
      },
      {
        question: 'Do you run the user tests?',
        answer:
          'Yes. I recruit five people from your audience, run the sessions and send you the clips with a short list of what to fix.',
      },
      {
        question: 'What do you need from us?',
        answer:
          'One person who can make decisions, access to your analytics and an hour a week for the Friday review.',
      },
    ],
  },
  {
    id: 'design-systems',
    slug: 'design-systems',
    index: '02',
    takeNumber: 18,
    gelNumber: '02',
    gelColor: '#FFC94A',
    title: 'Design systems',
    shortDesc: 'One set of components your team designs and builds with.',
    fullDesc:
      'Tokens, components and documentation that live in Figma and in code, so design and engineering stop drifting apart.',
    deliverablesIntro:
      'You leave with a system your team can run without me: tokens, components and the docs that explain them.',
    deliverables: [
      'Tokens',
      'Figma library',
      'React components',
      'Docs site',
      'Handover',
    ],
    heroImage: ASSETS.services.designSystems,
    relatedProjectSlugs: ['print-colour-system', 'pulse-dashboard'],
    faqs: [
      {
        question: 'Can you start from our existing UI?',
        answer:
          'That is the usual start. I audit what you already ship, keep what works and give it proper names.',
      },
      {
        question: 'Figma only, or code too?',
        answer:
          'Both. Every token and component exists in Figma and in React, published from one source.',
      },
      {
        question: 'How long does it take?',
        answer:
          'A first usable version in four to six weeks. After that it grows with your product, not ahead of it.',
      },
    ],
  },
  {
    id: 'front-end-development',
    slug: 'front-end-development',
    index: '03',
    takeNumber: 19,
    gelNumber: '03',
    gelColor: '#3DDC97',
    title: 'Front-end development',
    shortDesc: 'I build what I design, in React, Next.js and Framer.',
    fullDesc:
      'Fast, accessible front-ends with the motion and detail the design promised, shipped to production and handed over clean.',
    deliverablesIntro:
      'Production code, not a prototype: typed, tested, accessible and handed over in your repository.',
    deliverables: [
      'React / Next.js',
      'Framer sites',
      'Animations',
      'Accessibility',
      'Performance',
    ],
    heroImage: ASSETS.services.frontendDev,
    relatedProjectSlugs: ['sole-campaign', 'atlas-dev-platform'],
    faqs: [
      {
        question: 'Which stack do you use?',
        answer:
          'React and Next.js for products, Framer for marketing sites. If you already have a stack, I work in yours.',
      },
      {
        question: 'Do you work with our developers?',
        answer:
          'Yes. I open pull requests in your repo, follow your review process and pair with your team when it helps.',
      },
      {
        question: 'What about speed and accessibility?',
        answer:
          'Every page is checked against Core Web Vitals and WCAG 2.2 AA before it ships, not after.',
      },
    ],
  },
  {
    id: 'brand-and-web',
    slug: 'brand-and-web',
    index: '04',
    takeNumber: 20,
    gelNumber: '04',
    gelColor: '#6C8CFF',
    title: 'Brand & web',
    shortDesc: 'Identity and a website that launches with it.',
    fullDesc:
      'Logo, type, colour and a launch site that carries them, for founders who need to look ready on day one.',
    deliverablesIntro:
      'A brand you can use from day one and a site that launches with it, all in files you own.',
    deliverables: [
      'Logo',
      'Type & colour',
      'Brand guide',
      'Launch website',
      'Social kit',
    ],
    heroImage: ASSETS.services.brandAndWeb,
    relatedProjectSlugs: ['nord-brand-identity', 'type-poster-series'],
    faqs: [
      {
        question: 'How many logo routes do I see?',
        answer:
          'Three directions in week one. We pick one and refine it together until it feels right.',
      },
      {
        question: 'Can I edit the website myself?',
        answer:
          'Yes. The site is built in Framer, so you change text, images and pages without a developer.',
      },
      {
        question: 'What if I only need a logo?',
        answer:
          'Then we run the identity sprint on its own: logo, type, colour and a one-page guide, in two weeks.',
      },
    ],
  },
];

export const RATE_CARD = [
  { number: '01', title: 'Project', note: 'Fixed scope and price' },
  { number: '02', title: 'Retainer', note: '2–4 days a month' },
  { number: '03', title: 'Sprint', note: 'One week, one problem' },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((item) => item.slug === slug);
}
