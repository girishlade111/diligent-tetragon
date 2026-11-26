'use client';

import React, { useState } from 'react';
import { CURVES } from './motion-curves';

export function LabInteractiveDemo({ slug }: { slug: string }) {
  const [weight, setWeight] = useState(500);
  const [meshHue, setMeshHue] = useState(14);
  const [rollCount, setRollCount] = useState(18);
  const [curveKey, setCurveKey] = useState<'enter' | 'exit' | 'move'>('enter');
  const [curveRun, setCurveRun] = useState(false);

  function playSynthTone(freq: number) {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    try {
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.14, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.11);
    } catch {
      // Audio playback blocked by browser policy
    }
  }

  return (
    <div id="interactive-demo" className="mvli-sandbox" data-testid="lab-interactive-demo">
      <div className="mvli-sandbox-head">
        <span>Interactive studio sandbox</span>
        <span>{slug}</span>
      </div>

      {slug === 'variable-type-toy' && (
        <div className="mvli-demo-box">
          <p
            className="mvli-demo-type"
            style={{ fontWeight: weight, fontVariationSettings: `"wght" ${weight}` }}
          >
            Hold the weight axis in motion.
          </p>
          <label className="mvli-demo-ctrl">
            <span>Weight: {weight}</span>
            <input
              type="range"
              min={200}
              max={900}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {slug === 'ui-sound-kit' && (
        <div className="mvli-demo-box mvli-demo-row">
          {[
            { name: 'Tap 01', hz: 660 },
            { name: 'Tick 02', hz: 880 },
            { name: 'Shutter 03', hz: 420 },
            { name: 'Confirm 04', hz: 1040 },
          ].map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => playSynthTone(t.hz)}
              className="mvli-demo-btn"
            >
              Play {t.name} ({t.hz} Hz)
            </button>
          ))}
        </div>
      )}

      {slug === 'shader-gradients' && (
        <div className="mvli-demo-box">
          <div
            className="mvli-demo-mesh"
            style={{
              background: `radial-gradient(circle at 22% 28%, hsl(${meshHue}, 92%, 60%), transparent 56%), radial-gradient(circle at 78% 72%, hsl(${(meshHue + 42) % 360}, 86%, 58%), #171311)`,
            }}
          />
          <label className="mvli-demo-ctrl">
            <span>Primary point hue: {meshHue}deg</span>
            <input
              type="range"
              min={0}
              max={360}
              value={meshHue}
              onChange={(e) => setMeshHue(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {slug === 'figma-token-plugin' && (
        <div className="mvli-demo-box">
          <pre className="mvli-demo-pre">
{`+ "mv.brass": { "$type": "color", "$value": "#ff5b2e" }
+ "mv.bone":  { "$type": "color", "$value": "#f1ece4" }
~ "mv.gutters.desktop": "56px" -> "56px" (in sync)`}
          </pre>
        </div>
      )}

      {slug === 'film-camera-app' && (
        <div className="mvli-demo-box mvli-demo-row">
          <span className="mvli-demo-counter">
            Roll count: <b>{rollCount}</b> / 24 exposures remaining
          </span>
          <button
            type="button"
            onClick={() => setRollCount((c) => (c > 0 ? c - 1 : 24))}
            className="mvli-demo-btn"
          >
            {rollCount > 0 ? 'Expose frame (-1)' : 'Reload fresh roll (24)'}
          </button>
        </div>
      )}

      {slug === 'motion-cheatsheet' && (
        <div className="mvli-demo-box">
          <div className="mvli-demo-row">
            {(['enter', 'exit', 'move'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setCurveKey(k);
                  setCurveRun((r) => !r);
                }}
                className={`mvli-demo-btn ${curveKey === k ? 'is-on' : ''}`}
              >
                {k} ({CURVES[k].join(', ')})
              </button>
            ))}
          </div>
          <div className="mvli-curve-track">
            <span
              className={`mvli-curve-dot ${curveRun ? 'is-end' : ''}`}
              style={{
                transitionTimingFunction: `cubic-bezier(${CURVES[curveKey].join(',')})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
