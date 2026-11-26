import React from 'react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ArrowButton } from '@/components/shared/ArrowButton';

export function BurntFilm404View() {
  const frames = ['401', '402', '403', '404', '405', '406', '407'];

  return (
    <section className="mv4 mv-dark" aria-labelledby="missing-frame-heading">
      <div className="mv-wrap mv4-inner">
        <div className="mv4-meta">
          <span>ROLL 04 · FRAME 404 · NOT FOUND</span>
          <span className="mv4-rec">
            <i aria-hidden="true" />
            Lab note: burnt in the gate
          </span>
        </div>

        <div className="mv4-strip" aria-hidden="true">
          {frames.map((num) => (
            <div key={num} className={`mv4-fr ${num === '404' ? 'is-burnt' : ''}`}>
              <span className="mv4-bg">{num}</span>
              <span className="mv4-code">MV 400TX · {num}</span>
            </div>
          ))}
        </div>

        <div className="mv4-copy">
          <h1 id="missing-frame-heading" className="mv-hd mv-hd-xl mv4-title">
            Missing <span className="mv-hl-orange">frame</span>.
          </h1>
          <p className="mv4-sub">
            This page was cut in the edit, or it never made it onto the roll. Everything else on
            the reel is still here.
          </p>
          <div className="mv4-ctas">
            <ArrowButton label="Back home" href="/" variant="solid" />
            <ArrowButton label="See my work" href="/work" variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
