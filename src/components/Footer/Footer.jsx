/**
 * @file Footer.jsx
 * @description The site footer with CTA sidebar, navigation links, newsletter,
 * and copyright bar.
 *
 * LAYOUT
 * ──────
 * Two vertical sections:
 *
 * 1. **Main Footer** — 4-column grid:
 *    ┌──────────┬──────────┬──────────┬──────────────┐
 *    │ Sidebar  │ Sitemap  │ Socials  │ Newsletter   │
 *    │ (CTA)    │ links    │ links    │ form         │
 *    └──────────┴──────────┴──────────┴──────────────┘
 *
 * 2. **Copyright Bar** — A thin strip below the main footer with
 *    the copyright notice and a "Designed with precision" tagline.
 *
 * WHY `buttonVariant="solid"` on the sidebar?
 * ──────────────────────────────────────────
 * The footer's CTA ("Start Dialogue") is the most important conversion
 * button on the page. Using the solid red variant with a glow shadow
 * (`shadow-[0_0_20px_rgba(239,68,68,0.4)]`) makes it the most visually
 * prominent button, encouraging users to take action after scrolling
 * through the entire page.
 *
 * @returns {JSX.Element} The complete footer.
 */

import SectionSidebar from '../AreasOfExploration/SectionSidebar';
import FooterLinks from './FooterLinks';
import Newsletter from './Newsletter';

export default function Footer() {
    return (
        <footer className="relative z-20 w-full border-t border-white/10 glass-section">
            {/* ── Main Footer Grid ─────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Sidebar with solid red CTA button */}
                <SectionSidebar
                    label="/// CONNECT"
                    title="Connect"
                    description="Ready to explore? Let's build something extraordinary together."
                    buttonText="Start Dialogue"
                    buttonVariant="solid"
                />

                {/* Links + Newsletter area */}
                <div className="p-6 md:p-8 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <FooterLinks />
                    <Newsletter />
                </div>
            </div>

            {/* ── Copyright Bar ────────────────────────────────────────────
       *
       * A thin horizontal strip separated by a top border.
       * Content is centred vertically and split to left/right on desktop.
       *
       * WHY `text-[10px]`?
       * Copyright text is legally necessary but not a primary UI element.
       * Tiny text (10px) ensures it's present without competing with
       * the CTA or navigation links above.
       * ──────────────────────────────────────────────────────────────── */}
            <div className="border-t border-white/10 mt-0">
                <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-neutral-600 text-[10px] uppercase tracking-wider">
                        © 2025 — ZENTR, Design Experiment
                    </span>
                    <span className="text-neutral-600 text-[10px] uppercase tracking-wider">
                        Designed with precision.
                    </span>
                </div>
            </div>
        </footer>
    );
}
