'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import {
  RESUME_AWARDS,
  RESUME_EDUCATION,
  RESUME_EXPERIENCE,
  RESUME_LANGUAGES,
  RESUME_PROFILE,
  RESUME_SKILLS,
} from '@/content/resume';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function ResumeSheetClient() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'mara-voss-studio': true,
    'loop-bank': false,
    'pulse-analytics': false,
    'studio-north': false,
  });

  function toggleJob(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="mvrs-page mv-lt" aria-labelledby="resume-name-heading">
      <div className="mv-wrap mvrs-toolbar no-print">
        <div className="mvrs-toolbar-left">
          <FramePill label="FRAME 00 — Résumé" />
          <span className="mvrs-meta">Updated Sep 2026 · A4</span>
        </div>
        <div className="mvrs-toolbar-actions">
          <ArrowButton
            label="Print"
            variant="ghost"
            onClick={() => {
              if (typeof window !== 'undefined') window.print();
            }}
          />
          <ArrowButton
            label="Download PDF"
            href="/api/resume-pdf"
            variant="solid"
            download
          />
        </div>
      </div>

      <div className="mv-wrap">
        <article className="mvrs-sheet print-only-sheet" data-testid="resume-a4-sheet">
          <div className="mvrs-sheet-top">
            <span>Résumé · Mara Voss</span>
            <span>Proof 01</span>
          </div>

          <header className="mvrs-header">
            <div>
              <h1 id="resume-name-heading" className="mvrs-name">
                Mara Voss
              </h1>
              <p className="mvrs-subtitle">Product designer &amp; developer</p>
            </div>
            <ul className="mvrs-contact-list">
              <li>
                <span className="mv-port" aria-hidden="true" />
                <span>{siteConfig.availability.statusLabel}</span>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>{siteConfig.location}</li>
              <li>{siteConfig.domain}</li>
              {siteConfig.socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <section className="mvrs-profile" aria-labelledby="resume-profile-h">
            <h2 id="resume-profile-h" className="mvrs-sec-k">
              Profile
            </h2>
            <p className="mvrs-profile-p">{RESUME_PROFILE}</p>
          </section>

          <div className="mvrs-cols">
            <section aria-labelledby="resume-exp-h">
              <h2 id="resume-exp-h" className="mvrs-sec-k">
                Experience
              </h2>
              <div className="mvrs-exp-list">
                {RESUME_EXPERIENCE.map((job) => {
                  const isOpen = !!expanded[job.id];
                  return (
                    <div key={job.id} className={`mvrs-job ${isOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        onClick={() => toggleJob(job.id)}
                        aria-expanded={isOpen}
                        className="mvrs-job-btn"
                        data-testid={`resume-toggle-${job.id}`}
                      >
                        <div className="mvrs-job-head">
                          <span className="mvrs-job-period">{job.period}</span>
                          <span className="mvrs-job-plus" aria-hidden="true">
                            +
                          </span>
                        </div>
                        <h3 className="mvrs-job-role">{job.role}</h3>
                        <p className="mvrs-job-co">{job.company}</p>
                        <p className="mvrs-job-sum">{job.summary}</p>
                      </button>
                      <div className="mvrs-more">
                        <ul>
                          {job.highlights.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="mvrs-side" aria-label="Skills, tools, education, and awards">
              <div className="mvrs-side-block">
                <h2 className="mvrs-sec-k">Skills</h2>
                <div className="mvrs-skills-grid">
                  <div>
                    <h3 className="mvrs-sub-k">Design</h3>
                    <ul>
                      {RESUME_SKILLS.design.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mvrs-sub-k">Code</h3>
                    <ul>
                      {RESUME_SKILLS.code.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mvrs-side-block">
                <h2 className="mvrs-sec-k">Tools</h2>
                <div className="mvrs-tools-pills">
                  {RESUME_SKILLS.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="mvrs-side-block">
                <h2 className="mvrs-sec-k">Education</h2>
                {RESUME_EDUCATION.map((ed) => (
                  <div key={ed.school} className="mvrs-edu-item">
                    <span className="mvrs-edu-yr">{ed.period}</span>
                    <h3>{ed.degree}</h3>
                    <p>{ed.school}</p>
                    <p className="mvrs-edu-note">{ed.note}</p>
                  </div>
                ))}
              </div>

              <div className="mvrs-side-block">
                <h2 className="mvrs-sec-k">Awards</h2>
                {RESUME_AWARDS.map((aw) => (
                  <div key={aw.organization} className="mvrs-edu-item">
                    <span className="mvrs-edu-yr">{aw.year}</span>
                    <h3>{aw.title}</h3>
                    <p>{aw.organization}</p>
                    <p className="mvrs-edu-note">{aw.note}</p>
                  </div>
                ))}
              </div>

              <div className="mvrs-side-block">
                <h2 className="mvrs-sec-k">Languages</h2>
                <ul className="mvrs-lang-list">
                  {RESUME_LANGUAGES.map((l) => (
                    <li key={l.name}>
                      <span>{l.name}</span>
                      <span>{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
