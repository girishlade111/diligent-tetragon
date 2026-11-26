import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { AboutPageClient } from '@/components/pages/AboutPageClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'About — Mara Voss, product designer & developer in Berlin',
  description:
    'I am Mara Voss, a product designer who also writes the code. Nine years taking products from first brief to production release.',
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <AboutPageClient />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={3} />
    </>
  );
}
