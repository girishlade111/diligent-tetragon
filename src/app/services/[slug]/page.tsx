import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getProjectBySlug } from '@/content/projects';
import { getServiceBySlug, SERVICES } from '@/content/services';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { ContactCTA } from '@/components/shared/ContactCTA';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service not found' };
  return {
    title: `${service.title} — Services`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjectSlugs
    .map((s) => getProjectBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mv-svc-detail mv-lt">
        <section className="mv-wrap mv-svc-hero">
          <div className="mv-svc-hero-left">
            <div className="mv-case-crumb">
              <Link href="/services">← Services</Link>
              <span>/</span>
              <span>{service.title}</span>
            </div>
            <h1 className="mv-hd mv-hd-xl mv-svc-title">{service.title}</h1>
            <p className="mv-svc-lead">{service.shortDesc}</p>
            <p className="mv-svc-desc">{service.fullDesc}</p>
            <div className="mv-svc-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton label="All services" href="/services" variant="ghost" />
            </div>
          </div>

          <div className="mv-svc-hero-media">
            <span className="mv-svc-gel-badge">
              Gel · {service.gelColor}
            </span>
            <div className="mv-svc-photo-wrap">
              <img
                src={service.heroImage}
                alt={service.title}
                width={640}
                height={760}
                loading="eager"
              />
              <span
                className="mv-svc-photo-gel"
                style={{ background: service.gelColor }}
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        <section className="mv-wrap mv-svc-delivs">
          <div className="mv-svc-deliv-left">
            <span className="mv-case-k">What you get</span>
            <h2 className="mv-hd mv-hd-lg">Everything you keep.</h2>
            <p>{service.deliverablesIntro}</p>
          </div>

          <ol className="mv-svc-deliv-list">
            {service.deliverables.map((item, idx) => (
              <li key={item}>
                <span>0{idx + 1}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="mv-wrap mv-svc-projects">
          <div className="mv-svc-proj-head">
            <h2 className="mv-hd mv-hd-md">Projects with this</h2>
            <span>Frames from jobs where this was the work.</span>
          </div>
          <div className="mv-svc-proj-grid">
            {relatedProjects.map((proj) => (
              <Link key={proj.id} href={`/work/${proj.slug}`} className="mv-svc-proj-card">
                <img
                  src={proj.heroImage}
                  alt={proj.heroAlt}
                  width={560}
                  height={350}
                  loading="lazy"
                />
                <h3>{proj.title}</h3>
                <p>
                  {proj.client} · {proj.year}
                </p>
              </Link>
            ))}
            <Link href="/contact" className="mv-svc-proj-card is-next">
              <div className="mv-svc-unexposed">
                <span>+</span>
              </div>
              <h3>Your project</h3>
              <p>Next frame · unexposed</p>
            </Link>
          </div>
        </section>

        <section className="mv-wrap mv-svc-other">
          <h2 className="mv-hd mv-hd-md">Other services</h2>
          <div className="mv-svc-other-grid">
            {otherServices.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="mv-svc-other-row"
              >
                <span>{other.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mv-wrap mv-svc-faq">
          <span className="mv-case-k">Before you ask</span>
          <h2 className="mv-hd mv-hd-lg">Questions</h2>
          <div className="mv-svc-faq-grid">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="mv-svc-faq-card">
                <span className="mv-svc-faq-q">Q.</span>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <ContactCTA />
      </main>
      <SiteFooter takeOverride={service.takeNumber} />
    </>
  );
}
