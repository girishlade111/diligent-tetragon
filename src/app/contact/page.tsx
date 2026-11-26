import type { Metadata } from 'next';
import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactBookingClient } from '@/components/pages/ContactBookingClient';

export const metadata: Metadata = {
  title: 'Contact — hire Mara Voss for product design and development',
  description:
    'Project inquiry and booking sheet for Mara Voss, independent product designer & developer in Berlin.',
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <ContactBookingClient />
      </main>
      <SiteFooter takeOverride={8} />
    </>
  );
}
