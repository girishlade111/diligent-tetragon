'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { EXPERIMENTS } from '@/content/experiments';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';
import type { LabCategory } from '@/types/portfolio';

const LAB_FILTERS: ('All' | LabCategory)[] = [
  'All',
  'Experiment',
  'Side project',
  'Open source',
  'Concept',
  'Resource',
];

export function LabArchiveClient() {
  const [filter, setFilter] = useState<'All' | LabCategory>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const visible =
    filter === 'All'
      ? EXPERIMENTS
      : EXPERIMENTS.filter((item) => item.category === filter);

  return (
    <>
      <section className="mvph-hero mv-dark" aria-labelledby="lab-hero-heading">
        <div className="mv-wrap mvph-grid">
          <div className="mvph-copy">
            <FramePill label="FRAME 08 — Lab" dark />
            <h1 id="lab-hero-heading" className="mv-hd mv-hd-xl mvph-title">
              Outtakes and <span className="mv-hl-orange">experiments</span>.
            </h1>
            <p className="mvph-sub">Small tools, toys and tests, most of them open source.</p>
            <div className="mvph-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>

          <div className="mvph-lamp-col" aria-hidden="true">
            <div className="mvph-beam" />
            <div className="mvph-lamp">
              <span className="mvph-kelvin">3200K</span>
              <svg viewBox="0 0 120 120" width="96" height="96" fill="none">
                <rect x="30" y="18" width="60" height="44" rx="8" stroke="currentColor" strokeWidth="2.5" />
                <polygon points="22,62 98,62 112,96 8,96" stroke="currentColor" strokeWidth="2.5" fill="rgba(255,91,46,0.16)" />
                <circle cx="60" cy="40" r="10" fill="#FF5B2E" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mv-wrap mvwi-hero-foot">
          <span>MV 400TX · Int. studio — day</span>
          <span>Scroll ↓</span>
        </div>
      </section>

      <section className="mvli-sec mv-lt" aria-label="Lab archive frames">
        <div className="mv-wrap">
          <div className="mvli-bar">
            <span className="mvli-roll">ROLL 02 — Every experiment</span>
            <div className="mvli-filters" role="group" aria-label="Filter experiments by category">
              {LAB_FILTERS.map((cat) => {
                const count =
                  cat === 'All'
                    ? EXPERIMENTS.length
                    : EXPERIMENTS.filter((e) => e.category === cat).length;
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    aria-pressed={active}
                    className={`mvwi-chip ${active ? 'is-on' : ''}`}
                    data-testid={`lab-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span>{cat}</span>
                    <b>{String(count).padStart(2, '0')}</b>
                  </button>
                );
              })}
            </div>
            <span className="mvli-counter">
              {String(visible.length).padStart(2, '0')} of{' '}
              {String(EXPERIMENTS.length).padStart(2, '0')} frames
            </span>
          </div>

          <div className="mvli-grid">
            {visible.map((exp) => {
              const isPlaying = playingId === exp.id;
              return (
                <Link
                  key={exp.id}
                  href={`/lab/${exp.slug}`}
                  onMouseEnter={() => setPlayingId(exp.id)}
                  onMouseLeave={() => setPlayingId(null)}
                  onFocus={() => setPlayingId(exp.id)}
                  onBlur={() => setPlayingId(null)}
                  className={`mvli-card ${isPlaying ? 'is-play' : ''}`}
                >
                  <div className="mvli-sprocket">
                    <span>MV-16 ▸ {exp.index}A</span>
                    <span>{isPlaying ? 'Playing' : 'Still'}</span>
                  </div>
                  <div className="mvli-win">
                    <img
                      src={exp.heroImage}
                      alt={exp.title}
                      width={520}
                      height={340}
                      loading="eager"
                    />
                    <span className="mvli-grain" aria-hidden="true" />
                  </div>
                  <div className="mvli-sprocket-bot">
                    <span>{exp.index}A ◂ 7222</span>
                    <span>Open →</span>
                  </div>
                  <div className="mvli-body">
                    <div className="mvli-meta">
                      <span>{exp.index}</span>
                      <span>
                        {exp.category} · {exp.year}
                      </span>
                    </div>
                    <h2 className="mvli-title">{exp.title}</h2>
                    <p className="mvli-tagline">{exp.tagline}</p>
                    <div className="mvli-tools">
                      {exp.tools.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
