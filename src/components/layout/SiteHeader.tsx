'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/content/assets';
import { ArrowButton } from '@/components/shared/ArrowButton';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const isDarkHeroRoute =
    pathname === '/work' ||
    pathname.startsWith('/work/') ||
    pathname === '/lab' ||
    pathname.startsWith('/lab/') ||
    pathname === '/uses' ||
    pathname === '/404' ||
    pathname === '/not-found';

  useEffect(() => {
    setMenuOpen(false);
    setPendingHref(null);
  }, [pathname]);

  function handleNavClick(href: string, closeMenu = false) {
    if (href === pathname) {
      if (closeMenu) setMenuOpen(false);
      setPendingHref(null);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    setPendingHref(href);
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 36);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`mv-header no-print ${isDarkHeroRoute ? 'is-dark-route' : 'is-light-route'} ${scrolled ? 'is-scrolled' : ''}`}
      data-testid="site-header"
    >
      <div className="mv-header-inner">
        <Link
          href="/"
          prefetch={true}
          className="mv-brand"
          aria-label="Mara Voss home"
          onClick={() => handleNavClick('/')}
        >
          <span className="mv-brand-mark" aria-hidden="true">
            <img src={ASSETS.brand.logoMark} alt="" width={24} height={24} />
          </span>
          <span className="mv-brand-name">{siteConfig.name}</span>
        </Link>

        <nav className="mv-nav-pill" aria-label="Primary navigation">
          {siteConfig.navLinks.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const pending = pendingHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => handleNavClick(item.href)}
                className={`mv-nav-link ${active ? 'is-active' : ''} ${pending ? 'is-pending' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mv-header-right">
          <div className="mv-header-cta">
            <ArrowButton
              label="Hire me"
              href="/contact"
              variant="solid"
              onClick={() => handleNavClick('/contact')}
            />
          </div>
          <button
            type="button"
            className="mv-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((prev) => !prev)}
            data-testid="mobile-menu-toggle"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav-drawer"
          className="mv-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          data-testid="mobile-nav-drawer"
        >
          <div className="mv-mobile-drawer-inner">
            <p className="mv-mobile-kicker">Navigation</p>
            <ul className="mv-mobile-list">
              {[
                { label: 'Home', href: '/' },
                ...siteConfig.navLinks,
                { label: 'Services', href: '/services' },
                { label: 'Lab', href: '/lab' },
                { label: 'Uses', href: '/uses' },
              ].map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                const pending = pendingHref === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      prefetch={true}
                      className={`mv-mobile-link ${active ? 'is-active' : ''} ${pending ? 'is-pending' : ''}`}
                      onClick={() => handleNavClick(item.href, true)}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mv-mobile-drawer-foot">
              <p className="mv-mobile-status">
                <span className="mv-port" aria-hidden="true" />
                <span>{siteConfig.availability.statusLabel}</span>
              </p>
              <ArrowButton
                label="Start a project"
                href="/contact"
                variant="orange"
                onClick={() => handleNavClick('/contact', true)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
