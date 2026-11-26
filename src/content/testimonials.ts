import { ASSETS } from './assets';
import type { TestimonialItem } from '@/types/portfolio';

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'lena-hart',
    index: '01',
    clientLabel: 'Loop Bank · Re: Loop',
    quote:
      'Mara designed it and then built half of it. We shipped two months early.',
    author: 'Lena Hart',
    role: 'CEO · Loop Bank',
    avatar: ASSETS.testimonials.lenaHart,
    rotation: '-2deg',
    tapeRotation: '-4deg',
  },
  {
    id: 'jonas-berg',
    index: '02',
    clientLabel: 'Nord Coffee · Re: Nord',
    quote:
      'The brand looked like us from the first round. Customers ask who made our bags.',
    author: 'Jonas Berg',
    role: 'Founder · Nord Coffee',
    avatar: ASSETS.testimonials.jonasBerg,
    rotation: '1.6deg',
    tapeRotation: '3deg',
  },
  {
    id: 'amira-said',
    index: '03',
    clientLabel: 'Atlas Cloud · Re: Atlas',
    quote:
      'The rare designer who reads a pull request. Our docs finally feel fast.',
    author: 'Amira Said',
    role: 'CTO · Atlas Cloud',
    avatar: ASSETS.testimonials.amiraSaid,
    rotation: '-1.1deg',
    tapeRotation: '-2.5deg',
  },
  {
    id: 'chris-owen',
    index: '04',
    clientLabel: 'Pulse Analytics · Re: Pulse',
    quote: 'She gave us one system our designers and engineers both trust.',
    author: 'Chris Owen',
    role: 'Head of Product · Pulse Analytics',
    avatar: ASSETS.testimonials.chrisOwen,
    rotation: '2.1deg',
    tapeRotation: '4deg',
  },
  {
    id: 'sofia-marin',
    index: '05',
    clientLabel: 'Sole Supply · Re: Sole',
    quote: 'Fast, calm and very, very good with detail.',
    author: 'Sofia Marin',
    role: 'Creative Director · Sole Supply',
    avatar: ASSETS.testimonials.sofiaMarin,
    rotation: '-1.5deg',
    tapeRotation: '-3deg',
  },
];
