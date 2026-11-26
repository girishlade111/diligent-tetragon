import React from 'react';
import { siteConfig } from '@/config/site';
import { ArrowButton } from './ArrowButton';
import { BookingTickets } from './BookingTickets';
import { ClipboardEmail } from './ClipboardEmail';
import { FramePill } from './FramePill';
import { OnAirSign } from './OnAirSign';

export function ContactCTA() {
  return (
    <section className="mvct mv-lt" aria-labelledby="contact-cta-heading">
      <div className="mv-wrap mvct-grid">
        <div className="mvct-left">
          <FramePill label="FRAME 10 — Contact" />
          <h2 id="contact-cta-heading" className="mv-hd mvct-title mv-it">
            <span className="mv-hd-l">Have a project?</span>
            <span className="mv-hd-l">Let’s shoot.</span>
          </h2>
          <p className="mvct-sub">
            Tell me what you are making. I reply within a day with next steps and a rough plan.
          </p>
          <div className="mvct-actions">
            <ArrowButton label="Start a project" href="/contact" variant="solid" />
            <ClipboardEmail variant="cta" />
          </div>
        </div>

        <aside className="mvct-right" aria-label="Availability and next project start dates">
          <OnAirSign />
          <div className="mvct-avail">
            <span className="mvct-k">Booking now for</span>
            <p className="mvct-status">
              <span className="mv-port" aria-hidden="true" />
              <span>{siteConfig.availability.statusLabel}</span>
            </p>
          </div>
          <div className="mvct-dates">
            <span className="mvct-k">Next start dates</span>
            <BookingTickets />
          </div>
        </aside>
      </div>
    </section>
  );
}
