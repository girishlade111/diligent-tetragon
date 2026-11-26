import type { BookingTicket } from '@/types/portfolio';

export const BOOKING_TICKETS: BookingTicket[] = [
  {
    id: 'nov-17',
    number: '01',
    date: 'Nov 17',
    admitLabel: 'Admit one project',
    queryValue: 'nov-17',
  },
  {
    id: 'dec-1',
    number: '02',
    date: 'Dec 1',
    admitLabel: 'Admit one project',
    queryValue: 'dec-1',
  },
  {
    id: 'jan-12',
    number: '03',
    date: 'Jan 12',
    admitLabel: 'Admit one project',
    queryValue: 'jan-12',
  },
];

export const WORKFLOW_STAGES = [
  {
    step: '01',
    title: 'Brief',
    meta: 'Day 1 · Set call',
    badge: 'DAY 1',
    summary:
      'We read the brief on day one, agree the scope, pick the riskiest question and put a launch date on the wall.',
  },
  {
    step: '02',
    title: 'Explore',
    meta: 'Week 1–2 · Direction',
    badge: 'WEEK 1–2',
    summary:
      'Three fast directions, real type and colour early, trimmed to one direction we test with real people.',
  },
  {
    step: '03',
    title: 'Build',
    meta: 'Week 3–6 · Production',
    badge: 'WEEK 3–6',
    summary:
      'I move straight into components, tokens and live code, reviewing a working build every Friday.',
  },
  {
    step: '04',
    title: 'Ship',
    meta: 'Week 7 · Handover',
    badge: 'WEEK 7',
    summary:
      'Performance, accessibility, clean pull requests and a short Loom + handover guide your team can keep running.',
  },
];
