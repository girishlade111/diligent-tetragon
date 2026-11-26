import { ASSETS } from './assets';
import type { TimelineEvent } from '@/types/portfolio';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '2012',
    frameCode: 'MV 400TX · 01',
    title: 'Started interaction design at HfG',
    image: ASSETS.timeline.y2012,
  },
  {
    year: '2016',
    frameCode: 'MV 400TX · 02',
    title: 'First studio job in Berlin',
    image: ASSETS.timeline.y2016,
  },
  {
    year: '2018',
    frameCode: 'MV 400TX · 03',
    title: 'Learned React to stop waiting on handoffs',
    image: ASSETS.timeline.y2018,
  },
  {
    year: '2020',
    frameCode: 'MV 400TX · 04',
    title: 'Led design at Loop Bank',
    image: ASSETS.timeline.y2020,
  },
  {
    year: '2023',
    frameCode: 'MV 400TX · 05',
    title: 'Went independent',
    image: ASSETS.timeline.y2023,
  },
  {
    year: '2026',
    frameCode: 'MV 400TX · 06',
    title: 'Taking on 3 projects a quarter',
    image: ASSETS.timeline.y2026,
  },
];

export const ABOUT_PRINCIPLES = [
  {
    number: '01',
    title: 'Design and code in the same week',
    body: 'I sketch in Figma and build in the browser side by side, so we test real interactions early and nothing gets lost in a handoff.',
  },
  {
    number: '02',
    title: 'Small scope, shipped often',
    body: 'We cut the work into releases you can actually use. A working slice every two weeks beats a perfect plan that ships in six months.',
  },
  {
    number: '03',
    title: 'You talk to me, not an account manager',
    body: 'The person on your calls is the person doing the work. Decisions take a message, not a meeting.',
  },
];

export const OFFSET_FRAMES = [
  { caption: 'Colour tests, week 2', image: ASSETS.offset.colourTests, rotate: '-2.2deg' },
  { caption: 'The desk, Berlin', image: ASSETS.offset.deskBerlin, rotate: '1.6deg' },
  { caption: 'Friday review', image: ASSETS.offset.fridayReview, rotate: '-1.3deg' },
];

export const CURRENTLY_ITEMS = [
  { label: 'Reading', value: 'Shape Up by Ryan Singer' },
  { label: 'Listening', value: 'Floating Points — Cascade' },
  { label: 'Building', value: 'A tiny motion library for React' },
];
