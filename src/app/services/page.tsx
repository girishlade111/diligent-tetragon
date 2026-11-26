import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ServicesOverviewClient } from '@/components/pages/ServicesOverviewClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Services — product design, design systems, front-end development',
  description:
    'Four ways to work together: product design, design systems, front-end development, and brand & web.',
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ServicesOverviewClient />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={5} />
    </>
  );
}
