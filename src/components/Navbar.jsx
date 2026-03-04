/**
 * @file Navbar.jsx
 * @description Fixed navigation bar with an animated hamburger menu.
 *
 * PURPOSE
 * ───────
 * Provides site-wide navigation via a fixed top bar with:
 * - ZENTR logo/brand (left)
 * - Hamburger / close toggle button (right)
 * - Full-screen mobile menu overlay (toggled via state)
 *
 * DESIGN RATIONALE
 * ────────────────
 * The navbar uses the same glassmorphism language as the rest of the site.
 * On scroll, the navbar gains a stronger glass background to differentiate
 * it from the hero content beneath it. This is achieved via the `scrolled`
 * state and the `scroll` event listener.
 *
 * WHY a separate Navbar instead of leaving the menu button in the Hero?
 * ────────────────────────────────────────────────────────────────────
 * The Hero's "Menu" button was a static decoration — it didn't open anything.
 * A proper Navbar must:
 * 1. Be fixed at the top of the viewport (always accessible)
 * 2. Manage open/close state for the mobile menu
 * 3. Lock body scroll when the menu is open
 * All three require stateful React logic that doesn't belong in the Hero.
 *
 * HAMBURGER ANIMATION
 * ───────────────────
 * The hamburger icon (3 lines) morphs into an "X" (close) icon using CSS
 * transforms. The top line rotates 45° clockwise, the middle line fades
 * out (opacity: 0 + scaleX: 0), and the bottom line rotates −45° counter-
 * clockwise. This creates a premium "morph" transition that avoids
 * swapping between two separate SVGs.
 *
 * MOBILE MENU OVERLAY
 * ───────────────────
 * When open, a full-screen glassmorphism overlay slides in from the top
 * with staggered link animations. Each link fades in from below with an
 * increasing delay (0ms → 400ms) creating a cascading entrance effect.
 *
 * WHY `overflow: hidden` on body when menu is open?
 * ──────────────────────────────────────────────────
 * Without this, the user could scroll the page behind the menu overlay,
 * leading to a disorienting experience. Locking scroll keeps focus on
 * the menu.
 *
 * @returns {JSX.Element} The fixed navbar with hamburger menu.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Navigation link data.
 * Each link has a label and an href.
 * When routing is added, these can be swapped to React Router `<Link>` components.
 */
const NAV_LINKS = [
    { label: 'Experiment', href: '#' },
    { label: 'Studies', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Connect', href: '#' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    /**
     * Track scroll position to apply a stronger glass background
     * when the user scrolls past the hero section.
     *
     * WHY 50px threshold?
     * A small threshold ensures the glass effect kicks in almost
     * immediately after scrolling begins, preventing the navbar
     * from appearing "empty" over the hero content.
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
            {/* ── Fixed Navbar Bar ──────────────────────────────────────────
       *
       * `z-50` ensures it sits above all page content.
       * The glass background transitions from transparent (at top)
       * to a visible frosted glass when scrolled.
       *
       * WHY `transition-all duration-500`?
       * A slow 500ms transition for the background change creates a
       * soft, gradual appearance rather than a jarring snap.
       * ──────────────────────────────────────────────────────────── */}
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
                    <a
                        href="#"
                        className="font-syne font-bold text-white text-lg tracking-tight hover:text-red-500 transition-colors"
                    >
                        ZENTR
                    </a>

                    {/* ── Hamburger / Close Button ──────────────────────────────
           *
           * Uses 3 `<span>` elements styled as lines.
           * When `isOpen` is true, CSS transforms morph them into an "X":
           * - Line 1: rotates 45° and translates down to centre
           * - Line 2: fades out (opacity-0, scaleX-0)
           * - Line 3: rotates -45° and translates up to centre
           *
           * WHY `<span>` elements instead of SVG?
           * Using DOM elements for the hamburger lines enables smooth
           * CSS transform animations between states. SVG path morphing
           * would require a library like GSAP or Framer Motion.
           * ──────────────────────────────────────────────────────────── */}
                    <button
                        onClick={toggleMenu}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-white/20 transition-colors group z-50"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <div className="w-5 h-4 flex flex-col justify-between">
                            {/* Top line */}
                            <span
                                className={`
                  block h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center
                  ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}
                `}
                            />
                            {/* Middle line */}
                            <span
                                className={`
                  block h-[1.5px] bg-white rounded-full transition-all duration-300
                  ${isOpen ? 'opacity-0 scale-x-0' : ''}
                `}
                            />
                            {/* Bottom line */}
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

            {/* ── Full-Screen Menu Overlay ──────────────────────────────────
       *
       * A full-viewport overlay with strong glassmorphism that contains
       * the navigation links, a section label, and social links.
       *
       * ANIMATION STRATEGY:
       * - The overlay itself fades in with a backdrop blur transition
       * - Each link fades in from below with a staggered delay
       *   (transition-delay: 100ms, 200ms, 300ms, 400ms)
       * - When closing, everything fades out simultaneously (no delay)
       *
       * WHY `pointer-events` toggle?
       * When closed (`opacity-0`), the overlay still occupies the DOM.
       * `pointer-events-none` prevents it from blocking clicks on
       * the page beneath it.
       * ──────────────────────────────────────────────────────────── */}
            <div
                className={`
          fixed inset-0 z-40 flex flex-col justify-center items-center
          transition-all duration-500
          ${isOpen
                        ? 'opacity-100 pointer-events-auto bg-neutral-950/95 backdrop-blur-2xl'
                        : 'opacity-0 pointer-events-none bg-neutral-950/0 backdrop-blur-none'
                    }
        `}
            >
                {/* Section label */}
                <span
                    className={`
            font-mono text-red-500 text-xs tracking-wider mb-8
            transition-all duration-500
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
                >
          /// NAVIGATION
                </span>

                {/* Navigation links */}
                <nav className="flex flex-col items-center gap-6">
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`
                text-4xl md:text-6xl font-syne font-medium text-white
                hover:text-red-500 transition-all duration-500
                tracking-tight
                ${isOpen
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                                }
              `}
                            style={{
                                transitionDelay: isOpen ? `${(i + 1) * 100}ms` : '0ms',
                            }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Social links at the bottom */}
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
