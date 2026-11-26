'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ARTICLES } from '@/content/articles';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { FramePill } from '@/components/shared/FramePill';

export function WritingNotebookPreview() {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);
  const previewArticle = ARTICLES[hoveredIdx] || ARTICLES[0];

  return (
    <section
      className="mvnt mv-lt"
      aria-labelledby="writing-home-heading"
      data-testid="writing-notebook"
    >
      <div className="mv-wrap mvnt-head">
        <div>
          <FramePill label="FRAME 09 — Writing" />
          <h2 id="writing-home-heading" className="mv-hd mv-hd-lg mvnt-title">
            Notes from the <span className="mv-hl-orange">studio</span>.
          </h2>
        </div>

        <div className="mvnt-head-right">
          <div className="mvnt-vol">
            <span>Notebook · Vol. 3</span>
            <span>Written between projects</span>
          </div>
          <ArrowButton label="All writing" href="/writing" variant="ghost" />
        </div>
      </div>

      <div className="mv-wrap mvnt-notebook">
        <div className="mvnt-ruled-sheet">
          <div className="mvnt-list">
            {ARTICLES.map((article, idx) => (
              <Link
                key={article.id}
                href={`/writing/${article.slug}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onFocus={() => setHoveredIdx(idx)}
                className={`mvnt-row ${hoveredIdx === idx ? 'is-active' : ''}`}
              >
                <span className="mvnt-date">{article.date}</span>
                <div className="mvnt-main">
                  <h3 className="mvnt-row-title">{article.title}</h3>
                  <p className="mvnt-excerpt">{article.excerpt}</p>
                </div>
                <span className="mvnt-cat">{article.category}</span>
                <span className="mvnt-read">{article.readingTime}</span>
              </Link>
            ))}
          </div>

          <aside className="mvnt-preview-card" aria-hidden="true">
            <div className="mvnt-tape" />
            <img
              src={previewArticle.coverImage}
              alt=""
              width={400}
              height={280}
              loading="eager"
            />
            <p className="mvnt-preview-meta">
              {previewArticle.index} /writing/{previewArticle.slug}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
