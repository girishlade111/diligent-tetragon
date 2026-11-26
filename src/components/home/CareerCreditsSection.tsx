'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RESUME_AWARDS, RESUME_EDUCATION, RESUME_EXPERIENCE } from '@/content/resume';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

function formatTimecode(progress: number): string {
  const totalFrames = Math.round(progress * 24 * 60);
  const ff = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  return `00:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;
}

export function CareerCreditsSection() {
  const secRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1') {
      setProgress(0);
      return;
    }

    function onScroll() {
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 900;
      const total = Math.max(1, el.offsetHeight - vh);
      const passed = Math.max(0, Math.min(total, -rect.top));
      setProgress(passed / total);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={secRef}
      className="mvcr mv-dark"
      aria-labelledby="credits-heading"
      data-testid="career-credits"
    >
      <div className="mvcr-sticky">
        <div className="mv-wrap mvcr-frame">
          <div className="mvcr-corners" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="mvcr-top">
            <div className="mvcr-head-left">
              <FramePill label="FRAME 06 — Résumé" dark />
              <h2 id="credits-heading" className="mv-hd mv-hd-lg mvcr-title">
                The credits.
              </h2>
              <div className="mvcr-btns">
                <ArrowButton
                  label="Download résumé"
                  href="/api/resume-pdf"
                  variant="solid"
                  download
                />
                <ArrowButton label="Full résumé" href="/resume" variant="ghost" />
              </div>
            </div>

            <div className="mvcr-reel-tag">
              <span>End credits</span>
              <span>Reel 06 · 24 fps</span>
            </div>
          </div>

          <div className="mvcr-scroll-win">
            <div className="mvcr-roll">
              <p className="mvcr-prod">A Mara Voss production</p>
              <p className="mvcr-years">9 years in production</p>

              <div className="mvcr-block">
                <h3 className="mvcr-cat">Work</h3>
                {RESUME_EXPERIENCE.map((job) => (
                  <div key={job.id} className="mvcr-hit">
                    <div className="mvcr-row">
                      <span className="mvcr-role">
                        <span>{job.role}</span>
                        <em>{job.period}</em>
                      </span>
                      <span className="mvcr-co">{job.company}</span>
                    </div>
                    <p className="mvcr-sum">
                      <span>{job.summary}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mvcr-block">
                <h3 className="mvcr-cat">Education</h3>
                {RESUME_EDUCATION.map((ed) => (
                  <div key={ed.school} className="mvcr-hit">
                    <div className="mvcr-row">
                      <span className="mvcr-role">
                        <span>{ed.degree}</span>
                        <em>{ed.period}</em>
                      </span>
                      <span className="mvcr-co">{ed.school}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mvcr-block">
                <h3 className="mvcr-cat">Awards</h3>
                {RESUME_AWARDS.map((aw) => (
                  <div key={aw.organization} className="mvcr-hit">
                    <div className="mvcr-row">
                      <span className="mvcr-role">
                        <span>{aw.title}</span>
                        <em>{aw.year}</em>
                      </span>
                      <span className="mvcr-co">{aw.organization}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mvcr-outro">
                <span>Directed &amp; built by</span>
                <strong>Mara Voss</strong>
                <span>Shot on location in Berlin</span>
              </div>
            </div>
          </div>

          <div className="mvcr-bot">
            <span>Résumé · Mara Voss</span>
            <span className="mvcr-tc">
              <b aria-hidden="true" />
              TC {formatTimecode(progress)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
