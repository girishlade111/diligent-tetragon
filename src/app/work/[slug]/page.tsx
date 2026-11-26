import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getProjectBySlug, PROJECTS } from '@/content/projects';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { CallSheet } from '@/components/shared/CallSheet';
import { ContactCTA } from '@/components/shared/ContactCTA';
import { ArrowButton } from '@/components/shared/ArrowButton';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: `${project.title} — case study`,
    description: project.seoDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = getProjectBySlug(project.nextSlug) || PROJECTS[0];
  const related = project.relatedSlugs
    .map((s) => getProjectBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mv-case mv-lt">
        <section className="mv-case-hero mv-dark">
          <div className="mv-wrap mv-case-hero-grid">
            <div className="mv-case-hero-left">
              <div className="mv-case-crumb is-dark-crumb">
                <Link href="/work">← All work</Link>
                <span>Shipped</span>
                <span>{project.year}</span>
              </div>
              <span className="mv-case-cat">{project.categoryLabel}</span>
              <h1 className="mv-hd mv-hd-xl mv-case-title">{project.title}</h1>
            </div>

            <CallSheet
              title="Call sheet"
              subtitle="Prod."
              className="mv-case-callsheet"
              rows={[
                { label: 'Production', value: project.title },
                { label: 'Client', value: project.client },
                { label: 'Category', value: project.categoryLabel },
                { label: 'Year', value: project.year },
                { label: 'Role', value: project.role },
                { label: 'Team', value: project.teamSize },
              ]}
            />
          </div>

          <div className="mv-wrap mv-case-cover">
            <img
              src={project.heroImage}
              alt={project.heroAlt}
              width={1360}
              height={850}
              loading="eager"
            />
          </div>
        </section>

        <section className="mv-case-summary mv-wrap">
          <div className="mv-case-sum-col">
            <span className="mv-case-k">The short version</span>
            <p className="mv-case-sum-p">{project.summary}</p>
          </div>
          <div className="mv-case-sum-col">
            <span className="mv-case-k">Outcome</span>
            <p className="mv-case-outcome">{project.outcomeShort}</p>
          </div>
        </section>

        <section className="mv-case-scene mv-wrap">
          <div className="mv-case-sc-label">
            <span>SC 01</span>
            <h2 className="mv-hd mv-hd-md">The brief</h2>
          </div>
          <div className="mv-case-sc-body">
            {project.brief.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mv-case-scene mv-wrap">
          <div className="mv-case-sc-label">
            <span>SC 02</span>
            <h2 className="mv-hd mv-hd-md">What I did</h2>
          </div>
          <div className="mv-case-sc-body">
            <ul className="mv-case-bullets">
              {project.contributions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mv-case-scene mv-wrap">
          <div className="mv-case-sc-label">
            <span>SC 03</span>
            <h2 className="mv-hd mv-hd-md">Design → code</h2>
          </div>
          <div className="mv-case-sc-body">
            <p>
              Same hands on both sides. The frame on the left is the design file, the panel on the
              right is what shipped — type, spacing and colour come straight across.
            </p>
            <div className="mv-case-split">
              <div className="mv-case-design-panel">
                <span>{project.designLabel}</span>
                <img
                  src={project.heroImage}
                  alt={`${project.title} design frame`}
                  width={640}
                  height={400}
                  loading="eager"
                />
              </div>
              <div className="mv-case-code-panel">
                <pre>
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mv-case-scene mv-wrap">
          <div className="mv-case-sc-label">
            <span>SC 04</span>
            <h2 className="mv-hd mv-hd-md">The result</h2>
          </div>
          <div className="mv-case-sc-body">
            <p>{project.resultSummary}</p>
            <div className="mv-case-metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="mv-case-metric">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mv-case-more mv-wrap">
          <h2 className="mv-hd mv-hd-md">More frames</h2>
          <div className="mv-case-more-grid">
            {related.map((rel) => (
              <Link key={rel.id} href={`/work/${rel.slug}`} className="mv-case-rel-card">
                <img
                  src={rel.heroImage}
                  alt={rel.heroAlt}
                  width={480}
                  height={300}
                  loading="eager"
                />
                <span>{rel.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mv-case-quote mv-wrap">
          <span className="mv-case-k">The client</span>
          <blockquote>“{project.testimonial.quote}”</blockquote>
          <p className="mv-case-quote-author">{project.testimonial.author}</p>
          <p className="mv-case-quote-role">{project.testimonial.role}</p>
        </section>

        <section className="mv-case-next mv-dark">
          <div className="mv-wrap mv-case-next-inner">
            <div>
              <span className="mv-case-k">Next project</span>
              <h2 className="mv-hd mv-hd-xl">{nextProject.title}</h2>
              <p className="mv-case-next-cat">{nextProject.categoryLabel}</p>
              <p className="mv-case-next-sum">{nextProject.summary}</p>
              <ArrowButton
                label="Open case"
                href={`/work/${nextProject.slug}`}
                variant="solid"
              />
            </div>
            <Link href={`/work/${nextProject.slug}`} className="mv-case-next-img">
              <img
                src={nextProject.heroImage}
                alt={nextProject.heroAlt}
                width={640}
                height={400}
                loading="eager"
              />
            </Link>
          </div>
        </section>

        <ContactCTA />
      </main>
      <SiteFooter takeOverride={project.takeNumber} />
    </>
  );
}
