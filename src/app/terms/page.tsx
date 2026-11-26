import type { Metadata } from 'next';
import React from 'react';
import { TERMS_SECTIONS, TERMS_UPDATED } from '@/content/legal';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LegalDocumentClient } from '@/components/pages/LegalDocumentClient';

export const metadata: Metadata = {
  title: 'Terms of use',
  description: 'Terms of use for Mara Voss portfolio website.',
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <LegalDocumentClient
          titleLines={['Terms of', 'use']}
          updated={TERMS_UPDATED}
          sections={TERMS_SECTIONS}
        />
      </main>
      <SiteFooter takeOverride={34} />
    </>
  );
}
