import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { WritingNotebookClient } from '@/components/pages/WritingNotebookClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Writing — notes on design and code',
  description:
    'Short essays by Mara Voss on designing and building digital products — process, systems, pricing and craft.',
};

export default function WritingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <WritingNotebookClient />
        <ContactCTA />
      </main>
      <SiteFooter takeOverride={7} />
    </>
  );
}
