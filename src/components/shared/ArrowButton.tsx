'use client';

import Link from 'next/link';
import React from 'react';

export interface ArrowButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'ghost' | 'orange';
  quiet?: boolean;
  noArrow?: boolean;
  external?: boolean;
  download?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

function ArrowGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      width="15"
      height="15"
    >
      <path
        d="M3.5 12.5L12.5 3.5M12.5 3.5H5.5M12.5 3.5V10.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowButton({
  label,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  quiet = false,
  noArrow = false,
  external = false,
  download = false,
  disabled = false,
  className = '',
  ariaLabel,
}: ArrowButtonProps) {
  const variantClass =
    variant === 'ghost'
      ? 'mv-ghost'
      : variant === 'orange'
        ? 'mv-orange'
        : 'mv-solid';
  const classes = [
    'mv-btn',
    variantClass,
    quiet ? 'mv-quiet' : '',
    noArrow ? 'mv-noarr' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <span className="mv-face">
      <span className="mv-fill" aria-hidden="true" />
      <span className="mv-lbl">
        <span className="mv-roll">
          <span className="mv-l1">{label}</span>
          <span className="mv-l2" aria-hidden="true">
            {label}
          </span>
        </span>
      </span>
      {!noArrow && (
        <span className="mv-arr" aria-hidden="true">
          <span className="mv-a1">
            <ArrowGlyph />
          </span>
          <span className="mv-a2">
            <ArrowGlyph />
          </span>
        </span>
      )}
    </span>
  );

  if (href) {
    if (external || download || href.startsWith('mailto:') || href.startsWith('/api/')) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel || label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(download ? { download: true } : {})}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} aria-label={ariaLabel || label}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel || label}
    >
      {inner}
    </button>
  );
}
