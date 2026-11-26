'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'FRAME 00 · HOME',
  '/work': 'FRAME 02 · WORK',
  '/about': 'FRAME 00 · ABOUT',
  '/resume': 'PROOF 01 · RÉSUMÉ',
  '/services': 'FRAME 03 · SERVICES',
  '/lab': 'FRAME 08 · LAB',
  '/writing': 'NOTEBOOK · WRITING',
  '/uses': 'FRAME 05 · USES',
  '/contact': 'TAKE 01 · CONTACT',
  '/privacy': 'SMALL PRINT · PRIVACY',
  '/terms': 'SMALL PRINT · TERMS',
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [transitioning, setTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window !== 'undefined') {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const params = new URLSearchParams(window.location.search);
      if (reduced || params.get('deterministic') === '1') {
        setTransitioning(false);
        return;
      }
    }

    setTransitioning(true);
    const t = window.setTimeout(() => setTransitioning(false), 380);
    return () => window.clearTimeout(t);
  }, [pathname, mounted]);

  const label = ROUTE_LABELS[pathname] || `SCENE · ${pathname.replace(/^\//, '').toUpperCase()}`;

  return (
    <>
      {transitioning && (
        <div className="mvtr" aria-hidden="true">
          <div className="mvtr-k">
            <span>{label}</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
