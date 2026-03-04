/**
 * @file HomePage.jsx
 * @description The main landing page — assembles all homepage sections.
 *
 * PURPOSE
 * ───────
 * This was previously the content of App.jsx. Now that the app uses
 * React Router, the landing page content is extracted into its own
 * page component. The shared elements (Navbar, Background, GridOverlay)
 * are handled by the Layout component.
 *
 * The `useRevealAnimation` hook is initialised here to enable scroll-
 * triggered fade-in animations on all sections within this page.
 *
 * @returns {JSX.Element} The complete ZENTR landing page.
 */

import { useRef } from 'react';
import useRevealAnimation from '../hooks/useRevealAnimation';

/* ─── Eagerly loaded sections ─────────────────────────────────────────── */
import Hero from '../components/Hero/Hero';
import LogoMarquee from '../components/LogoMarquee/LogoMarquee';

/* ─── Lazy-loaded below-fold sections (handled by App.jsx Suspense) ─── */
import AreasOfExploration from '../components/AreasOfExploration/AreasOfExploration';
import TextBanner from '../components/TextBanner';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';
import Footer from '../components/Footer/Footer';

export default function HomePage() {
    const pageRef = useRef(null);
    useRevealAnimation(pageRef);

    return (
        <div ref={pageRef}>
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
