/**
 * @file Navbar.jsx
 * @description Fixed navigation bar with animated hamburger menu and React Router links.
 *
 * PURPOSE
 * ───────
 * Provides site-wide navigation via a fixed top bar with:
 * - ZENTR logo/brand (left) — links to home
 * - Hamburger / close toggle button (right)
 * - Full-screen mobile menu overlay (toggled via state)
 *
 * ROUTING
 * ───────
 * All navigation uses React Router `<Link>` components for client-side
 * routing. This means page transitions are instant (no full-page reload)
 * and the browser history is properly managed.
 *
 * DESIGN RATIONALE
 * ────────────────
 * The navbar uses the same glassmorphism language as the rest of the site.
 * On scroll, the navbar gains a stronger glass background. The hamburger
 * icon morphs into an "X" using CSS transforms.
 *
 * @returns {JSX.Element} The fixed navbar with hamburger menu.
 */

import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navigation link data.
 * Each link has a label and a route path.
 */
const NAV_LINKS = [
    { label: 'Experiment', to: '/experiment' },
    { label: 'Studies', to: '/studies' },
    { label: 'Journal', to: '/journal' },
    { label: 'Connect', to: '/connect' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    /* Close menu on route change */
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    /**
     * Track scroll position to apply a stronger glass background.
     */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Lock body scroll when the mobile menu is open.
     */
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

    return (
        <>
            {/* ── Fixed Navbar Bar ──────────────────────────────────────────── */}
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled || isOpen
                        ? 'bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
                        : 'bg-transparent border-b border-transparent'
                    }
        `}
            >
                <div className="flex items-center justify-between px-6 md:px-8 py-4">
                    {/* ── Logo ─────────────────────────────────────────────────── */}
                    <Link
                        to="/"
                        className="font-syne font-bold text-white text-lg tracking-tight hover:text-red-500 transition-colors"
                    >
                        ZENTR
                    </Link>

                    {/* ── Desktop Links (hidden on mobile) ──────────────────────── */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`
                  text-xs uppercase tracking-widest transition-colors
                  ${location.pathname === link.to
                                        ? 'text-red-500'
                                        : 'text-neutral-400 hover:text-white'
                                    }
                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* ── Hamburger / Close Button ──────────────────────────────── */}
                    <button
                        onClick={toggleMenu}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-colors group z-50 md:hidden"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            <span
                                className={`
                  block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center
                  ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}
                `}
                            />
                            <span
                                className={`
                  block h-[1.5px] bg-white rounded-full transition-all duration-300
                  ${isOpen ? 'opacity-0 scale-x-0' : ''}
                `}
                            />
                            <span
                                className={`
                  block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center
                  ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}
                `}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* ── Full-Screen Mobile Menu Overlay ────────────────────────────── */}
            <div
                className={`
          fixed inset-0 z-40 flex flex-col justify-center items-center
          transition-all duration-500 md:hidden
          ${isOpen
                        ? 'opacity-100 pointer-events-auto bg-neutral-950/95 backdrop-blur-2xl'
                        : 'opacity-0 pointer-events-none bg-neutral-950/0 backdrop-blur-none'
                    }
        `}
            >
                <span
                    className={`
            font-mono text-red-500 text-xs tracking-wider mb-8
            transition-all duration-500
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
          /// NAVIGATION
                </span>

                <nav className="flex flex-col items-center gap-6">
                    {NAV_LINKS.map((link, i) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className={`
                text-4xl md:text-6xl font-syne font-medium
                transition-all duration-500 tracking-tight
                ${location.pathname === link.to ? 'text-red-500' : 'text-white hover:text-red-500'}
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
                            style={{
                                transitionDelay: isOpen ? `${(i + 1) * 100}ms` : '0ms',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div
                    className={`
            absolute bottom-10 flex gap-8 text-xs uppercase tracking-widest text-neutral-500
            transition-all duration-500
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                    style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}
                >
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </>
    );
}
