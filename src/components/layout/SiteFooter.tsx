'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { siteConfig } from '@/config/site';
import { BerlinClock } from '@/components/shared/BerlinClock';
import { Clapperboard } from '@/components/shared/Clapperboard';

const PATH_TO_TAKE: Record<string, number> = {
  '/': 1,
  '/work': 2,
  '/about': 3,
  '/resume': 4,
  '/services': 5,
  '/lab': 6,
  '/writing': 7,
  '/contact': 8,
  '/work/sole-campaign': 9,
  '/work/rouge-packaging': 10,
  '/work/nord-brand-identity': 11,
  '/work/atlas-dev-platform': 12,
  '/work/print-colour-system': 13,
  '/work/type-poster-series': 14,
  '/work/loop-banking-app': 15,
  '/work/pulse-dashboard': 16,
  '/services/product-design': 17,
  '/services/design-systems': 18,
  '/services/front-end-development': 19,
  '/services/brand-and-web': 20,
  '/lab/variable-type-toy': 21,
  '/lab/ui-sound-kit': 22,
  '/lab/shader-gradients': 23,
  '/lab/figma-token-plugin': 24,
  '/lab/film-camera-app': 25,
  '/lab/motion-cheatsheet': 26,
  '/writing/design-in-the-browser': 27,
  '/writing/design-system-that-sticks': 28,
  '/writing/freelance-year-three': 29,
  '/writing/prototype-in-code': 30,
  '/writing/motion-that-means-something': 31,
  '/writing/pricing-design-work': 32,
  '/privacy': 33,
  '/terms': 34,
  '/uses': 35,
  '/404': 36,
};

export function SiteFooter({ takeOverride }: { takeOverride?: number }) {
  const pathname = usePathname();
  const takeNumber = takeOverride ?? PATH_TO_TAKE[pathname] ?? 36;

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <footer className="mv-footer mv-dark no-print" data-testid="site-footer">
      <div className="mv-wrap mvft-top">
        <div className="mvft-slate-col">
          <Clapperboard scene="Footer" take={takeNumber} />
        </div>

        <div className="mvft-wrap-col">
          <h2 className="mvft-headline">
            That’s a <span className="mv-hl-orange">wrap.</span>
          </h2>
          <p className="mvft-sub">
            Thanks for watching to the end. Say hello, I read every message and reply within a day.
          </p>
          <div className="mvft-write">
            <span className="mvft-k">Write to me</span>
            <a href={`mailto:${siteConfig.email}`} className="mvft-email">
              {siteConfig.email} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mv-wrap mvft-cols">
        <div className="mvft-col">
          <h3 className="mvft-col-h">Work</h3>
          <ul className="mvft-list">
            {siteConfig.footerWorkLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="mvft-link">
                  <span className="mvft-link-lbl">{item.label}</span>
                  <span className="mvft-link-meta">{item.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mvft-col">
          <h3 className="mvft-col-h">Pages</h3>
          <ul className="mvft-list">
            {siteConfig.footerPageLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="mvft-link">
                  <span className="mvft-link-lbl">{item.label}</span>
                  <span className="mvft-link-arr" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mvft-col">
          <h3 className="mvft-col-h">Elsewhere</h3>
          <ul className="mvft-list">
            {siteConfig.socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mvft-link"
                >
                  <span className="mvft-link-lbl">{item.label}</span>
                  <span className="mvft-link-arr" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mv-wrap mvft-bar">
        <div className="mvft-bar-left">
          <span>© 2026 Mara Voss</span>
          <Link href="/privacy" className="mvft-legal">
            Privacy
          </Link>
          <Link href="/terms" className="mvft-legal">
            Terms
          </Link>
          <Link href="/services" className="mvft-legal">
            Services
          </Link>
          <Link href="/uses" className="mvft-legal">
            Uses
          </Link>
        </div>

        <div className="mvft-bar-mid">
          <span className="mvft-time-k">Local time</span>
          <BerlinClock className="mvft-time-v" />
          <span className="mvft-time-city">· Berlin</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="mvft-totop"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}
