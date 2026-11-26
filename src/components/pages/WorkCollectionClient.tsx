'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { PROJECT_CATEGORIES, PROJECTS } from '@/content/projects';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';
import type { ProjectCategory } from '@/types/portfolio';

export function WorkCollectionClient() {
  const [category, setCategory] = useState<'All' | ProjectCategory>('All');
  const [mode, setMode] = useState<'sheet' | 'list'>('sheet');

  const filtered =
    category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  return (
    <>
      <section className="mvwi-hero mv-dark" aria-labelledby="work-hero-heading">
        <div className="mv-wrap mvwi-hero-inner">
          <div className="mvwi-hero-copy">
            <FramePill label="FRAME 02 — Work" dark />
            <h1 id="work-hero-heading" className="mv-hd mv-hd-xl mvwi-hero-title">
              Work I’m <span className="mv-hl-orange">proud</span> of.
            </h1>
            <p className="mvwi-hero-sub">
              Eight projects from the last few years, from the first sketch to the shipped release,
              with the role I played and what changed.
            </p>
            <div className="mvwi-hero-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>

          <div className="mvwi-strip-wrap" aria-hidden="true">
            <div className="mvwi-strip-track">
              {[...PROJECTS, ...PROJECTS].slice(0, 12).map((p, i) => (
                <div key={`${p.id}-${i}`} className="mvwi-strip-card">
                  <span>MV 400TX · {p.frameNumber}A</span>
                  <img src={p.heroImage} alt="" width={320} height={200} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mv-wrap mvwi-hero-foot">
          <span>MV 400TX · Int. studio — day</span>
          <span>Scroll ↓</span>
        </div>
      </section>

      <section className="mvwi-body mv-lt" aria-label="Portfolio collection">
        <div className="mv-wrap">
          <div className="mvwi-section-head">
            <div>
              <span className="mvwi-kicker">ROLL 07 — 8 projects</span>
              <h2 className="mv-hd mv-hd-md mvwi-section-title">Every frame, in order.</h2>
            </div>
            <p className="mvwi-section-sub">
              Filter by the kind of work, or switch to the list if you know what you’re looking for.
            </p>
          </div>

          <div className="mvwi-bar">
            <div className="mvwi-filters" role="group" aria-label="Filter projects by category">
              <span className="mvwi-bar-lbl">Show</span>
              {PROJECT_CATEGORIES.map((cat) => {
                const count =
                  cat === 'All'
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.category === cat).length;
                const active = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={active}
                    className={`mvwi-chip ${active ? 'is-on' : ''}`}
                    data-testid={`work-filter-${cat.toLowerCase()}`}
                  >
                    <span>{cat}</span>
                    <b>{String(count).padStart(2, '0')}</b>
                  </button>
                );
              })}
            </div>

            <div className="mvwi-modes" role="group" aria-label="Presentation mode">
              <button
                type="button"
                onClick={() => setMode('sheet')}
                aria-pressed={mode === 'sheet'}
                className={`mvwi-mode-btn ${mode === 'sheet' ? 'is-on' : ''}`}
                data-testid="work-mode-sheet"
              >
                Sheet
              </button>
              <button
                type="button"
                onClick={() => setMode('list')}
                aria-pressed={mode === 'list'}
                className={`mvwi-mode-btn ${mode === 'list' ? 'is-on' : ''}`}
                data-testid="work-mode-list"
              >
                List
              </button>
            </div>
          </div>

          <div className="mvwi-table-meta">
            <span>
              Exposed <b>{String(filtered.length).padStart(2, '0')}</b> /{' '}
              {String(PROJECTS.length).padStart(2, '0')}
            </span>
            <span>Light table · Roll 07 · {filtered.length} exposures · Mara Voss</span>
          </div>

          {mode === 'sheet' ? (
            <div className="mvwi-sheet-grid" data-testid="work-sheet-view">
              {filtered.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="mvwi-card"
                >
                  <div className="mvwi-card-sprocket">
                    <span>{project.frameNumber}A ▸</span>
                    <span>MV 400TX {idx + 1}</span>
                  </div>
                  <div className="mvwi-card-img">
                    <img
                      src={project.heroImage}
                      alt={project.heroAlt}
                      width={640}
                      height={400}
                      loading="lazy"
                    />
                    <span className="mvwi-card-badge">{project.outcomeShort}</span>
                  </div>
                  <div className="mvwi-card-info">
                    <div className="mvwi-card-left">
                      <h3 className="mvwi-card-title">{project.title}</h3>
                      <p className="mvwi-card-client">
                        {project.client} · {project.year}
                      </p>
                    </div>
                    <div className="mvwi-card-right">
                      <span className="mvwi-card-role-lbl">Role</span>
                      <span className="mvwi-card-role">{project.role}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mvwi-list-view" data-testid="work-list-view">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="mvwi-list-row"
                >
                  <span className="mvwi-list-num">{project.frameNumber}A</span>
                  <span className="mvwi-list-title">{project.title}</span>
                  <span className="mvwi-list-client">{project.client}</span>
                  <span className="mvwi-list-cat">{project.categoryLabel}</span>
                  <span className="mvwi-list-role">{project.role}</span>
                  <span className="mvwi-list-outcome">{project.outcomeShort}</span>
                  <span className="mvwi-list-year">{project.year}</span>
                  <span className="mvwi-list-arr" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
