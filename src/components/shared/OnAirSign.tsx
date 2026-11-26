import React from 'react';

interface OnAirSignProps {
  compact?: boolean;
  className?: string;
}

export function OnAirSign({ compact = false, className = '' }: OnAirSignProps) {
  return (
    <div
      className={`mvct-sign ${compact ? 'is-compact' : ''} ${className}`.trim()}
      aria-label="ON AIR — Studio 1, Recording"
    >
      <div className="mvct-sign-box">
        <span className="mvct-onair-txt">
          ON <span className="mvct-flk">AIR</span>
        </span>
      </div>
      {!compact && <span className="mvct-studio-tag">Studio 1 · Rec</span>}
    </div>
  );
}
