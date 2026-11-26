'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/content/projects';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function SelectedWorkContactSheet() {
  const secRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualLock, setManualLock] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1' || manualLock) return;

    function onScroll() {
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const span = Math.max(1, el.offsetHeight - vh);
      const passed = Math.max(0, Math.min(span, -rect.top));
      const ratio = passed / span;
      const idx = Math.min(PROJECTS.length - 1, Math.floor(ratio * PROJECTS.length));
      setActiveIndex(idx);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [manualLock]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <section
      ref={secRef}
      className="mvwk mv-dark"
      aria-labelledby="selected-work-heading"
      data-testid="selected-work-section"
    >
      <div className="mv-wrap mvwk-head">
        <div className="mvwk-head-left">
          <FramePill label="FRAME 02 — Selected work" dark />
          <h2 id="selected-work-heading" className="mv-hd mv-hd-lg mvwk-title">
            Work I’m <span className="mv-hl-orange">proud</span> of.
          </h2>
        </div>
        <ArrowButton label="All projects" href="/work" variant="ghost" />
      </div>

      <div className="mv-wrap mvwk-grid">
        <div className="mvwk-sheet" aria-label="Film contact sheet, Roll 07">
          <div className="mvwk-sheet-head">
            <span>Contact sheet · Roll 07</span>
            <span>08 exp.</span>
          </div>

          <div className="mvwk-frames" role="tablist" aria-label="Featured project frames">
            {PROJECTS.map((project, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => {
                    setActiveIndex(idx);
                    setManualLock(true);
                  }}
                  onDoubleClick={() => setLightboxOpen(true)}
                  className={`mvwk-fr ${isCurrent ? 'is-cur' : ''}`}
                  data-testid={`contact-sheet-frame-${project.frameNumber}`}
                >
                  <span className="mvwk-fr-top">
                    <span>{project.frameNumber}A</span>
                    <span>MV 400TX {idx + 1}</span>
                  </span>
                  <span className="mvwk-fr-img">
                    <img
                      src={project.heroImage}
                      alt={project.heroAlt}
                      width={480}
                      height={300}
                      loading="lazy"
                    />
                    {isCurrent && (
                      <svg
                        className="mvwk-ring"
                        viewBox="0 0 220 150"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M18,74 C16,24 68,10 118,12 C176,14 208,38 205,78 C202,120 158,140 104,138 C48,136 21,110 24,62"
                          stroke="#FF5B2E"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="mvwk-fr-bot">
                    <span>{project.title}</span>
                    <span>{project.year}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mvwk-sheet-note">Click a frame to enlarge it</p>
        </div>

        <div className="mvwk-stage">
          <div className="mvwk-preview">
            <div className="mvwk-count-row">
              <span className="mvwk-mono-lbl">Frame {activeProject.frameNumber}A</span>
              <span className="mvwk-cnt">
                <b>{activeProject.frameNumber}</b> / 08
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="mvwk-pi-btn"
              aria-label={`Enlarge frame for ${activeProject.title}`}
            >
              <span className="mvwk-pi is-cur">
                <img
                  key={activeProject.slug}
                  src={activeProject.heroImage}
                  alt={activeProject.heroAlt}
                  width={960}
                  height={600}
                />
                <span className="mvwk-lp" aria-hidden="true">
                  Loupe · Click to enlarge
                </span>
              </span>
            </button>

            <div className="mvwk-info">
              <div className="mvwk-info-main">
                <h3 className="mvwk-proj-title">{activeProject.title}</h3>
                <p className="mvwk-proj-meta">
                  {activeProject.client} · {activeProject.categoryLabel} · {activeProject.year} —{' '}
                  {activeProject.frameNumber} of 08
                </p>
              </div>
              <div className="mvwk-info-role">
                <span className="mvwk-mono-lbl">Role</span>
                <p className="mvwk-role-val">{activeProject.role}</p>
                <span className="mvwk-outcome">{activeProject.outcomeShort}</span>
              </div>
              <div className="mvwk-info-cta">
                <ArrowButton
                  label="Open case"
                  href={`/work/${activeProject.slug}`}
                  variant="solid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="mv-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProject.title} enlarged frame`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="mv-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="mv-lightbox-head">
              <span>
                {activeProject.frameCode} · {activeProject.title}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="mv-lightbox-close"
              >
                Close (ESC)
              </button>
            </div>
            <img
              src={activeProject.heroImage}
              alt={activeProject.heroAlt}
              width={1200}
              height={750}
            />
            <div className="mv-lightbox-foot">
              <p>{activeProject.summary}</p>
              <Link href={`/work/${activeProject.slug}`} className="mv-lightbox-link">
                Read case study →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
