import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { ARTICLES, getArticleBySlug } from '@/content/articles';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { ContactCTA } from '@/components/shared/ContactCTA';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Note not found' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const moreNotes = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mvpo-page mv-lt">
        <article className="mv-wrap mvpo-article">
          <div className="mv-case-crumb">
            <Link href="/writing">← Writing</Link>
            <span>/</span>
            <span>{article.category}</span>
          </div>

          <div className="mvpo-meta">
            <span>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readingTime}</span>
          </div>

          <h1 className="mv-hd mv-hd-xl mvpo-title">{article.title}</h1>

          <div className="mvpo-sub-row">
            <p className="mvpo-excerpt">{article.excerpt}</p>
            <div className="mvpo-by">
              <span>Words by</span>
              <strong>Mara Voss</strong>
            </div>
          </div>

          <div className="mvpo-cover">
            <img
              src={article.coverImage}
              alt={article.title}
              width={1360}
              height={760}
              loading="eager"
            />
          </div>

          <div id="post-body" className="mvpo-grid">
            <aside className="mvpo-side">
              <span>Share</span>
              <span>Writing</span>
            </aside>

            <div className="mvpo-body">
              {article.sections.map((sec) => (
                <section key={sec.heading} className="mvpo-sec">
                  <h2>{sec.heading}</h2>
                  {sec.paragraphs.map((p, idx) => (
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
                  {sec.pullQuote && (
                    <blockquote className="mvpo-quote">“{sec.pullQuote}”</blockquote>
                  )}
                </section>
              ))}

              <div className="mvpo-cta-card">
                <span className="mv-case-k">Call sheet · Open</span>
                <h3>Need this for your product?</h3>
                <p>
                  I design and build digital products end to end — from the first sketch to
                  production code. Tell me what you’re making.
                </p>
                <ArrowButton label="Let's talk" href="/contact" variant="solid" />
              </div>
            </div>
          </div>
        </article>

        <section className="mv-wrap mvpo-more">
          <div className="mvpo-more-head">
            <h2 className="mv-hd mv-hd-md">More notes</h2>
            <ArrowButton label="All writing" href="/writing" variant="ghost" quiet />
          </div>
          <div className="mvpo-more-list">
            {moreNotes.map((n) => (
              <Link key={n.id} href={`/writing/${n.slug}`} className="mvpo-more-row">
                <span>{n.date}</span>
                <strong>{n.title}</strong>
                <span>
                  {n.category} · {n.readingTime}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <ContactCTA />
      </main>
      <SiteFooter takeOverride={article.takeNumber} />
    </>
  );
}
