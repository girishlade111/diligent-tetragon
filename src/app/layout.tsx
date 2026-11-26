import type { Metadata } from 'next';
import React from 'react';
import { siteConfig } from '@/config/site';
import { CinematicPreloader } from '@/components/layout/CinematicPreloader';
import { PageTransition } from '@/components/layout/PageTransition';
import '@/styles/tokens.css';
import '@/styles/globals.css';
import '@/styles/components.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mv">
        <a href="#main-content" className="mv-skip-link mv-sr">
          Skip to main content
        </a>
        <CinematicPreloader />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
