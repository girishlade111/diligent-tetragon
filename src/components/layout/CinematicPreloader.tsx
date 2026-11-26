'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

const SESSION_KEY = 'mv_intro_seen_v1';

export function CinematicPreloader() {
  const [visible, setVisible] = useState(false);
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (params.get('deterministic') === '1' || reduced) {
      return;
    }

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      seen = false;
    }

    if (seen && params.get('intro') !== '1') {
      return;
    }

    setVisible(true);
    const tickTimer = window.setInterval(() => {
      setFrame((prev) => (prev >= 24 ? 24 : prev + 1));
    }, 65);

    const endTimer = window.setTimeout(() => {
      dismiss();
    }, 1750);

    return () => {
      window.clearInterval(tickTimer);
      window.clearTimeout(endTimer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dismiss();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  function dismiss() {
    setVisible(false);
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // Ignore storage errors in private browsing
    }
  }

  if (!visible) return null;

  return (
    <div
      className="mv-preloader no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Introductory studio slate"
      data-testid="cinematic-preloader"
    >
      <div className="mv-pre-corners" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="mv-pre-top">
        <span className="mv-pre-mono">REEL 00 · LEADER</span>
        <span className="mv-pre-mono">
          <i className="mv-pre-rec" aria-hidden="true" />
          24 FPS · TC 00:00:00:{String(frame).padStart(2, '0')}
        </span>
      </div>

      <div className="mv-pre-center">
        <p className="mv-pre-kicker">PROD. {siteConfig.production.name.toUpperCase()}</p>
        <p className="mv-pre-title">MARA VOSS</p>
        <p className="mv-pre-sub">Product designer &amp; developer — Berlin</p>
        <div className="mv-pre-progress" aria-hidden="true">
          <span style={{ width: `${Math.round((frame / 24) * 100)}%` }} />
        </div>
      </div>

      <div className="mv-pre-bot">
        <span className="mv-pre-mono">ROLL A-09 · BUILD {siteConfig.production.build}</span>
        <button
          type="button"
          className="mv-pre-skip"
          onClick={dismiss}
          data-testid="preloader-skip"
        >
          <span>Skip intro</span>
          <span aria-hidden="true">ESC</span>
        </button>
      </div>
    </div>
  );
}
