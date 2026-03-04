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
 * WHY a single flat list of components?
 * ────────────────────────────────────
 * The landing page has a simple linear scroll layout with no routing,
 * nested layouts, or conditional sections. A flat composition makes
 * the render order obvious at a glance and avoids unnecessary wrapper
 * components. If routing or conditional sections are added later,
 * this can be refactored into a layout component with `<Outlet>`.
 *
 * WHY `scroll-smooth` on the `<html>` equivalent?
 * ───────────────────────────────────────────────
 * `scroll-smooth` is set on the wrapping `<div>` (the effective body)
 * via the `scroll-smooth` utility class. This enables smooth-scrolling
 * for any `<a href="#section">` anchor links, improving the user
 * experience when navigating between sections.
 *
 * @returns {JSX.Element} The complete ZENTR landing page.
 */

import { useRef } from 'react';
import useRevealAnimation from './hooks/useRevealAnimation';

/* ─── Section Components ──────────────────────────────────────────────────── */
import Background from './components/Background';
import GridOverlay from './components/GridOverlay';
import Hero from './components/Hero/Hero';
import LogoMarquee from './components/LogoMarquee/LogoMarquee';
import AreasOfExploration from './components/AreasOfExploration/AreasOfExploration';
import TextBanner from './components/TextBanner';
import Features from './components/Features/Features';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';

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

      {/* ── Page Sections (scrollable content) ─────────────────────── */}
      <Hero />
      <LogoMarquee />
      <AreasOfExploration />
      <TextBanner />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
