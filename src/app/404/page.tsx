import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { BurntFilm404View } from '@/components/pages/BurntFilm404View';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page was cut in the edit, or it never made it onto the roll.',
};

export default function FourOhFourPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <BurntFilm404View />
      </main>
      <SiteFooter takeOverride={36} />
    </>
  );
}
