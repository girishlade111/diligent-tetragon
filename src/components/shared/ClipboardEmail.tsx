'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

interface ClipboardEmailProps {
  variant?: 'cta' | 'card' | 'inline';
  className?: string;
}

export function ClipboardEmail({
  variant = 'cta',
  className = '',
}: ClipboardEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      }
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }

  return (
    <div
      className={`mv-copy-wrap mv-copy-${variant} ${copied ? 'is-copied' : ''} ${className}`.trim()}
    >
      <a
        href={`mailto:${siteConfig.email}`}
        className="mv-copy-mail"
        style={{
          fontFamily: variant === 'card' ? 'var(--mv-font-d)' : 'var(--mv-font-m)',
          fontSize: variant === 'card' ? '21.6px' : '14px',
          fontWeight: variant === 'card' ? 600 : 500,
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        {siteConfig.email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="mv-copy-btn"
        title={copied ? 'Copied email address' : 'Copy email address'}
        data-testid="copy-email-btn"
      >
        <span>{copied ? 'Copied' : 'Copy'}</span>
        <span className="mv-sr"> email address</span>
      </button>
    </div>
  );
}
