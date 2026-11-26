'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { EXPERIMENTS } from '@/content/experiments';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function LabFilmReel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeFrame, setActiveFrame] = useState(0);

  function stepReel(dir: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(EXPERIMENTS.length - 1, activeFrame + dir));
    setActiveFrame(next);
    el.scrollBy({ left: dir * 380, behavior: 'smooth' });
  }

  return (
    <section
      className="mvlb mv-dark"
      aria-labelledby="lab-reel-heading"
      data-testid="lab-film-reel"
    >
      <div className="mv-wrap mvlb-head">
        <div>
          <FramePill label="FRAME 08 — Playground" dark />
          <h2 id="lab-reel-heading" className="mv-hd mv-hd-lg mvlb-title">
            Outtakes, side projects and experiments.
          </h2>
        </div>

        <div className="mvlb-head-right">
          <p className="mvlb-sub">
            Things I make when nobody is waiting for them. Small tools, toys and tests — most of
            them open source.
          </p>
          <div className="mvlb-controls">
            <span className="mvlb-counter">
              Frame {String(activeFrame + 1).padStart(2, '0')} / 06
            </span>
            <div className="mvlb-nav-btns">
              <button
                type="button"
                onClick={() => stepReel(-1)}
                aria-label="Scroll film reel backward"
                className="mvlb-nav-btn"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => stepReel(1)}
                aria-label="Scroll film reel forward"
                className="mvlb-nav-btn"
              >
                →
              </button>
            </div>
            <ArrowButton label="Visit the lab" href="/lab" variant="solid" />
          </div>
        </div>
      </div>

      <div ref={trackRef} className="mvlb-reel-scroll" aria-label="16mm Lab experiment film strip">
        <div className="mvlb-sprockets" aria-hidden="true" />
        <div className="mvlb-strip">
          <div className="mvlb-leader">
            <div className="mvlb-leader-ring">
              <b>6</b>
            </div>
            <p className="mvlb-leader-title">The lab reel</p>
            <span className="mvlb-leader-meta">16 mm · 6 frames</span>
          </div>

          {EXPERIMENTS.map((exp, idx) => (
            <Link
              key={exp.id}
              href={`/lab/${exp.slug}`}
              onMouseEnter={() => setActiveFrame(idx)}
              onFocus={() => setActiveFrame(idx)}
              className="mvlb-frame"
            >
              <div className="mvlb-frame-top">
                <span>MV-16 ▸ {exp.index}A</span>
              </div>
              <div className="mvlb-win">
                <img
                  src={exp.heroImage}
                  alt={exp.title}
                  width={420}
                  height={280}
                  loading="lazy"
                />
              </div>
              <div className="mvlb-frame-body">
                <h3 className="mvlb-frame-title">{exp.title}</h3>
                <p className="mvlb-frame-meta">
                  {exp.category} · {exp.year}
                </p>
                <div className="mvlb-frame-tools">
                  {exp.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
              <div className="mvlb-frame-bot">
                <span>{exp.index}A ◂ MV-16</span>
              </div>
            </Link>
          ))}

          <div className="mvlb-tail">
            <span>End of reel</span>
          </div>
        </div>
        <div className="mvlb-sprockets" aria-hidden="true" />
      </div>
    </section>
  );
}
