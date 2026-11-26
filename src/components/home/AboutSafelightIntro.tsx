'use client';

import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/content/assets';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function AboutSafelightIntro() {
  const secRef = useRef<HTMLElement>(null);
  const [dev, setDev] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1') {
      setDev(0);
      return;
    }

    function updateScroll() {
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const total = Math.max(1, el.offsetHeight - vh);
      const passed = Math.max(0, Math.min(total, -rect.top));
      setDev(Number((passed / total).toFixed(3)));
    }

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  const pct = Math.round(dev * 100);
  const statusLabel = pct < 15 ? 'Safelight' : pct < 92 ? 'Developing' : 'Fixed';

  return (
    <section
      ref={secRef}
      className="mvin mv-dark"
      style={{ ['--dev' as string]: dev }}
      aria-labelledby="about-safelight-heading"
      data-testid="about-safelight"
    >
      <div className="mvin-sticky">
        <div className="mvin-print" aria-hidden="true">
          <img
            src={ASSETS.portraits.maraDeskSafelight}
            alt="Mara Voss working at studio desk under red darkroom safelight"
            className="mvin-photo"
            width={1440}
            height={960}
          />
          <div className="mvin-neg" />
          <div className="mvin-safe" />
          <div className="mvin-wave" />
        </div>

        <div className="mv-wrap mvin-inner">
          <div className="mvin-top-bar">
            <span className="mvin-tag">{statusLabel}</span>
            <span className="mvin-tag">
              Print 01 · f/8 · 12s · developing <b>{pct}%</b>
            </span>
          </div>

          <div className="mvin-body">
            <FramePill label="FRAME 01 — About" dark />
            <h2 id="about-safelight-heading" className="mv-hd mvin-lead">
              I’m Mara. For nine years I’ve turned messy briefs into products people{' '}
              <span className="mv-hl-box">actually use</span> — designed in Figma, built in React,
              shipped on time.
            </h2>

            <dl className="mvin-stats">
              {siteConfig.experienceFacts.map((fact) => (
                <div key={fact.index} className="mvin-stat">
                  <dt>{fact.index}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mvin-ctas">
              <ArrowButton label="More about me" href="/about" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
