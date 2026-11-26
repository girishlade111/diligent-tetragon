import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LabArchiveClient } from '@/components/pages/LabArchiveClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Lab — experiments and side projects',
  description: 'Small tools, toys and tests by Mara Voss, most of them open source.',
};

export default function LabPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <LabArchiveClient />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={6} />
    </>
  );
}
