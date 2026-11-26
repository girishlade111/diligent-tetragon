import { ASSETS } from './assets';
import type { ProjectCaseStudy } from '@/types/portfolio';

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'sole-campaign',
    slug: 'sole-campaign',
    frameCode: 'MV 400TX · 01A',
    frameNumber: '01',
    takeNumber: 9,
    title: 'Sole',
    client: 'Sole Supply',
    year: '2026',
    category: 'Brand',
    subcategory: 'Campaign',
    categoryLabel: 'Brand · Campaign',
    role: 'Art direction, web',
    teamSize: '3 people',
    outcomeShort: '+64% launch-week sales',
    summary: 'Launch campaign and product pages for a sneaker drop.',
    brief: [
      "Sole Supply had a sneaker drop in six weeks and a website that still looked like a reseller's catalogue. They needed a launch that felt like a brand, not a sale.",
      'We built one campaign page, one product template and a checkout that never leaves the story, then tested every step with real buyers before the drop.',
    ],
    contributions: [
      'Ran a two-day kick-off with the Sole Supply team to agree the one thing launch week had to prove',
      'Art-directed a two-day shoot around a single red sneaker and a yellow wall',
      'Designed the campaign page and product template in Figma as one system',
      'Built the front end in React with the in-house developer, reviewed every Friday',
      'Stayed on for launch week to watch the numbers and fix what slowed people down',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'tsx',
    codeSnippet: `// Sole — launch campaign
export function Hero({ drop }) {
  return (
    <Frame tone="sun">
      <Cover src={drop.image} grade="studio" />
      <Title size="xl">{drop.name}</Title>
      <Countdown to={drop.date} />
    </Frame>
  )
}`,
    resultSummary:
      'Launched on the planned day with the full stock sold in four days. Launch-week revenue was 64% above the previous drop, with half the paid ads.',
    metrics: [
      { value: '+64%', label: 'Launch-week sales' },
      { value: '4 days', label: 'To sell out' },
      { value: '6 wks', label: 'Brief to launch' },
    ],
    heroImage: ASSETS.projects.sole,
    heroAlt: 'Sole Supply sneaker drop campaign still against yellow wall',
    aspectRatio: '16 / 10',
    relatedSlugs: ['rouge-packaging', 'nord-brand-identity', 'atlas-dev-platform'],
    testimonial: {
      quote: 'Fast, calm and very, very good with detail.',
      author: 'Sofia Marin',
      role: 'Creative Director · Sole Supply',
    },
    nextSlug: 'rouge-packaging',
    seoTitle: 'Sole — case study | Mara Voss, product designer & developer',
    seoDescription: 'Launch campaign and product pages for a sneaker drop.',
  },
  {
    id: 'rouge-packaging',
    slug: 'rouge-packaging',
    frameCode: 'MV 400TX · 02A',
    frameNumber: '02',
    takeNumber: 10,
    title: 'Rouge',
    client: 'Maison Rouge',
    year: '2025',
    category: 'Brand',
    subcategory: 'Packaging',
    categoryLabel: 'Brand · Packaging',
    role: 'Packaging, 3D configurator',
    teamSize: '4 people',
    outcomeShort: '1 in 5 visitors used the configurator',
    summary: 'Packaging and a product configurator for a lipstick line.',
    brief: [
      'Maison Rouge sells lipstick in 40 shades and their customers kept ordering the wrong one. The packaging was beautiful, the online choice was guesswork.',
      'The job: new packaging that makes the shade obvious, and a 3D configurator that lets people see the case and the colour together before they buy.',
    ],
    contributions: [
      'Audited returns with the customer team to find which shades caused the most mistakes',
      'Designed a packaging system where the shade is printed on the cap, not hidden underneath',
      'Modelled the case in Blender and built a lightweight 3D viewer for the web',
      'Tested the configurator with twelve customers on their own phones',
      'Handed over the 3D files and viewer code to the agency running the shop',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'tsx',
    codeSnippet: `// Rouge — shade configurator
const shade = useShade(sku)
return (
  <Viewer model="/rouge/case.glb">
    <Material name="bullet" color={shade.hex} />
    <Label>{shade.name}</Label>
  </Viewer>
)`,
    resultSummary:
      'Wrong-shade returns dropped by a third in the first quarter, and one in five visitors now opens the configurator before they buy.',
    metrics: [
      { value: '1 in 5', label: 'Visitors use the configurator' },
      { value: '−33%', label: 'Wrong-shade returns' },
      { value: '40', label: 'Shades, one system' },
    ],
    heroImage: ASSETS.projects.rouge,
    heroAlt: 'Maison Rouge sculptural lipstick packaging and shade system',
    aspectRatio: '16 / 10',
    relatedSlugs: ['nord-brand-identity', 'sole-campaign', 'violet-type-poster-series' === 'violet-type-poster-series' ? 'type-poster-series' : 'type-poster-series'],
    testimonial: {
      quote:
        'Our customers finally see the shade before it arrives. Returns went down within weeks.',
      author: 'Claire Dumont',
      role: 'Brand Manager · Maison Rouge',
    },
    nextSlug: 'nord-brand-identity',
    seoTitle: 'Rouge — case study | Mara Voss, product designer & developer',
    seoDescription: 'Packaging and a product configurator for a lipstick line.',
  },
  {
    id: 'nord-brand-identity',
    slug: 'nord-brand-identity',
    frameCode: 'MV 400TX · 03A',
    frameNumber: '03',
    takeNumber: 11,
    title: 'Nord',
    client: 'Nord Coffee',
    year: '2025',
    category: 'Brand',
    subcategory: 'Identity',
    categoryLabel: 'Brand · Identity',
    role: 'Identity, packaging, type',
    teamSize: '2 people',
    outcomeShort: 'Stocked in 40 cafés in year one',
    summary: 'Identity, packaging and type system for a Nordic roaster.',
    brief: [
      'Nord Coffee roasted great beans in an industrial unit and sold them in plain brown bags. Cafés liked the coffee and forgot the name.',
      'They wanted an identity small enough for a two-person roastery and strong enough to sit on a café shelf next to the big brands.',
    ],
    contributions: [
      'Spent a morning in the roastery to find the story worth telling',
      "Drew a wordmark from the shapes on the roaster's control panel",
      'Built a bag system where colour marks the origin and type marks the roast',
      'Designed a one-page website and a wholesale sheet for cafés',
      'Prepared print files and a short brand guide the founders can use alone',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'ts',
    codeSnippet: `// Nord — bag label generator
export const label = (origin, roast) => ({
  colour: ORIGINS[origin].colour,
  weight: ROASTS[roast].type,
  lines: [origin.toUpperCase(), roast, "Roasted in Oslo"],
})`,
    resultSummary:
      "Nord went from five to forty cafés in its first year, and wholesale now makes up most of the roastery's revenue.",
    metrics: [
      { value: '40', label: 'Cafés in year one' },
      { value: '2', label: 'People on the team' },
      { value: '3 wks', label: 'Identity sprint' },
    ],
    heroImage: ASSETS.projects.nord,
    heroAlt: 'Nord Coffee colour-coded origin bag packaging and typography',
    aspectRatio: '16 / 10',
    relatedSlugs: ['print-colour-system', 'rouge-packaging', 'sole-campaign'],
    testimonial: {
      quote:
        'The brand looked like us from the first round. Customers ask who made our bags.',
      author: 'Jonas Berg',
      role: 'Founder · Nord Coffee',
    },
    nextSlug: 'atlas-dev-platform',
    seoTitle: 'Nord — case study | Mara Voss, product designer & developer',
    seoDescription: 'Identity, packaging and type system for a Nordic roaster.',
  },
  {
    id: 'atlas-dev-platform',
    slug: 'atlas-dev-platform',
    frameCode: 'MV 400TX · 04A',
    frameNumber: '04',
    takeNumber: 12,
    title: 'Atlas',
    client: 'Atlas Cloud',
    year: '2024',
    category: 'Web',
    subcategory: 'Front-end',
    categoryLabel: 'Web · Front-end',
    role: 'Front-end lead',
    teamSize: '5 people',
    outcomeShort: 'Docs load 3× faster',
    summary: 'Marketing site and docs built in Next.js with a live code playground.',
    brief: [
      "Atlas Cloud's developer docs took six seconds to load and nobody on the team owned the front end. Developers left before they found the page they needed.",
      'I joined as front-end lead for a quarter to rebuild the docs site, set up a design system for it and hand it to the team in good shape.',
    ],
    contributions: [
      'Measured where time went: fonts, a heavy search bundle and client-side rendering',
      'Moved the docs to static pages with Next.js and on-demand search',
      'Designed a small set of components for code blocks, callouts and API tables',
      'Paired with two engineers so they could run the system after I left',
      'Set up performance budgets that fail the build when a page gets slow',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'tsx',
    codeSnippet: `// Atlas — docs page
export async function generateStaticParams() {
  return (await getDocs()).map((d) => ({ slug: d.slug }))
}
export default function Doc({ params }) {
  return <Article doc={getDoc(params.slug)} />
}`,
    resultSummary:
      'Docs now load three times faster on a mid-range phone, search results appear while you type, and the team ships doc changes without me.',
    metrics: [
      { value: '3×', label: 'Faster docs' },
      { value: '98', label: 'Lighthouse score' },
      { value: '1 qtr', label: 'From audit to handover' },
    ],
    heroImage: ASSETS.projects.atlas,
    heroAlt: 'Atlas Cloud developer documentation UI and interactive playground',
    aspectRatio: '16 / 10',
    relatedSlugs: ['pulse-dashboard', 'loop-banking-app', 'print-colour-system'],
    testimonial: {
      quote: 'The rare designer who reads a pull request. Our docs finally feel fast.',
      author: 'Amira Said',
      role: 'CTO · Atlas Cloud',
    },
    nextSlug: 'print-colour-system',
    seoTitle: 'Atlas — case study | Mara Voss, product designer & developer',
    seoDescription:
      'Marketing site and docs built in Next.js with a live code playground.',
  },
  {
    id: 'print-colour-system',
    slug: 'print-colour-system',
    frameCode: 'MV 400TX · 05A',
    frameNumber: '05',
    takeNumber: 13,
    title: 'Chroma',
    client: 'Studio Chroma',
    year: '2024',
    category: 'Brand',
    subcategory: 'Colour system',
    categoryLabel: 'Brand · Colour system',
    role: 'Colour system',
    teamSize: '1 designer',
    outcomeShort: 'One palette for screen and print',
    summary: 'A colour system that works on screen and on paper.',
    brief: [
      'Studio Chroma prints art books and runs a website, and the two never matched. Every reprint started with a week of colour arguments.',
      'They asked for one palette that behaves the same on screen and on paper, documented so their freelancers could use it without calling them.',
    ],
    contributions: [
      'Printed a test sheet of their current colours on three paper stocks',
      'Rebuilt the palette in a perceptual colour space so steps look even',
      'Matched every screen colour to a print recipe and checked it on press',
      'Built a small web tool that shows each colour on screen next to its print values',
      "Wrote a short guide with the do's and don'ts for designers and printers",
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'ts',
    codeSnippet: `// Chroma — palette tokens
export const palette = {
  ink:   { oklch: "20% 0.01 60", cmyk: [0, 10, 20, 95] },
  clay:  { oklch: "62% 0.12 45", cmyk: [0, 55, 70, 10] },
  paper: { oklch: "95% 0.02 85", cmyk: [0, 2,  8,  0]  },
}`,
    resultSummary:
      'The last two reprints went to press without a colour round, and the website now uses the same palette as the books.',
    metrics: [
      { value: '1', label: 'Palette for screen and print' },
      { value: '0', label: 'Colour rounds on reprints' },
      { value: '24', label: 'Colours, each with a recipe' },
    ],
    heroImage: ASSETS.projects.chroma,
    heroAlt: 'Studio Chroma OKLCH and CMYK swatch specimen sheets',
    aspectRatio: '16 / 10',
    relatedSlugs: ['nord-brand-identity', 'type-poster-series', 'pulse-dashboard'],
    testimonial: {
      quote:
        'For the first time our books and our website look like the same studio.',
      author: 'Hanne Vik',
      role: 'Studio Lead · Studio Chroma',
    },
    nextSlug: 'type-poster-series',
    seoTitle: 'Chroma — case study | Mara Voss, product designer & developer',
    seoDescription: 'A colour system that works on screen and on paper.',
  },
  {
    id: 'type-poster-series',
    slug: 'type-poster-series',
    frameCode: 'MV 400TX · 06A',
    frameNumber: '06',
    takeNumber: 14,
    title: 'Violet',
    client: 'Violet Magazine',
    year: '2024',
    category: 'Editorial',
    subcategory: 'Art direction',
    categoryLabel: 'Editorial · Art direction',
    role: 'Art direction, layout',
    teamSize: '2 people',
    outcomeShort: 'Issue 12 sold out',
    summary: 'Art direction and layouts for a fashion quarterly.',
    brief: [
      'Violet Magazine wanted issue 12 to feel collectable. The theme was letters, so the type had to do the work the photos usually do.',
      'I art-directed the issue and a series of posters that came folded inside, each one built from a single letter of the alphabet.',
    ],
    contributions: [
      'Picked one typeface family and pushed it from hairline to black',
      'Set a grid that lets every spread break it once, on purpose',
      'Designed six fold-out posters that join into one word on a wall',
      'Worked with the printer on a fluorescent fifth colour for the covers',
      'Built a small web gallery so readers could see all six posters together',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'css',
    codeSnippet: `// Violet — poster grid
.poster {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  font-variation-settings: "wght" var(--w);
}
.poster .letter { grid-column: 2 / span 10; }`,
    resultSummary:
      'Issue 12 sold out in three weeks and became the first issue the magazine reprinted. The posters now sell on their own.',
    metrics: [
      { value: 'Sold out', label: 'Issue 12 in three weeks' },
      { value: '6', label: 'Fold-out posters' },
      { value: '2', label: 'People on the team' },
    ],
    heroImage: ASSETS.projects.violet,
    heroAlt: 'Violet Magazine Issue 12 typographic poster and editorial spread',
    aspectRatio: '16 / 10',
    relatedSlugs: ['print-colour-system', 'nord-brand-identity', 'sole-campaign'],
    testimonial: {
      quote:
        'Issue 12 is the one people still ask us for. It sold out faster than any issue before.',
      author: 'Tom Reyes',
      role: 'Editor · Violet Magazine',
    },
    nextSlug: 'loop-banking-app',
    seoTitle: 'Violet — case study | Mara Voss, product designer & developer',
    seoDescription: 'Art direction and layouts for a fashion quarterly.',
  },
  {
    id: 'loop-banking-app',
    slug: 'loop-banking-app',
    frameCode: 'MV 400TX · 07A',
    frameNumber: '07',
    takeNumber: 15,
    title: 'Loop',
    client: 'Loop Bank',
    year: '2023',
    category: 'Product',
    subcategory: 'Mobile app',
    categoryLabel: 'Product · Mobile app',
    role: 'Product design, prototyping',
    teamSize: '6 people',
    outcomeShort: '4.7★ on the App Store',
    summary: 'A banking app that turns spending into a weekly story.',
    brief: [
      'Loop Bank had a licence, a backend and a beta app that people opened once. Signing up took eleven screens and most people stopped at the ID check.',
      'I led product design for the app from private beta to public launch, and built the prototype the team tested every week.',
    ],
    contributions: [
      'Mapped every step of sign-up and cut it from eleven screens to five',
      'Rebuilt the ID check so it explains what happens and why, in plain words',
      'Designed the home screen around the one number people actually check',
      'Prototyped in code so we could test real flows with real people every week',
      'Led a team of four designers and ran a weekly critique with engineering',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'tsx',
    codeSnippet: `// Loop — onboarding step
export function IdCheck({ next }) {
  const scan = useDocumentScan()
  return scan.done
    ? <Success onContinue={next} />
    : <Camera hint="Hold your ID inside the frame" onScan={scan.start} />
}`,
    resultSummary:
      'Sign-up completion went from 31% to 68%, the app reached 1.2 million users and holds a 4.7 rating on the App Store.',
    metrics: [
      { value: '4.7★', label: 'App Store rating' },
      { value: '1.2M', label: 'Users after launch' },
      { value: '+37 pts', label: 'Sign-up completion' },
    ],
    heroImage: ASSETS.projects.loop,
    heroAlt: 'Loop Bank mobile banking home and weekly spending summary',
    aspectRatio: '16 / 10',
    relatedSlugs: ['pulse-dashboard', 'atlas-dev-platform', 'rouge-packaging'],
    testimonial: {
      quote:
        'Mara designed it and then built half of it. We shipped two months early.',
      author: 'Lena Hart',
      role: 'CEO · Loop Bank',
    },
    nextSlug: 'pulse-dashboard',
    seoTitle: 'Loop — case study | Mara Voss, product designer & developer',
    seoDescription: 'A banking app that turns spending into a weekly story.',
  },
  {
    id: 'pulse-dashboard',
    slug: 'pulse-dashboard',
    frameCode: 'MV 400TX · 08A',
    frameNumber: '08',
    takeNumber: 16,
    title: 'Pulse',
    client: 'Pulse Analytics',
    year: '2020',
    category: 'Product',
    subcategory: 'Design system',
    categoryLabel: 'Product · Design system',
    role: 'Design system, React',
    teamSize: '4 people',
    outcomeShort: '140 components, 1 source',
    summary: 'A dashboard and 140-component design system in Figma and React.',
    brief: [
      'Pulse Analytics had three product teams and three versions of every button. Each new feature looked slightly different from the last.',
      'They needed one design system that designers and engineers would both use, not a library that sits in a drawer.',
    ],
    contributions: [
      'Printed every component in the product to see the real mess',
      'Defined tokens for colour, type and spacing before drawing any component',
      'Built 140 React components with Storybook docs and visual tests',
      'Ran office hours every Tuesday so teams could ask instead of fork',
      'Redesigned the main dashboard as the first product built only from the system',
    ],
    designLabel: 'Hero / Desktop',
    codeLanguage: 'tsx',
    codeSnippet: `// Pulse — chart card
export function MetricCard({ label, value, trend }) {
  return (
    <Card padding="md">
      <Text tone="muted">{label}</Text>
      <Stat value={value} trend={trend} />
    </Card>
  )
}`,
    resultSummary:
      'All three teams build from the same 140 components, and the redesigned dashboard is used by 3,000 companies every day.',
    metrics: [
      { value: '140', label: 'Components, one source' },
      { value: '3', label: 'Teams on one system' },
      { value: '3,000', label: 'Companies on the dashboard' },
    ],
    heroImage: ASSETS.projects.pulse,
    heroAlt: 'Pulse Analytics dashboard UI and component system',
    aspectRatio: '16 / 10',
    relatedSlugs: ['atlas-dev-platform', 'loop-banking-app', 'print-colour-system'],
    testimonial: {
      quote: 'She gave us one system our designers and engineers both trust.',
      author: 'Chris Owen',
      role: 'Head of Product · Pulse Analytics',
    },
    nextSlug: 'sole-campaign',
    seoTitle: 'Pulse — case study | Mara Voss, product designer & developer',
    seoDescription: 'A dashboard and 140-component design system in Figma and React.',
  },
];

export const PROJECT_CATEGORIES = ['All', 'Brand', 'Web', 'Editorial', 'Product'] as const;

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PROJECTS.find((item) => item.slug === slug);
}
