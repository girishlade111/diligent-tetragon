'use client';

import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import type { LegalSection } from '@/content/legal';
import { ArrowButton } from '@/components/shared/ArrowButton';

interface LegalDocumentClientProps {
  titleLines: string[];
  updated: string;
  sections: LegalSection[];
}

export function LegalDocumentClient({
  titleLines,
  updated,
  sections,
}: LegalDocumentClientProps) {
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('deterministic') === '1') {
      setReadPct(0);
      return;
    }

    function onScroll() {
      const h = document.documentElement;
      const total = Math.max(1, h.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
      setReadPct(pct);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="mvlg-page mv-lt" aria-labelledby="legal-doc-heading">
      <div className="mv-wrap">
        <div className="mvlg-head">
          <span className="mvlg-k">The small print</span>
          <h1 id="legal-doc-heading" className="mv-hd mv-hd-xl mvlg-title">
            {titleLines.map((line) => (
              <span key={line} className="mv-hd-l">
                {line}
              </span>
            ))}
          </h1>
          <p className="mvlg-updated">{updated}</p>
        </div>

        <div className="mvlg-grid">
          <aside className="mvlg-toc" aria-label="Document contents">
            <div className="mvlg-toc-head">
              <span>Contents</span>
              <span>Read {readPct}%</span>
            </div>
            <ol className="mvlg-toc-list">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a href={`#${sec.id}`}>
                    <span>{sec.number}</span>
                    <span>{sec.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="mvlg-body">
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="mvlg-sec">
                <h2>{sec.heading}</h2>
                {sec.paragraphs?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
                {sec.bullets && (
                  <ul>
                    {sec.bullets.map((b, idx) => (
                      <li key={idx}>
                        {b.lead && <strong>{b.lead} </strong>}
                        <span>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.trailingParagraph && <p>{sec.trailingParagraph}</p>}
              </section>
            ))}

            <div className="mvlg-questions">
              <span>Questions?</span>
              <p className="mvlg-questions-h">
                Write to me and I’ll answer within a day, in plain words.
              </p>
              <a href={`mailto:${siteConfig.email}`} className="mvlg-questions-mail">
                {siteConfig.email} →
              </a>
              <div className="mvlg-questions-cta">
                <ArrowButton label="Email me" href={`mailto:${siteConfig.email}`} variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
