import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { UsesCuttingMatClient } from '@/components/pages/UsesCuttingMatClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Uses — the hardware, software and tools I work with',
  description:
    'Hardware, design apps, code stack and desk setup used by Mara Voss in Berlin.',
};

export default function UsesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <UsesCuttingMatClient />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={35} />
    </>
  );
}
