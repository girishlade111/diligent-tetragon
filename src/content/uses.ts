export interface UsesItem {
  code: string;
  name: string;
  description: string;
}

export interface UsesGroup {
  id: string;
  title: string;
  count: string;
  items: UsesItem[];
}

export const USES_GROUPS: UsesGroup[] = [
  {
    id: 'hardware',
    title: 'Hardware',
    count: '04',
    items: [
      {
        code: '01.01',
        name: 'MacBook Pro 14 M4',
        description: 'Figma, Blender and a dev server at once — the fans stay quiet.',
      },
      {
        code: '01.02',
        name: 'Studio Display',
        description: '5K for pixel checks, and the colour matches the phones I test on.',
      },
      {
        code: '01.03',
        name: 'Keychron Q1',
        description: 'Heavy, quiet and remapped for Figma shortcuts.',
      },
      {
        code: '01.04',
        name: 'MX Master 3S',
        description: 'The side wheel scrubs timelines in Rive and Framer.',
      },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    count: '04',
    items: [
      {
        code: '02.01',
        name: 'Figma',
        description: "Flows, UI and the design system's source of truth.",
      },
      {
        code: '02.02',
        name: 'Framer',
        description: 'Marketing sites that clients can edit on their own.',
      },
      {
        code: '02.03',
        name: 'Rive',
        description: 'Interactive motion that ships as a tiny runtime.',
      },
      {
        code: '02.04',
        name: 'Blender',
        description: '3D product shots and hero renders.',
      },
    ],
  },
  {
    id: 'code',
    title: 'Code',
    count: '05',
    items: [
      {
        code: '03.01',
        name: 'VS Code',
        description: 'Prettier, ESLint and one calm theme.',
      },
      {
        code: '03.02',
        name: 'React',
        description: 'Every product UI I build ends up here.',
      },
      {
        code: '03.03',
        name: 'Next.js',
        description: 'App router and server components — fast by default.',
      },
      {
        code: '03.04',
        name: 'Tailwind',
        description: 'Tokens from Figma, straight into utility classes.',
      },
      {
        code: '03.05',
        name: 'Vercel',
        description: 'A preview link on every pull request for client review.',
      },
    ],
  },
  {
    id: 'desk',
    title: 'Desk',
    count: '03',
    items: [
      {
        code: '04.01',
        name: 'Herman Miller Aeron',
        description: "Bought used in 2019. Best money I've spent.",
      },
      {
        code: '04.02',
        name: 'Anglepoise lamp',
        description: 'Warm light for sketching after dark.',
      },
      {
        code: '04.03',
        name: 'Leuchtturm notebook',
        description: 'Dot grid. Every project starts on paper.',
      },
    ],
  },
];
