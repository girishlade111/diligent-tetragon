'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';

interface ClapperboardProps {
  scene?: string;
  take?: string | number;
  roll?: string;
  date?: string;
  variant?: 'footer' | 'hero';
  className?: string;
}

export function Clapperboard({
  scene = 'Footer',
  take = 1,
  roll = siteConfig.production.roll,
  date = siteConfig.production.defaultDate,
  variant = 'footer',
  className = '',
}: ClapperboardProps) {
  const [clapped, setClapped] = useState(false);

  function triggerSnap() {
    setClapped(true);
    window.setTimeout(() => setClapped(false), 620);
  }

  return (
    <button
      type="button"
      onClick={triggerSnap}
      title={`Film clapperboard slate — Scene ${scene}, Take ${take}`}
      className={`mv-clap ${variant === 'hero' ? 'is-hero' : 'is-footer'} ${clapped ? 'is-clapping' : ''} ${className}`.trim()}
    >
      <span className="mv-sr">Film slate, activate to snap — </span>
      <span className="mv-clap-arm" aria-hidden="true">
        <span className="mv-clap-stripes" />
      </span>
      <span className="mv-clap-hinge" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="mv-clap-body">
        <span className="mv-clap-row mv-clap-prod">
          <span className="mv-clap-k">Prod.</span>
          <span className="mv-clap-v">{siteConfig.production.name}</span>
        </span>
        <span className="mv-clap-row mv-clap-triple">
          <span className="mv-clap-cell">
            <span className="mv-clap-k">Scene</span>
            <span className="mv-clap-v mv-clap-vlg">{scene}</span>
          </span>
          <span className="mv-clap-cell">
            <span className="mv-clap-k">Take</span>
            <span className="mv-clap-v mv-clap-vlg">{String(take)}</span>
          </span>
          <span className="mv-clap-cell">
            <span className="mv-clap-k">Roll</span>
            <span className="mv-clap-v mv-clap-vlg">{roll}</span>
          </span>
        </span>
        <span className="mv-clap-row mv-clap-dir">
          <span className="mv-clap-k">Director</span>
          <span className="mv-clap-v">{siteConfig.production.director}</span>
        </span>
        {variant === 'footer' ? (
          <span className="mv-clap-row mv-clap-double">
            <span className="mv-clap-cell">
              <span className="mv-clap-k">Date</span>
              <span className="mv-clap-v">{date}</span>
            </span>
            <span className="mv-clap-cell">
              <span className="mv-clap-k">Build</span>
              <span className="mv-clap-v mv-clap-sm">{siteConfig.production.build}</span>
            </span>
          </span>
        ) : (
          <span className="mv-clap-row mv-clap-double">
            <span className="mv-clap-cell">
              <span className="mv-clap-k">Date</span>
              <span className="mv-clap-v">{date}</span>
            </span>
          </span>
        )}
      </span>
    </button>
  );
}
