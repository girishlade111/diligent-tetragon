import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ResumeSheetClient } from '@/components/pages/ResumeSheetClient';
import { ContactCTA } from '@/components/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Résumé — Mara Voss, product designer & developer | CV',
  description:
    'Printable A4 résumé for Mara Voss — Experience at Mara Voss Studio, Loop Bank, Pulse Analytics, and Studio North.',
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ResumeSheetClient />
        <div className="no-print">
          <ContactCTA />
        </div>
      </main>
      <SiteFooter takeOverride={4} />
    </>
  );
}
