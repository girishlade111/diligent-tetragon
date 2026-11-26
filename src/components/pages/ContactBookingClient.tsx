'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '@/config/site';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { BerlinClock } from '@/components/shared/BerlinClock';
import { ClipboardEmail } from '@/components/shared/ClipboardEmail';
import { FramePill } from '@/components/shared/FramePill';
import { OnAirSign } from '@/components/shared/OnAirSign';

const BUDGET_OPTIONS = ['Under €5k', '€5k–€15k', '€15k–€40k', '€40k+'];
const TIMELINE_OPTIONS = ['ASAP', '1–2 months', 'Later this year'];
const SERVICE_CHOICES = [
  'Product design',
  'Design systems',
  'Front-end development',
  'Brand & web',
];

const START_WINDOW_MAP: Record<string, string> = {
  'nov-17': 'Nov 17',
  'dec-1': 'Dec 1',
  'jan-12': 'Jan 12',
};

interface CustomListboxProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (val: string) => void;
  testId: string;
}

function CustomListbox({
  id,
  label,
  value,
  placeholder,
  options,
  onChange,
  testId,
}: CustomListboxProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setHighlighted((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      else setHighlighted((i) => Math.max(0, i - 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setHighlighted(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setHighlighted(options.length - 1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        onChange(options[highlighted]);
        setOpen(false);
      }
    }
  }

  return (
    <div ref={rootRef} className="mvco-select-wrap">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`mvco-select-trigger ${value ? 'has-val' : ''}`}
        data-testid={testId}
      >
        <span>{value || placeholder}</span>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="mvco-listbox"
        >
          {options.map((opt, idx) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`mvco-option ${value === opt ? 'is-sel' : ''} ${highlighted === idx ? 'is-hi' : ''}`}
              onMouseEnter={() => setHighlighted(idx)}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ContactBookingFormInner() {
  const searchParams = useSearchParams();
  const startParam = searchParams.get('start') || '';
  const startDateLabel = START_WINDOW_MAP[startParam] || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState(startDateLabel ? `Start window · ${startDateLabel}` : '');
  const [services, setServices] = useState<string[]>([]);
  const [brief, setBrief] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    notice: string;
  } | null>(null);

  function toggleService(item: string) {
    setServices((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (brief.trim().length < 10) {
      nextErrors.brief = 'Tell me a little about your project (at least 10 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          website,
          budget,
          timeline,
          services,
          startWindow: startDateLabel,
          brief,
          honeypot,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors({
          form: json.error || 'Could not submit the booking sheet.',
        });
        setSubmitting(false);
        return;
      }
      setConfirmation({
        referenceId: json.referenceId,
        notice: json.notice,
      });
      setSubmitting(false);
    } catch {
      setErrors({ form: 'Network error submitting booking sheet.' });
      setSubmitting(false);
    }
  }

  return (
    <section className="mvco-page mv-lt" aria-labelledby="contact-hero-heading">
      <div className="mv-wrap">
        <div className="mvco-hero">
          <FramePill label="Contact — Take 1" />
          <h1 id="contact-hero-heading" className="mv-hd mv-hd-xl mvco-title">
            Let’s make something <span className="mv-hl-orange">good</span>.
          </h1>
          <p className="mvco-sub">
            Tell me about the product, the people and the deadline. I read every brief myself and
            reply within one working day.
          </p>
        </div>

        <div className="mvco-grid">
          <div className="mvco-sheet">
            <div className="mvco-sheet-head">
              <span>Booking sheet</span>
              <span>No. 0142</span>
              <span>* required</span>
            </div>

            {startDateLabel && (
              <div className="mvco-start-banner" data-testid="selected-start-banner">
                <span>Selected ticket: Start window · {startDateLabel}</span>
              </div>
            )}

            {confirmation ? (
              <div className="mvco-slate" data-testid="contact-confirmation">
                <div className="mvco-arm" aria-hidden="true">
                  <span />
                </div>
                <div className="mvco-slate-inner">
                  <span className="mvco-lamp" aria-hidden="true" />
                  <p className="mvco-slate-k">Slate Logged · {confirmation.referenceId}</p>
                  <h2 className="mv-hd mv-hd-md">Brief received.</h2>
                  <p className="mvco-slate-copy">
                    Thanks {name}. I read every brief myself and will reply within one working day
                    at <strong>{email}</strong>.
                  </p>
                  <p className="mvco-slate-demo">{confirmation.notice}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmation(null);
                      setName('');
                      setEmail('');
                      setCompany('');
                      setWebsite('');
                      setBudget('');
                      setTimeline('');
                      setServices([]);
                      setBrief('');
                    }}
                    className="mvco-reset-btn"
                  >
                    Send another brief
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mvco-form"
                data-testid="contact-booking-form"
              >
                <input
                  type="text"
                  name="company_site_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="mv-sr"
                  aria-hidden="true"
                />

                <div className="mvco-row-2">
                  <div className="mvco-field">
                    <label htmlFor="cf-name">01 Your name *</label>
                    <input
                      id="cf-name"
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      data-testid="contact-name"
                    />
                    {errors.name && <span className="mvco-err">{errors.name}</span>}
                  </div>

                  <div className="mvco-field">
                    <label htmlFor="cf-email">02 Email *</label>
                    <input
                      id="cf-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!errors.email}
                      data-testid="contact-email"
                    />
                    {errors.email && <span className="mvco-err">{errors.email}</span>}
                  </div>
                </div>

                <div className="mvco-row-2">
                  <div className="mvco-field">
                    <label htmlFor="cf-company">03 Company</label>
                    <input
                      id="cf-company"
                      type="text"
                      placeholder="Studio / Startup"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="mvco-field">
                    <label htmlFor="cf-website">04 Website</label>
                    <input
                      id="cf-website"
                      type="url"
                      placeholder="https://"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mvco-row-2">
                  <div className="mvco-field">
                    <label htmlFor="cf-budget">05 Budget</label>
                    <CustomListbox
                      id="cf-budget"
                      label="05 Budget"
                      value={budget}
                      placeholder="Select range"
                      options={BUDGET_OPTIONS}
                      onChange={setBudget}
                      testId="contact-budget"
                    />
                  </div>

                  <div className="mvco-field">
                    <label htmlFor="cf-timeline">06 Timeline</label>
                    <CustomListbox
                      id="cf-timeline"
                      label="06 Timeline"
                      value={timeline}
                      placeholder="Select timeline"
                      options={TIMELINE_OPTIONS}
                      onChange={setTimeline}
                      testId="contact-timeline"
                    />
                  </div>
                </div>

                <div className="mvco-field">
                  <span className="mvco-lbl">07 What do you need?</span>
                  <div className="mvco-services-pills" role="group" aria-label="Services needed">
                    {SERVICE_CHOICES.map((svc) => {
                      const active = services.includes(svc);
                      return (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => toggleService(svc)}
                          aria-pressed={active}
                          className={`mvco-svc-pill ${active ? 'is-on' : ''}`}
                        >
                          {svc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mvco-field">
                  <label htmlFor="cf-brief">08 The brief *</label>
                  <textarea
                    id="cf-brief"
                    rows={5}
                    required
                    placeholder="What are we making, who uses it, and when would you like to ship?"
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    aria-invalid={!!errors.brief}
                    data-testid="contact-brief"
                  />
                  {errors.brief && <span className="mvco-err">{errors.brief}</span>}
                </div>

                {errors.form && (
                  <p className="mvco-err" role="alert">
                    {errors.form}
                  </p>
                )}

                <div className="mvco-form-foot">
                  <span className="mvco-privacy-note">
                    Used only to reply to you. <Link href="/privacy">Privacy ↗</Link>
                  </span>
                  <ArrowButton
                    type="submit"
                    label={submitting ? 'Sending...' : 'Send the brief'}
                    variant="solid"
                    disabled={submitting}
                  />
                </div>
              </form>
            )}
          </div>

          <aside className="mvco-sidebar" aria-label="Studio status, clock, and direct links">
            <div className="mvco-card mvco-card-status">
              <div className="mvco-card-tape" aria-hidden="true" />
              <div className="mvco-card-top">
                <span className="mvco-card-k">Status</span>
                <OnAirSign compact />
              </div>
              <span className="mvco-card-k">Booking now for</span>
              <p className="mvco-card-v">
                <span className="mv-port" aria-hidden="true" />
                <span>{siteConfig.availability.statusLabel}</span>
              </p>
            </div>

            <div className="mvco-card">
              <div className="mvco-card-tape" aria-hidden="true" />
              <span className="mvco-card-k">Email</span>
              <ClipboardEmail variant="card" />
            </div>

            <div className="mvco-card">
              <div className="mvco-card-tape" aria-hidden="true" />
              <div className="mvco-card-top">
                <span className="mvco-card-k">Local time</span>
                <span className="mvco-card-k">· Berlin</span>
              </div>
              <div className="mvco-clock-big">
                <BerlinClock showSeconds showZone showAvailabilityNote />
              </div>
            </div>

            <div className="mvco-card">
              <div className="mvco-card-tape" aria-hidden="true" />
              <span className="mvco-card-k">Elsewhere</span>
              <ul className="mvco-social-list">
                {siteConfig.socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <span>{link.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mvco-card mvco-card-call">
              <div className="mvco-card-tape" aria-hidden="true" />
              <p className="mvco-call-title">Rather talk? Pick a slot, no prep needed.</p>
              <ArrowButton
                label="Book a 20-min intro call"
                href={siteConfig.bookingCallUrl}
                external={siteConfig.bookingCallUrl.startsWith('http')}
                variant="solid"
                quiet
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ContactBookingClient() {
  return (
    <Suspense fallback={<div className="mv-wrap" style={{ padding: '140px 0' }}>Loading booking sheet...</div>}>
      <ContactBookingFormInner />
    </Suspense>
  );
}
