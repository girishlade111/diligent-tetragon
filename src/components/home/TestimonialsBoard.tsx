import React from 'react';
import { TESTIMONIALS } from '@/content/testimonials';
import { FramePill } from '@/components/shared/FramePill';

export function TestimonialsBoard() {
  return (
    <section
      className="mvps mv-lt"
      aria-labelledby="testimonials-heading"
      data-testid="testimonials-board"
    >
      <div className="mv-wrap mvps-head">
        <div>
          <FramePill label="FRAME 07 — Kind words" />
          <h2 id="testimonials-heading" className="mv-hd mv-hd-lg mvps-title">
            What <span className="mv-hl-orange">clients</span> say.
          </h2>
        </div>

        <div className="mvps-head-right">
          <p className="mvps-sub">
            Cut out and kept. A few words from the people I’ve designed and shipped with.
          </p>
          <p className="mvps-filed">
            <span>Clippings filed</span>
            <b>05 / 05</b>
          </p>
        </div>
      </div>

      <div className="mv-wrap mvps-grid">
        {TESTIMONIALS.map((item) => (
          <article
            key={item.id}
            className="mvps-it is-down"
            style={{
              ['--r' as string]: item.rotation,
              ['--tr' as string]: item.tapeRotation,
            }}
          >
            <div className="mvps-tape" aria-hidden="true" />
            <div className="mvps-top">
              <span className="mvps-no">No. {item.index}</span>
              <span className="mvps-re">{item.clientLabel}</span>
            </div>
            <p className="mvps-quote">
              <span className="mvps-qmark" aria-hidden="true">
                “
              </span>
              {item.quote}
            </p>
            <div className="mvps-author">
              <div className="mvps-ph">
                <img
                  src={item.avatar}
                  alt={`Portrait of ${item.author}, ${item.role}`}
                  width={48}
                  height={48}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="mvps-name">{item.author}</p>
                <p className="mvps-role">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
