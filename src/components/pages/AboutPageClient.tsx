'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/content/assets';
import {
  ABOUT_PRINCIPLES,
  CURRENTLY_ITEMS,
  OFFSET_FRAMES,
  TIMELINE_EVENTS,
} from '@/content/timeline';
import { CareerCreditsSection } from '@/components/home/CareerCreditsSection';
import { DesignCodeToolkit } from '@/components/home/DesignCodeToolkit';
import { TestimonialsBoard } from '@/components/home/TestimonialsBoard';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function AboutPageClient() {
  const [activeYear, setActiveYear] = useState(0);

  return (
    <>
      <section className="mvab-hero mv-lt" aria-labelledby="about-page-heading">
        <div className="mv-wrap mvab-hero-grid">
          <div className="mvab-hero-copy">
            <FramePill label="FRAME 00 — About" />
            <h1 id="about-page-heading" className="mv-hd mv-hd-xl mvab-hero-title">
              Designer by trade, <span className="mv-hl-orange">developer</span> by habit.
            </h1>
            <p className="mvab-hero-sub">
              I’m Mara Voss, a product designer who also writes the code. For 9 years I’ve taken
              products from a messy first brief to a release people use every day — without the
              usual gap between design and build.
            </p>
            <dl className="mvab-facts">
              {siteConfig.aboutFacts.map((fact) => (
                <div key={fact.index} className="mvab-fact">
                  <dt>{fact.index}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mvab-hero-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>

          <div className="mvab-hero-portrait">
            <div className="mvab-portrait-card">
              <span className="mvab-card-tag">Backdrop · Clay · Take 01</span>
              <img
                src={ASSETS.portraits.maraCutout}
                alt="Portrait of Mara Voss"
                width={640}
                height={830}
              />
              <span className="mvab-card-meta">f/2.8 · 1/125 · ISO 100</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mvab-story mv-dark" aria-labelledby="story-heading">
        <div className="mv-wrap">
          <div className="mvab-story-head">
            <div>
              <FramePill label="FRAME 01 — The story" dark />
              <h2 id="story-heading" className="mv-hd mv-hd-lg mvab-story-title">
                The story, frame by frame.
              </h2>
            </div>
            <span className="mvab-roll-label">Contact print · Roll 01 · 6 frames</span>
          </div>

          <div className="mvab-timeline-grid">
            {TIMELINE_EVENTS.map((ev, idx) => {
              const isSelected = idx === activeYear;
              return (
                <button
                  key={ev.year}
                  type="button"
                  onClick={() => setActiveYear(idx)}
                  onMouseEnter={() => setActiveYear(idx)}
                  className={`mvab-tl-card ${isSelected ? 'is-a is-done' : ''}`}
                >
                  <span className="mvab-tl-code">{ev.frameCode}</span>
                  <div className="mvab-tl-photo" data-story-photo>
                    <img
                      src={ev.image}
                      alt={`${ev.year}: ${ev.title}`}
                      width={480}
                      height={320}
                      loading="eager"
                    />
                  </div>
                  <span className="mvab-tl-year">{ev.year}</span>
                  <span className="mvab-tl-title">{ev.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mvab-rules mv-lt" aria-labelledby="principles-heading">
        <div className="mv-wrap">
          <FramePill label="FRAME 02 — How I work" />
          <h2 id="principles-heading" className="mv-hd mv-hd-lg mvab-rules-title">
            Three rules I <span className="mv-hl-orange">keep</span>.
          </h2>
          <div className="mvab-rules-grid">
            {ABOUT_PRINCIPLES.map((rule) => (
              <article key={rule.number} className="mvab-rule-card">
                <span className="mvab-rule-num">{rule.number}</span>
                <h3 className="mvab-rule-title">{rule.title}</h3>
                <p className="mvab-rule-body">{rule.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mvab-offset mv-dark" aria-labelledby="offset-heading">
        <div className="mv-wrap mvab-offset-grid">
          <div className="mvab-offset-left">
            <FramePill label="FRAME 03 — Off set" dark />
            <h2 id="offset-heading" className="mv-sr">
              Studio snapshots from Berlin
            </h2>
            <div className="mvab-polaroids">
              {OFFSET_FRAMES.map((frame) => (
                <figure
                  key={frame.caption}
                  className="mvab-print"
                  style={{ ['--rot' as string]: frame.rotate }}
                >
                  <div className="mvab-print-img">
                    <img
                      src={frame.image}
                      alt={frame.caption}
                      width={360}
                      height={440}
                      loading="eager"
                    />
                    <span className="mvab-glint" aria-hidden="true" />
                  </div>
                  <figcaption>{frame.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <aside className="mvab-cur" style={{ ['--rot' as string]: '1.2deg' }}>
            <div className="mvab-cur-head">
              <h3>Currently</h3>
              <span>Updated Sep 2026</span>
            </div>
            <dl className="mvab-cur-list">
              {CURRENTLY_ITEMS.map((item) => (
                <div key={item.label} className="mvab-cur-row">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <DesignCodeToolkit />
      <CareerCreditsSection />
      <TestimonialsBoard />
    </>
  );
}
