'use client';

import React from 'react';

interface FramePillProps {
  label: string;
  square?: boolean;
  dark?: boolean;
  className?: string;
}

export function FramePill({
  label,
  square = false,
  dark = false,
  className = '',
}: FramePillProps) {
  return (
    <span
      className={`mv-eb ${square ? 'is-sq' : ''} is-on ${className}`.trim()}
      style={
        dark
          ? {
              color: 'var(--mv-cloud)',
              background: 'color-mix(in srgb, var(--mv-cloud) 9%, transparent)',
              boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--mv-cloud) 18%, transparent)',
            }
          : undefined
      }
    >
      <i aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
