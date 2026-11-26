import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { EXPERIMENTS, getExperimentBySlug } from '@/content/experiments';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { LabInteractiveDemo } from '@/components/pages/LabInteractiveDemo';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { CallSheet } from '@/components/shared/CallSheet';
import { ContactCTA } from '@/components/shared/ContactCTA';

export function generateStaticParams() {
  return EXPERIMENTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getExperimentBySlug(slug);
  if (!item) return { title: 'Experiment not found' };
  return {
    title: `${item.title} — lab`,
    description: item.tagline,
  };
}

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperimentBySlug(slug);
  if (!exp) notFound();

  const moreExperiments = EXPERIMENTS.filter((e) => e.slug !== exp.slug);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mv-lab-detail mv-dark">
        <section className="mv-wrap mv-lab-hero">
          <div className="mv-case-crumb">
            <Link href="/lab">← Lab</Link>
            <span>/</span>
            <span>{exp.category}</span>
          </div>
          <div className="mv-lab-meta-top">
            <span>{exp.category}</span>
            <span>{exp.year}</span>
            <span>{exp.tools.join(', ')}</span>
          </div>
          <div className="mv-lab-hero-row">
            <div>
              <h1 className="mv-hd mv-hd-xl">{exp.title}</h1>
              <p className="mv-lab-tagline">{exp.tagline}</p>
            </div>
            <div className="mv-lab-ctas">
              <ArrowButton label="Live demo" href="#interactive-demo" variant="solid" />
              <ArrowButton
                label="Source"
                href={exp.sourceUrl}
                external
                variant="ghost"
              />
            </div>
          </div>

          <div className="mv-lab-cover">
            <img src={exp.heroImage} alt={exp.title} width={1360} height={760} loading="eager" />
          </div>
        </section>

        <section className="mv-wrap mv-lab-body-grid">
          <CallSheet
            title="Camera report"
            subtitle="Slate"
            rows={[
              { label: 'Scene', value: exp.category },
              { label: 'Year', value: exp.year },
              { label: 'Tools', value: exp.tools.join(', ') },
            ]}
          />

          <div className="mv-lab-prose">
            <div className="mv-lab-block">
              <h2>The idea</h2>
              {exp.ideaParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mv-lab-block">
              <h2>How it&apos;s built</h2>
              <p>{exp.buildIntro}</p>
              <ul>
                {exp.buildBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mv-case-code-panel" tabIndex={0} aria-label="Implementation code example">
                <pre>
                  <code>{exp.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <LabInteractiveDemo slug={exp.slug} />

            <div className="mv-lab-block">
              <h2>What I learned</h2>
              <p>{exp.learnedIntro}</p>
              <ul>
                {exp.learnedBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <blockquote className="mv-lab-quote">“{exp.pullQuote}”</blockquote>
            </div>
          </div>
        </section>

        <section className="mv-wrap mv-lab-more">
          <div className="mv-lab-more-head">
            <h2 className="mv-hd mv-hd-md">More from the lab</h2>
            <ArrowButton label="All experiments" href="/lab" variant="ghost" quiet />
          </div>
          <div className="mv-lab-more-grid">
            {moreExperiments.map((item) => (
              <Link key={item.id} href={`/lab/${item.slug}`} className="mv-lab-more-card">
                <img
                  src={item.heroImage}
                  alt={item.title}
                  width={320}
                  height={200}
                  loading="eager"
                />
                <span>
                  {item.category} · {item.year}
                </span>
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <ContactCTA />
      </main>
      <SiteFooter takeOverride={exp.takeNumber} />
    </>
  );
}
