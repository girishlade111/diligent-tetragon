import { ASSETS } from './assets';
import type { WritingArticle } from '@/types/portfolio';

export const ARTICLES: WritingArticle[] = [
  {
    id: 'design-in-the-browser',
    slug: 'design-in-the-browser',
    index: '01',
    takeNumber: 27,
    title: 'Why I design in the browser now',
    category: 'Process',
    date: 'Sep 2026',
    readingTime: '6 min',
    excerpt: 'Figma is where I think. The browser is where I decide.',
    featured: true,
    coverImage: ASSETS.writing.designInTheBrowser,
    coverCaption: 'Fig. 01 — Process',
    sections: [
      {
        heading: 'Figma is for thinking',
        paragraphs: [
          'I still start every project in Figma. It is the fastest place to try ten layouts and throw nine away. But a layout is a guess about behaviour, and Figma is bad at behaviour.',
        ],
      },
      {
        heading: 'The browser is for deciding',
        paragraphs: [
          'Loading states, long names, a slow network, a keyboard user — none of that shows up in a frame. So once a flow feels right on paper, I build a rough version in the browser and make the real decisions there.',
        ],
        bullets: [
          { text: 'Build the ugly version first, with real data' },
          { text: 'Decide spacing and motion where they will live' },
          { text: 'Bring the finished details back into the design file' },
        ],
        pullQuote: 'A frame shows how it looks. A build shows how it feels.',
      },
      {
        heading: 'What changed',
        paragraphs: [
          'Reviews got shorter. Instead of arguing over a static screen, the team clicks through the thing and points at what is wrong. Fewer opinions, more fixes.',
        ],
      },
    ],
  },
  {
    id: 'design-system-that-sticks',
    slug: 'design-system-that-sticks',
    index: '02',
    takeNumber: 28,
    title: 'A design system that people actually use',
    category: 'Systems',
    date: 'Jul 2026',
    readingTime: '8 min',
    excerpt: 'Four rules from building one for 40 engineers.',
    coverImage: ASSETS.writing.designSystemThatSticks,
    coverCaption: 'Fig. 02 — Systems',
    sections: [
      {
        heading: 'Start with what already exists',
        paragraphs: [
          'The system I built for a team of 40 engineers began as an audit, not a library. We printed every button in the product. There were 31 of them.',
        ],
      },
      {
        heading: 'Four rules',
        paragraphs: [],
        bullets: [
          {
            lead: 'Tokens before components.',
            text: 'Colour, type and spacing first, so everything else has something to stand on.',
          },
          {
            lead: 'Only what is used twice.',
            text: 'A component joins the system when two teams need it, not before.',
          },
          {
            lead: 'Names a developer can guess.',
            text: 'If you have to look a token up, it has the wrong name.',
          },
          {
            lead: 'One owner.',
            text: 'Someone answers for the system every week, or nobody does.',
          },
        ],
        pullQuote: 'A design system is a product. Its users are your own team.',
      },
      {
        heading: 'What it took',
        paragraphs: [
          'Six months, one designer and one engineer part-time. The button count went from 31 to four, and new screens now take days instead of weeks.',
        ],
      },
    ],
  },
  {
    id: 'freelance-year-three',
    slug: 'freelance-year-three',
    index: '03',
    takeNumber: 29,
    title: 'Year three as an independent',
    category: 'Notes',
    date: 'May 2026',
    readingTime: '5 min',
    excerpt: 'Pricing, saying no, and the clients who stayed.',
    coverImage: ASSETS.writing.freelanceYearThree,
    coverCaption: 'Fig. 03 — Notes',
    sections: [
      {
        heading: 'Pricing',
        paragraphs: [
          'In year one I charged by the day and worried about every hour. In year three I quote a fixed price for a defined result, and both sides sleep better.',
        ],
      },
      {
        heading: 'Saying no',
        paragraphs: [
          'The best decision I made was turning down work that did not fit: projects with no one who can say yes, or deadlines set before anyone knew the scope.',
        ],
        bullets: [
          { text: 'I take three projects a quarter, not five' },
          { text: 'Every project starts with a paid one-week sprint' },
          { text: 'I say no in the first call, not the third' },
        ],
      },
      {
        heading: 'The clients who stayed',
        paragraphs: [
          "Half of this year's work came from people I worked with before. They did not stay for the price; they stayed because the thing we built shipped on the date we agreed.",
        ],
        pullQuote: 'Repeat clients are the only marketing that compounds.',
      },
    ],
  },
  {
    id: 'prototype-in-code',
    slug: 'prototype-in-code',
    index: '04',
    takeNumber: 30,
    title: 'Prototype in code, not in slides',
    category: 'Process',
    date: 'Mar 2026',
    readingTime: '7 min',
    excerpt: 'How a 200-line prototype saved a six-week debate.',
    coverImage: ASSETS.writing.prototypeInCode,
    coverCaption: 'Fig. 04 — Process',
    sections: [
      {
        heading: 'The debate',
        paragraphs: [
          'A team I worked with had argued for six weeks about how a new search should work. Three slide decks, two workshops, no decision.',
        ],
      },
      {
        heading: '200 lines',
        paragraphs: [
          'I built a rough prototype in an afternoon: real data, real typing, no styling. We put it in front of five customers the next morning.',
        ],
        bullets: [
          { text: 'Two of the three ideas died in the first ten minutes' },
          { text: 'The third needed one change nobody had predicted' },
          { text: 'The decision took one meeting' },
        ],
        pullQuote:
          'A prototype is the cheapest way to have the argument you were going to have anyway.',
      },
      {
        heading: 'When to do it',
        paragraphs: [
          'Whenever a discussion is about how something behaves rather than how it looks. Slides are good at the second and useless at the first.',
        ],
      },
    ],
  },
  {
    id: 'motion-that-means-something',
    slug: 'motion-that-means-something',
    index: '05',
    takeNumber: 31,
    title: 'Motion that means something',
    category: 'Craft',
    date: 'Jan 2026',
    readingTime: '6 min',
    excerpt: 'Three questions I ask before anything moves on screen.',
    coverImage: ASSETS.writing.motionThatMeansSomething,
    coverCaption: 'Fig. 05 — Craft',
    sections: [
      {
        heading: 'Three questions',
        paragraphs: ['Before anything moves on screen, I ask three things:'],
        bullets: [
          { text: 'What changed, and does the person need to notice?' },
          { text: 'Where did it come from, and where is it going?' },
          { text: 'Would it be clearer if it did not move at all?' },
        ],
      },
      {
        heading: 'Motion as explanation',
        paragraphs: [
          'Good motion answers a question the person was about to ask: where did that panel go, what did I just delete, is it still loading. Motion that answers nothing is decoration, and decoration gets tiring by the third visit.',
        ],
        pullQuote: "If you can't say why it moves, it shouldn't.",
      },
      {
        heading: 'Keep it short',
        paragraphs: [
          'Most interface motion should finish in under 300 milliseconds. Anything longer makes people wait for the interface instead of the other way round.',
        ],
      },
    ],
  },
  {
    id: 'pricing-design-work',
    slug: 'pricing-design-work',
    index: '06',
    takeNumber: 32,
    title: 'How I price design and build work',
    category: 'Notes',
    date: 'Nov 2025',
    readingTime: '9 min',
    excerpt: 'Day rates, fixed scopes and why I stopped quoting by the screen.',
    coverImage: ASSETS.writing.pricingDesignWork,
    coverCaption: 'Fig. 06 — Notes',
    sections: [
      {
        heading: 'Why not by the day',
        paragraphs: [
          'Day rates reward slow work and punish clear thinking. Clients also hate them, because the number they care about — the total — is the one nobody can tell them.',
        ],
      },
      {
        heading: 'Fixed scope, fixed price',
        paragraphs: [
          'After a first call I write a one-page proposal: what we will make, what we will not, how long it takes and what it costs. If the scope changes, the price changes, in writing, before the work.',
        ],
        bullets: [
          { text: 'A one-week sprint to start, priced on its own' },
          { text: 'Then a fixed quote for the build' },
          { text: 'Payment in three parts, the last one on launch' },
        ],
      },
      {
        heading: 'Why not by the screen',
        paragraphs: [
          "Screens are a bad unit. A settings page and an onboarding flow are both 'one screen' and differ by weeks of work.",
        ],
        pullQuote: 'Price the result, not the hours and not the pixels.',
      },
    ],
  },
];

export const WRITING_CATEGORIES = ['All', 'Process', 'Systems', 'Notes', 'Craft'] as const;

export function getArticleBySlug(slug: string): WritingArticle | undefined {
  return ARTICLES.find((item) => item.slug === slug);
}
