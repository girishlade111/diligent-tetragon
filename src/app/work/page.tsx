import type { Metadata } from 'next';
import React from 'react';
import { TestimonialsBoard } from '@/components/home/TestimonialsBoard';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WorkCollectionClient } from '@/components/pages/WorkCollectionClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Work — case studies in product design, brand and front-end',
  description:
    'Eight projects from the last few years, from the first sketch to the shipped release, with the role Mara Voss played and what changed.',
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <WorkCollectionClient />
        <TestimonialsBoard />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={2} />
    </>
  );
}
