'use client';

import React, { useState } from 'react';
import { WORKFLOW_STAGES } from '@/content/booking';
import { FramePill } from '@/components/shared/FramePill';

export function WorkflowCallSheet() {
  const [activeStep, setActiveStep] = useState(0);
  const current = WORKFLOW_STAGES[activeStep] || WORKFLOW_STAGES[0];
  const next = WORKFLOW_STAGES[activeStep + 1];

  return (
    <section
      className="mvpr mv-dark"
      aria-labelledby="workflow-heading"
      data-testid="workflow-callsheet"
    >
      <div className="mv-wrap mvpr-head">
        <FramePill label="FRAME 04 — How I work" dark />
        <h2 id="workflow-heading" className="mv-hd mv-hd-lg mvpr-title">
          One project, four days that matter.
        </h2>
      </div>

      <div className="mv-wrap mvpr-grid">
        <div className="mvpr-sheet">
          <div className="mvpr-holes" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="mvpr-sheet-top">
            <div>
              <h3 className="mvpr-sheet-h">Call sheet</h3>
              <span className="mvpr-sheet-sub">New project</span>
            </div>
            <span className="mvpr-sheet-num">No. 026</span>
          </div>

          <dl className="mvpr-meta-row">
            <div>
              <dt>Director</dt>
              <dd>Mara Voss</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Berlin + remote</dd>
            </div>
            <div>
              <dt>Crew call</dt>
              <dd>Mondays, 09:00</dd>
            </div>
          </dl>

          <div className="mvpr-table-head" aria-hidden="true">
            <span>Scene</span>
            <span>When</span>
            <span>What happens</span>
          </div>

          <div className="mvpr-rows" role="tablist" aria-label="Four production stages">
            {WORKFLOW_STAGES.map((stage, idx) => {
              const isDone = idx <= activeStep;
              const isCurrent = idx === activeStep;
              return (
                <button
                  key={stage.step}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`mvpr-row ${isCurrent ? 'is-cur' : ''} ${isDone ? 'is-done' : ''}`}
                  data-testid={`workflow-stage-${stage.step}`}
                >
                  <span className="mvpr-step-num">{stage.step}</span>
                  <span className="mvpr-step-title">{stage.title}</span>
                  <span className="mvpr-flap">{stage.badge}</span>
                  <span className="mvpr-step-sum">{stage.summary}</span>
                  <span className="mvpr-tick" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                      <path
                        d="M5 12.5L10 17.5L19 7"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mvpr-sheet-foot">
            <span>Call times move. The Friday review does not.</span>
            <span className="mvpr-sig">M. Voss</span>
          </div>
        </div>

        <aside className="mvpr-slate" aria-label="Current production stage monitor">
          <div className="mvpr-slate-top">
            <span>On set</span>
            <span>{current.step} / 04</span>
          </div>
          <p className="mvpr-slate-scene">
            Scene {Number(current.step)} / 4 · {current.title}
          </p>
          <p className="mvpr-slate-when">{current.meta}</p>
          <p className="mvpr-slate-copy">{current.summary}</p>
          <p className="mvpr-slate-next">
            {next ? `Next: ${next.title} · ${next.badge}` : "That's a wrap"}
          </p>
        </aside>
      </div>
    </section>
  );
}
