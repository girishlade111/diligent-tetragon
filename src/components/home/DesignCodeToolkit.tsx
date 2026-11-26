'use client';

import React, { useState } from 'react';
import { TOOLKIT_ITEMS } from '@/content/tools';
import { FramePill } from '@/components/shared/FramePill';

export function DesignCodeToolkit() {
  const [swingingId, setSwingingId] = useState<string | null>(null);
  const [filterGroup, setFilterGroup] = useState<'all' | 'design' | 'code'>('all');

  function triggerSwing(id: string) {
    setSwingingId(id);
    window.setTimeout(() => {
      setSwingingId((cur) => (cur === id ? null : cur));
    }, 850);
  }

  return (
    <section
      className="mvkt mv-lt"
      aria-labelledby="toolkit-heading"
      data-testid="design-code-toolkit"
    >
      <div className="mv-wrap mvkt-top">
        <div>
          <FramePill label="FRAME 05 — Tools" />
          <h2 id="toolkit-heading" className="mv-hd mv-hd-lg mvkt-title">
            Design and code, same hands.
          </h2>
        </div>

        <div className="mvkt-right-intro">
          <p className="mvkt-sub">
            The kit I bring to every project. Half of it draws, half of it ships — and I use all of
            it myself.
          </p>
          <div className="mvkt-counts" role="group" aria-label="Filter toolkit by discipline">
            <button
              type="button"
              onClick={() => setFilterGroup((g) => (g === 'design' ? 'all' : 'design'))}
              className={`mvkt-count-btn ${filterGroup === 'design' ? 'is-on' : ''}`}
              aria-pressed={filterGroup === 'design'}
            >
              <span>Design</span>
              <b>06</b>
            </button>
            <button
              type="button"
              onClick={() => setFilterGroup((g) => (g === 'code' ? 'all' : 'code'))}
              className={`mvkt-count-btn ${filterGroup === 'code' ? 'is-on' : ''}`}
              aria-pressed={filterGroup === 'code'}
            >
              <span>Code</span>
              <b>06</b>
            </button>
          </div>
        </div>
      </div>

      <div className="mv-wrap">
        <div className="mvkt-tray">
          <div className="mvkt-list">
            {TOOLKIT_ITEMS.map((item) => {
              const dimmed = filterGroup !== 'all' && item.group !== filterGroup;
              const isSwinging = swingingId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => triggerSwing(item.id)}
                  onMouseEnter={() => triggerSwing(item.id)}
                  className={`mvkt-tag ${item.group === 'code' ? 'is-code' : 'is-design'} ${isSwinging ? 'is-swing' : ''} ${dimmed ? 'is-dim' : ''}`}
                >
                  <span className="mvkt-pin" aria-hidden="true" />
                  <span className="mvkt-tag-name">{item.name}</span>
                  <span className="mvkt-tag-meta">
                    {item.category} · {item.number}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mvkt-foot">
            <span>Kit check · load-in · 12</span>
            <span>Drag or click a tag to swing it</span>
          </div>
        </div>
      </div>
    </section>
  );
}
