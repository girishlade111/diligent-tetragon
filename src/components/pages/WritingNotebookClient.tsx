'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ARTICLES, WRITING_CATEGORIES } from '@/content/articles';
import { FramePill } from '@/components/shared/FramePill';
import type { WritingCategory } from '@/types/portfolio';

export function WritingNotebookClient() {
  const [filter, setFilter] = useState<'All' | WritingCategory>('All');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [subState, setSubState] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [subMsg, setSubMsg] = useState('');

  const filtered =
    filter === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === filter);

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubState('submitting');
    setSubMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubState('error');
        setSubMsg(json.error || 'Could not subscribe.');
        return;
      }
      setSubState('done');
      setSubMsg(json.message || 'Subscribed to The studio letter.');
      setEmail('');
    } catch {
      setSubState('error');
      setSubMsg('Network error while subscribing.');
    }
  }

  return (
    <section className="mvwl-page mv-lt" aria-labelledby="writing-hero-heading">
      <div className="mv-wrap">
        <div className="mvwl-hero">
          <div className="mvwl-hero-left">
            <FramePill label="NOTEBOOK — Writing" />
            <h1 id="writing-hero-heading" className="mv-hd mv-hd-xl mvwl-title">
              Notes from <span className="mv-hl-orange">the studio</span>.
            </h1>
          </div>
          <div className="mvwl-hero-right">
            <p className="mvwl-sub">
              Short essays on designing and building digital products — process, systems, pricing
              and the small decisions that make software feel good.
            </p>
            <div className="mvwl-vol">
              <span>Notebook · Vol. 3</span>
              <span>{String(ARTICLES.length).padStart(2, '0')} notes</span>
            </div>
          </div>
        </div>

        <div className="mvwl-filters" role="group" aria-label="Filter articles by topic">
          {WRITING_CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={active}
                className={`mvwl-chip ${active ? 'is-on' : ''}`}
                data-testid={`writing-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {featured && (
          <Link href={`/writing/${featured.slug}`} className="mvwl-featured">
            <span className="mvwl-page-num">p. 14</span>
            <div className="mvwl-feat-media">
              <div className="mvwl-clip" aria-hidden="true" />
              <figure className="mvwl-feat-fig">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  width={560}
                  height={380}
                />
                <figcaption>{featured.coverCaption}</figcaption>
              </figure>
            </div>
            <div className="mvwl-feat-copy">
              <span className="mvwl-feat-tags">
                Latest note · {featured.category}
              </span>
              <h2 className="mvwl-feat-title">{featured.title}</h2>
              <p className="mvwl-feat-excerpt">{featured.excerpt}</p>
              <span className="mvwl-feat-meta">
                {featured.date} · {featured.readingTime}
              </span>
              <span className="mvwl-feat-cta">Read the note →</span>
            </div>
          </Link>
        )}

        <div className="mvwl-list">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/writing/${article.slug}`}
              className="mvwl-row"
            >
              <span className="mvwl-row-idx">{article.index}</span>
              <div className="mvwl-th">
                <img
                  src={article.coverImage}
                  alt=""
                  width={180}
                  height={120}
                  loading="eager"
                />
              </div>
              <div className="mvwl-row-main">
                <h2 className="mvwl-row-title">{article.title}</h2>
                <p className="mvwl-row-excerpt">{article.excerpt}</p>
              </div>
              <div className="mvwl-row-meta">
                <span>{article.category}</span>
                <span>
                  {article.date} · {article.readingTime}
                </span>
              </div>
              <span className="mvwl-row-arr" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="mvwl-letter" aria-labelledby="studio-letter-heading">
          <div className="mvwl-letter-left">
            <span className="mvwl-letter-k">The studio letter</span>
            <h2 id="studio-letter-heading" className="mv-hd mv-hd-md mvwl-letter-title">
              One letter a month. No noise.
            </h2>
            <p className="mvwl-letter-sub">
              New notes, one useful link and what I&apos;m building — straight to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="mvwl-letter-form"
            noValidate
            data-testid="newsletter-form"
          >
            <label htmlFor="newsletter-email" className="mv-sr">
              Your email
            </label>
            <input
              type="text"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="mv-sr"
              aria-hidden="true"
            />
            <div className="mvwl-letter-inputs">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subState === 'submitting'}
                data-testid="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={subState === 'submitting'}
                className="mvwl-sub-btn"
                data-testid="newsletter-submit-btn"
              >
                {subState === 'submitting' ? 'Sending...' : 'Subscribe'}
              </button>
            </div>
            {subMsg && (
              <p
                className={`mvwl-form-msg ${subState === 'error' ? 'is-error' : 'is-ok'}`}
                role="status"
                data-testid="newsletter-status"
              >
                {subMsg}
              </p>
            )}
            <p className="mvwl-letter-note">No tracking. Unsubscribe any time.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
