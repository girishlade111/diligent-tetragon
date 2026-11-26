import type { Metadata } from 'next';
import React from 'react';
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from '@/content/legal';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LegalDocumentClient } from '@/components/pages/LegalDocumentClient';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy notice and GDPR information for Mara Voss Studio.',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <LegalDocumentClient
          titleLines={['Privacy', 'policy']}
          updated={PRIVACY_UPDATED}
          sections={PRIVACY_SECTIONS}
        />
      </main>
      <SiteFooter takeOverride={33} />
    </>
  );
}
