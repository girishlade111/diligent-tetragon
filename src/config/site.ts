export const siteConfig = {
  name: 'Mara Voss',
  role: 'Product designer & developer',
  tagline: 'Product Designer & Developer Portfolio',
  description:
    'Mara Voss is a product designer and developer in Berlin. Case studies, résumé and writing: mobile apps, brand identity, design systems and front-end code.',
  email: 'hello@maravoss.design',
  domain: 'maravoss.design',
  location: 'Berlin',
  timezone: 'Europe/Berlin',
  availability: {
    statusLabel: 'Available for work · Nov 2026',
    shortLabel: 'Available for work',
    monthLabel: 'Nov 2026',
    studioTag: 'Studio 1 · Rec',
    isAvailable: true,
    businessHours: {
      startHour: 9,
      endHour: 18,
      onSetText: 'On set · Usually replies within a few hours',
      offSetText: 'Off set · I reply in the morning',
    },
  },
  experienceLabel: '9 years of shipping',
  experienceFacts: [
    { index: '01', label: '9 years' },
    { index: '02', label: '40+ products shipped' },
    { index: '03', label: 'Berlin, working worldwide' },
  ],
  aboutFacts: [
    { index: '01', label: 'Based in Berlin' },
    { index: '02', label: '9 years in product' },
    { index: '03', label: 'Design + front-end' },
  ],
  production: {
    name: 'Portfolio 2026',
    roll: 'A-09',
    director: 'Mara Voss',
    build: 'main · 9f3c1a',
    defaultDate: '26.11.26',
  },
  navLinks: [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Résumé', href: '/resume' },
    { label: 'Writing', href: '/writing' },
    { label: 'Contact', href: '/contact' },
  ],
  footerWorkLinks: [
    { label: 'Sole', meta: 'Brand · Campaign', href: '/work/sole-campaign' },
    { label: 'Rouge', meta: 'Brand · Packaging', href: '/work/rouge-packaging' },
    { label: 'Nord', meta: 'Brand · Identity', href: '/work/nord-brand-identity' },
    { label: 'Atlas', meta: 'Web · Front-end', href: '/work/atlas-dev-platform' },
    { label: 'Chroma', meta: 'Brand · Colour system', href: '/work/print-colour-system' },
  ],
  footerPageLinks: [
    { label: 'About', href: '/about' },
    { label: 'Résumé', href: '/resume' },
    { label: 'Lab', href: '/lab' },
    { label: 'Writing', href: '/writing' },
    { label: 'Contact', href: '/contact' },
  ],
  socialLinks: [
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Read.cv', href: 'https://read.cv' },
  ],
  bookingCallUrl:
    process.env.NEXT_PUBLIC_BOOKING_CALENDAR_URL ||
    'mailto:hello@maravoss.design?subject=Intro%20call',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  isDemonstrationMode: true,
} as const;
