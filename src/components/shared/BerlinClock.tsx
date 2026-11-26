'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

interface BerlinClockProps {
  showSeconds?: boolean;
  showZone?: boolean;
  showAvailabilityNote?: boolean;
  className?: string;
}

interface TimeSnapshot {
  time: string;
  zone: string;
  isOnSet: boolean;
}

function getBerlinSnapshot(withSeconds: boolean): TimeSnapshot {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1') {
      return {
        time: withSeconds ? '18:22:00' : '18:22',
        zone: 'CET',
        isOnSet: false,
      };
    }
  }

  const now = new Date();
  const timeFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: siteConfig.timezone,
    hour: '2-digit',
    minute: '2-digit',
    ...(withSeconds ? { second: '2-digit' } : {}),
    hour12: false,
  }).format(now);

  const hourNum = Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: siteConfig.timezone,
      hour: '2-digit',
      hour12: false,
    }).format(now)
  );

  const tzParts = new Intl.DateTimeFormat('en-GB', {
    timeZone: siteConfig.timezone,
    timeZoneName: 'short',
  }).formatToParts(now);
  const tzName = tzParts.find((p) => p.type === 'timeZoneName')?.value || 'CET';

  const isOnSet =
    hourNum >= siteConfig.availability.businessHours.startHour &&
    hourNum < siteConfig.availability.businessHours.endHour;

  return {
    time: timeFmt,
    zone: tzName,
    isOnSet,
  };
}

export function BerlinClock({
  showSeconds = false,
  showZone = false,
  showAvailabilityNote = false,
  className = '',
}: BerlinClockProps) {
  const [snap, setSnap] = useState<TimeSnapshot>({
    time: showSeconds ? '18:22:00' : '18:22',
    zone: 'CET',
    isOnSet: false,
  });

  useEffect(() => {
    setSnap(getBerlinSnapshot(showSeconds));
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1') return;

    const timer = window.setInterval(
      () => {
        setSnap(getBerlinSnapshot(showSeconds));
      },
      showSeconds ? 1000 : 15000
    );

    return () => window.clearInterval(timer);
  }, [showSeconds]);

  return (
    <span className={className} data-testid="berlin-clock">
      <span>{snap.time}</span>
      {showZone && <span className="mv-clock-zone"> {snap.zone}</span>}
      {showAvailabilityNote && (
        <span className="mv-clock-note" style={{ display: 'block', marginTop: 6 }}>
          {snap.isOnSet
            ? siteConfig.availability.businessHours.onSetText
            : siteConfig.availability.businessHours.offSetText}
        </span>
      )}
    </span>
  );
}
