'use client';

import React, { useState } from 'react';
import { USES_GROUPS } from '@/content/uses';
import { ArrowButton } from '@/components/shared/ArrowButton';
import { Clapperboard } from '@/components/shared/Clapperboard';
import { FramePill } from '@/components/shared/FramePill';

export function UsesCuttingMatClient() {
  const [measuredCm, setMeasuredCm] = useState('0.0');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  return (
    <>
      <section className="mvus-hero mv-dark" aria-labelledby="uses-hero-heading">
        <div className="mv-wrap mvus-hero-grid">
          <div className="mvus-hero-copy">
            <FramePill label="FRAME 05 — Uses" dark />
            <h1 id="uses-hero-heading" className="mv-hd mv-hd-xl mvus-hero-title">
              The kit on <span className="mv-hl-orange">my desk</span>.
            </h1>
            <p className="mvus-hero-sub">
              Hardware, design apps, the code stack and the desk. Updated when something earns its
              place.
            </p>
            <div className="mvus-hero-ctas">
              <ArrowButton label="Start a project" href="/contact" variant="solid" />
              <ArrowButton
                label="Download résumé"
                href="/api/resume-pdf"
                variant="ghost"
                download
              />
            </div>
          </div>

          <div className="mvus-hero-slate">
            <Clapperboard variant="hero" scene="Work" take="03" roll="A-01" />
          </div>
        </div>

        <div className="mv-wrap mvwi-hero-foot">
          <span>MV 400TX · Int. studio — day</span>
          <span>Scroll ↓</span>
        </div>
      </section>

      <section className="mvus-mat-sec mv-lt" aria-labelledby="uses-list-heading">
        <div className="mv-wrap">
          <div className="mvus-head">
            <div>
              <FramePill label="FRAME 01 — The kit list" />
              <h2 id="uses-list-heading" className="mv-hd mv-hd-lg mvus-title">
                Everything on the desk.
              </h2>
            </div>
            <div className="mvus-head-right">
              <p className="mvus-sub">
                The hardware, apps and small things I use every day to design and build products. No
                sponsors — just what earned its place.
              </p>
              <div className="mvus-counts">
                {USES_GROUPS.map((g) => (
                  <span key={g.id}>
                    <b>{g.count}</b> {g.title}
                  </span>
                ))}
                <span>Updated Sep 2026</span>
              </div>
            </div>
          </div>

          <div
            className="mvus-mat"
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const cm = (((e.clientX - rect.left) / rect.width) * 24).toFixed(1);
              setMeasuredCm(cm);
            }}
            data-testid="cutting-mat"
          >
            <div className="mvus-ruler-x" aria-hidden="true">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            <div className="mvus-mat-body">
              <div className="mvus-ruler-y" aria-hidden="true">
                {Array.from({ length: 19 }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              <div className="mvus-groups">
                {USES_GROUPS.map((group) => (
                  <div key={group.id} className="mvus-group">
                    <div className="mvus-group-head">
                      <h3>{group.title}</h3>
                      <span>{group.count}</span>
                    </div>
                    <div className="mvus-items">
                      {group.items.map((item) => {
                        const isSel = selectedCode === item.code;
                        return (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() =>
                              setSelectedCode((cur) => (cur === item.code ? null : item.code))
                            }
                            className={`mvus-item ${isSel ? 'is-sel' : ''}`}
                          >
                            <span className="mvus-item-tape" aria-hidden="true" />
                            <span className="mvus-item-code">{item.code}</span>
                            <strong className="mvus-item-name">{item.name}</strong>
                            <span className="mvus-note">
                              <span>{item.description}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mvus-mat-foot">
              <span>MV · A2 · Self-healing · 1 square = 1 cm</span>
              <span>Measured {measuredCm} cm</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
