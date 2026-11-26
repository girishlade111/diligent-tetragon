'use client';

import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/content/assets';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { BerlinClock } from '@/components/shared/BerlinClock';

type BackdropKey = 'clay' | 'brass' | 'night';

interface BackdropOption {
  id: BackdropKey;
  label: string;
  swatch: string;
  isDark: boolean;
}

const BACKDROPS: BackdropOption[] = [
  { id: 'clay', label: 'Clay', swatch: '#e6ded1', isDark: false },
  { id: 'brass', label: 'Brass', swatch: '#ff5b2e', isDark: false },
  { id: 'night', label: 'Night', swatch: '#171311', isDark: true },
];

export function PortraitHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [backdrop, setBackdrop] = useState<BackdropKey>('clay');
  const [lampPos, setLampPos] = useState({ x: 76, y: 26 });
  const [dragging, setDragging] = useState(false);

  const activeTheme = BACKDROPS.find((b) => b.id === backdrop) || BACKDROPS[0];

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--lx', `${lampPos.x}%`);
    el.style.setProperty('--ly', `${lampPos.y}%`);
    const dx = (50 - lampPos.x) * 0.65;
    const dy = (50 - lampPos.y) * 0.45;
    el.style.setProperty('--sx', `${dx.toFixed(1)}px`);
    el.style.setProperty('--sy', `${dy.toFixed(1)}px`);
    el.style.setProperty('--kx', `${(lampPos.x - 50).toFixed(1)}%`);
    el.style.setProperty('--ky', `${(lampPos.y - 50).toFixed(1)}%`);
  }, [lampPos]);

  function updateFromPointer(clientX: number, clientY: number) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(8, Math.min(82, ((clientY - rect.top) / rect.height) * 100));
    setLampPos({ x, y });
  }

  function handleLampKeyDown(e: React.KeyboardEvent) {
    const step = 4;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setLampPos((p) => ({ ...p, x: Math.max(8, p.x - step) }));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setLampPos((p) => ({ ...p, x: Math.min(92, p.x + step) }));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setLampPos((p) => ({ ...p, y: Math.max(8, p.y - step) }));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setLampPos((p) => ({ ...p, y: Math.min(82, p.y + step) }));
    }
  }

  return (
    <section
      ref={heroRef}
      className={`mvp is-bd-${backdrop} ${activeTheme.isDark ? 'mv-dark' : 'mv-lt'}`}
      style={{ ['--pimg' as string]: `url(${ASSETS.portraits.maraCutout})` }}
      onPointerMove={(e) => {
        if (dragging) updateFromPointer(e.clientX, e.clientY);
      }}
      onPointerUp={() => setDragging(false)}
      aria-labelledby="hero-mara-voss"
      data-testid="portrait-hero"
    >
      <div className="mvp-bg" aria-hidden="true" />
      <div className="mvp-wash" aria-hidden="true" />

      <div className="mvp-letters" aria-hidden="true">
        <div className="mvp-name-row">
          <span>M</span>
          <span>A</span>
          <span>R</span>
          <span>A</span>
        </div>
        <div className="mvp-name-row mvp-name-row-bot">
          <span>V</span>
          <span>O</span>
          <span>S</span>
          <span>S</span>
        </div>
      </div>

      <h1 id="hero-mara-voss" className="mv-sr">
        Mara Voss, Product designer &amp; developer
      </h1>

      <div className="mvp-stage" aria-hidden="true">
        <div className="mvp-shadow" />
        <div className="mvp-rim" />
        <img
          src={ASSETS.portraits.maraCutout}
          alt="Portrait of Mara Voss in the Berlin studio"
          className="mvp-portrait"
          width={1152}
          height={1496}
          loading="eager"
          decoding="sync"
        />
        <div className="mvp-fade" />
      </div>

      <button
        type="button"
        className="mvp-lamp"
        style={{ left: `${lampPos.x}%`, top: `${lampPos.y}%` }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setDragging(true);
          updateFromPointer(e.clientX, e.clientY);
        }}
        onKeyDown={handleLampKeyDown}
        aria-label="Move studio light source using pointer or arrow keys"
        data-testid="hero-studio-lamp"
      >
        <span className="mvp-lamp-core" />
        <span className="mvp-lamp-lbl">Light</span>
      </button>

      <div className="mv-wrap mvp-ui">
        <div className="mvp-left">
          <p className="mvp-role">
            Product designer
            <br />
            &amp; developer
          </p>
          <p className="mvp-copy">
            I design digital products and build them in code, from the first sketch to the shipped release.
          </p>
          <div className="mvp-ctas">
            <ArrowButton label="See my work" href="/work" variant="solid" />
            <ArrowButton
              label="Download résumé"
              href="/api/resume-pdf"
              variant="ghost"
              download
            />
          </div>
          <div className="mvp-meta">
            <p className="mvp-avail">
              <span className="mv-port" aria-hidden="true" />
              <span>{siteConfig.availability.statusLabel}</span>
            </p>
            <p className="mvp-loc">
              {siteConfig.location} · <BerlinClock />
            </p>
            <p className="mvp-exp">{siteConfig.experienceLabel}</p>
          </div>
        </div>
      </div>

      <div className="mvp-sw" role="group" aria-label="Studio backdrop">
        <span className="mvp-sw-l">Backdrop</span>
        {BACKDROPS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setBackdrop(item.id)}
            aria-label={`Set studio backdrop to ${item.label}`}
            aria-pressed={backdrop === item.id}
            className={backdrop === item.id ? 'is-on' : ''}
            data-testid={`backdrop-${item.id}`}
          >
            <i style={{ background: item.swatch }} />
          </button>
        ))}
      </div>
    </section>
  );
}
