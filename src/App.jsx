/**
 * @file App.jsx
 * @description Root application component for the ZENTR landing page.
 *
 * PURPOSE
 * ───────
 * This is the top-level component that assembles all page sections in their
 * visual order. It also initialises the scroll-reveal animation by attaching
 * the `useRevealAnimation` hook to the entire page container.
 *
 * SECTION ORDER
 * ─────────────
 * The sections are rendered in the exact order they appear when a user
 * scrolls down the page:
 *
 * 1. Background          — Fixed 3D + shader layers (behind everything)
 * 2. GridOverlay          — Decorative grid lines (over background, under content)
 * 3. Hero                 — Full-viewport 4-column hero with "ZENTR" title
 * 4. LogoMarquee         — Infinite-scrolling capability icons
 * 5. AreasOfExploration  — 4 capability cards with unique visuals
 * 6. TextBanner          — "+10 years in the game" statement
 * 7. Features            — 3 core principle cards with micro-animations
 * 8. Testimonials        — Scrolling client testimonial cards
 * 9. Footer              — CTA, links, newsletter, copyright
 *
 * PERFORMANCE: LAZY LOADING
 * ─────────────────────────
 * Sections 5–9 are below the fold (not visible on initial page load).
 * They are loaded via `React.lazy()` + `Suspense`, which means:
 * - Their JavaScript is split into separate chunks by Vite/Rollup
 * - These chunks are only fetched when the browser needs to render them
 * - This reduces the initial JS bundle, speeding up First Contentful Paint
 *
 * WHY not lazy-load Background, GridOverlay, Hero, or LogoMarquee?
 * ────────────────────────────────────────────────────────────────
 * These are above-the-fold components visible immediately on page load.
 * Lazy-loading them would cause a visible flash of empty content (FOUC),
 * degrading the user experience. They must be in the main bundle.
 *
 * WHY an empty `fallback` on Suspense?
 * ───────────────────────────────────
 * The glass-section background and dark body mean that an empty fallback
 * is visually seamless — the user sees the dark background while chunks
 * load, which happens in milliseconds on any modern connection.
 * A loading spinner would actually be MORE jarring than the brief empty state.
 *
 * @returns {JSX.Element} The complete ZENTR landing page.
 */

import { useRef, lazy, Suspense } from 'react';
import useRevealAnimation from './hooks/useRevealAnimation';

/* ─── Above-the-fold Components (eagerly loaded) ─────────────────────────── */
import Background from './components/Background';
import GridOverlay from './components/GridOverlay';
import Hero from './components/Hero/Hero';
import LogoMarquee from './components/LogoMarquee/LogoMarquee';

/* ─── Below-the-fold Components (lazy-loaded for performance) ────────────── *
 *
 * React.lazy() wraps a dynamic import(), telling Vite to split each
 * component into its own chunk. The chunk is fetched on-demand when
 * React first attempts to render the component.
 *
 * WHY per-section splitting (not a single lazy chunk)?
 * Each section is its own chunk so they can load independently.
 * If one section's chunk is slow, the others still render.
 * ──────────────────────────────────────────────────────────────────────────── */
const AreasOfExploration = lazy(() => import('./components/AreasOfExploration/AreasOfExploration'));
const TextBanner = lazy(() => import('./components/TextBanner'));
const Features = lazy(() => import('./components/Features/Features'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Footer = lazy(() => import('./components/Footer/Footer'));

export default function App() {
  /**
   * Ref for the main content wrapper.
   *
   * Passed to `useRevealAnimation` so the IntersectionObserver can
   * scope its queries to this container's children (rather than the
   * entire document), preventing unintended animations on elements
   * outside the main content flow.
   */
  const appRef = useRef(null);

  /* Initialise scroll-triggered reveal animations for all sections */
  useRevealAnimation(appRef);

  return (
    <div
      ref={appRef}
      className="antialiased selection:bg-red-600/30 selection:text-white overflow-x-hidden w-full min-h-screen relative"
    >
      {/* ── Background Layers (fixed, behind content) ──────────────── */}
      <Background />

      {/* ── Grid Overlay (absolute, over background) ───────────────── */}
      <GridOverlay />

      {/* ── Above-the-fold Sections (eagerly loaded) ───────────────── */}
      <Hero />
      <LogoMarquee />

      {/* ── Below-the-fold Sections (lazy-loaded) ──────────────────── *
       *
       * Wrapped in a single <Suspense> boundary. If any lazy component
       * hasn't loaded yet, React renders the fallback (empty fragment)
       * for the entire group, then swaps in the real content once all
       * chunks have loaded.
       * ──────────────────────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <AreasOfExploration />
        <TextBanner />
        <Features />
        <Testimonials />
        <Footer />
      </Suspense>
    </div>
  );
}
