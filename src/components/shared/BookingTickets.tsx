import Link from 'next/link';
import React from 'react';
import { BOOKING_TICKETS } from '@/content/booking';

export function BookingTickets() {
  return (
    <div className="mvct-tix" role="list" aria-label="Next available project start dates">
      {BOOKING_TICKETS.map((ticket) => (
        <Link
          key={ticket.id}
          href={`/contact?start=${encodeURIComponent(ticket.queryValue)}`}
          className="mvct-tk"
          role="listitem"
        >
          <span className="mvct-tk-meta">
            <span className="mvct-tk-start">Start</span>
            <span className="mvct-tk-no">No. {ticket.number}</span>
          </span>
          <span className="mvct-tk-date">{ticket.date}</span>
          <span className="mvct-tk-admit">{ticket.admitLabel}</span>
        </Link>
      ))}
    </div>
  );
}
