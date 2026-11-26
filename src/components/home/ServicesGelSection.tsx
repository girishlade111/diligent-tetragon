'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ASSETS } from '@/content/assets';
import { SERVICES } from '@/content/services';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function ServicesGelSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const current = SERVICES[activeIndex] || SERVICES[0];

  return (
    <section
      className="mvsv mv-lt"
      aria-labelledby="services-home-heading"
      data-testid="services-gel-section"
    >
      <div className="mv-wrap mvsv-head">
        <div>
          <FramePill label="FRAME 03 — Services" />
          <h2 id="services-home-heading" className="mv-hd mv-hd-lg mvsv-title">
            What I can <span className="mv-hl-ul">do</span> for you.
          </h2>
        </div>
        <ArrowButton label="All services" href="/services" variant="ghost" />
      </div>

      <div className="mv-wrap mvsv-grid">
        <div className="mvsv-list">
          {SERVICES.map((service, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                className={`mvsv-row ${isActive ? 'is-act' : ''}`}
                style={{ ['--gel' as string]: service.gelColor }}
                data-testid={`service-row-${service.index}`}
              >
                <span className="mvsv-num">{service.index}</span>
                <div className="mvsv-row-body">
                  <h3 className="mvsv-row-title">{service.title}</h3>
                  <p className="mvsv-row-desc">{service.shortDesc}</p>
                  {isActive && (
                    <ul className="mvsv-tags" aria-label={`${service.title} deliverables`}>
                      {service.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="mvsv-arr" aria-hidden="true">
                  →
                </span>
              </Link>
            );
          })}
        </div>

        <aside className="mvsv-stage" aria-label="Lighting gel preview for active service">
          <div className="mvsv-stage-top">
            <span className="mvsv-stage-counter">
              <b>{current.index}</b> / 04 · {current.title}
            </span>
          </div>

          <div className="mvsv-photo-frame">
            <img
              src={ASSETS.services.homeStudioStill}
              alt={`Mara Voss studio equipment lit with ${current.title} gel filter`}
              width={720}
              height={900}
              className="mvsv-photo"
            />
            {SERVICES.map((service, idx) => (
              <div
                key={service.id}
                className={`mvsv-gel ${idx === activeIndex ? 'is-on' : ''}`}
                style={{ background: service.gelColor }}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="mvsv-gels-bar">
            {SERVICES.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`mvsv-gel-chip ${idx === activeIndex ? 'is-on' : ''}`}
                aria-pressed={idx === activeIndex}
              >
                <i style={{ background: service.gelColor }} aria-hidden="true" />
                <span>
                  {service.index} · {service.gelColor}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
