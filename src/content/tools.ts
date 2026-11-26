export interface ToolkitItem {
  id: string;
  number: string;
  name: string;
  category: string;
  group: 'design' | 'code';
}

export const TOOLKIT_ITEMS: ToolkitItem[] = [
  { id: 'figma', number: '01', name: 'Figma', category: 'Design', group: 'design' },
  { id: 'framer', number: '02', name: 'Framer', category: 'Design', group: 'design' },
  { id: 'rive', number: '03', name: 'Rive', category: 'Motion', group: 'design' },
  { id: 'protopie', number: '04', name: 'Protopie', category: 'Prototyping', group: 'design' },
  { id: 'blender', number: '05', name: 'Blender', category: '3D', group: 'design' },
  { id: 'react', number: '06', name: 'React', category: 'Code', group: 'code' },
  { id: 'typescript', number: '07', name: 'TypeScript', category: 'Code', group: 'code' },
  { id: 'nextjs', number: '08', name: 'Next.js', category: 'Code', group: 'code' },
  { id: 'tailwind', number: '09', name: 'Tailwind', category: 'Code', group: 'code' },
  { id: 'storybook', number: '10', name: 'Storybook', category: 'Code', group: 'code' },
  { id: 'git', number: '11', name: 'Git', category: 'Code', group: 'code' },
  { id: 'notion', number: '12', name: 'Notion', category: 'Ops', group: 'design' },
];
