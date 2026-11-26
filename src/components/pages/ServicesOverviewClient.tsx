'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { RATE_CARD, SERVICES } from '@/content/services';
import { WorkflowCallSheet } from '@/components/home/WorkflowCallSheet';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function ServicesOverviewClient() {
  const [selectedGel, setSelectedGel] = useState(0);

  return (
    <>
      <section className="mvsg-hero mv-lt" aria-labelledby="services-hero-heading">
        <div className="mv-wrap mvsg-hero-inner">
          <div className="mvsg-hero-copy">
            <FramePill label="FRAME 03 — Services" />
            <h1 id="services-hero-heading" className="mv-hd mv-hd-xl mvsg-title">
              What I can <span className="mv-hl-box">do</span> for you.
            </h1>
            <p className="mvsg-sub">
              Four ways to work together, from a one-week sprint to a full product built and
              shipped.
            </p>
            <div className="mvsg-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>

          <div className="mvsg-gel-swatches" role="group" aria-label="Service lighting gels">
            {SERVICES.map((svc, idx) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => setSelectedGel(idx)}
                className={`mvsg-swatch ${selectedGel === idx ? 'is-on' : ''}`}
                aria-pressed={selectedGel === idx}
              >
                <span className="mvsg-swatch-glow" style={{ background: svc.gelColor }} />
                <span className="mvsg-swatch-meta">
                  Gel {svc.gelNumber} · {svc.gelColor}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mv-wrap mvwi-hero-foot">
          <span>MV 400TX · Int. studio — day</span>
          <span>Scroll ↓</span>
        </div>
      </section>

      <section className="mvsg-pack mv-lt" aria-labelledby="gel-pack-heading">
        <div className="mv-wrap">
          <div className="mvsg-pack-head">
            <div>
              <FramePill label="FRAME 01 — The gel pack" />
              <h2 id="gel-pack-heading" className="mv-sr">
                Service catalog and deliverables
              </h2>
              <p className="mvsg-pack-intro">
                Four ways I can help. Each one is scoped, priced and planned before we start, and
                every one ends with something shipped.
              </p>
            </div>
            <span className="mvsg-pack-badge">4 gels · 1 lens</span>
          </div>

          <div className="mvsg-cards-grid">
            {SERVICES.map((svc) => (
              <article key={svc.id} className="mvsg-card">
                <div className="mvsg-card-media">
                  <img
                    src={svc.heroImage}
                    alt={`${svc.title} studio photography`}
                    width={640}
                    height={400}
                    loading="eager"
                  />
                  <span className="mvsg-card-gel" style={{ background: svc.gelColor }} />
                  <span className="mvsg-card-gel-tag">
                    Gel {svc.gelNumber} · {svc.gelColor}
                  </span>
                </div>
                <div className="mvsg-card-body">
                  <div className="mvsg-card-meta">
                    <span>{svc.index} / 04</span>
                    <span>{svc.deliverables.length} deliverables</span>
                  </div>
                  <h3 className="mvsg-card-title">{svc.title}</h3>
                  <p className="mvsg-card-short">{svc.shortDesc}</p>
                  <p className="mvsg-card-full">{svc.fullDesc}</p>
                  <ul className="mvsg-card-delivs">
                    {svc.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <div className="mvsg-card-actions">
                    <ArrowButton
                      label="Details"
                      href={`/services/${svc.slug}`}
                      variant="solid"
                      quiet
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mvsg-rate-card" aria-labelledby="rate-card-heading">
            <div className="mvsg-rate-left">
              <span className="mvsg-rate-k">Rate card</span>
              <h3 id="rate-card-heading" className="mvsg-rate-h">
                Three ways to work together
              </h3>
            </div>
            <div className="mvsg-rate-items">
              {RATE_CARD.map((item) => (
                <div key={item.number} className="mvsg-rate-item">
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
            <ArrowButton label="Ask about rates" href="/contact" variant="solid" />
          </div>
        </div>
      </section>

      <WorkflowCallSheet />
    </>
  );
}
